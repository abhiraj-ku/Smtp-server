const User = require("../models/userModel");
const redisClient = require("../config/redis");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const bcrypt = require("bcrypt");
const {
  getUserFromCache,
  setUserToCache,
} = require("../services/cacheServices");

// User Registration Route

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  // Check if username or password is present or not
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // Check in Redis cache first
  const cachedUser = await getUserFromCache(username);
  if (cachedUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Check in MongoDB for existing user
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPass = bcrypt.hashSync(password, 10);
  const totpSecret = speakeasy.generateSecret({
    name: `SMTP server (${username})`,
  });

  await User.create({
    username,
    password: hashedPass,
    totpSecret: totpSecret.base32,
  });

  // Set the key-value for this user in Redis
  await setUserToCache(username, {
    password: hashedPass,
    totpSecret: totpSecret.base32, // Cache the base32 encoded secret
  });

  // Setup the QR code generation
  qrcode.toDataURL(totpSecret.otpauth_url, (err, qrCodeData) => {
    if (err) {
      return res.status(500).json({ message: "Error generating QR code" });
    }

    res.json({ message: "User registered successfully", qrCodeData });
  });
};

// Authenticate User after registration

const authenticateUser = async (req, res) => {
  const { username, password, token } = req.body;

  if (!username || !password || !token) {
    return res
      .status(400)
      .json({ message: "Username, password, and TOTP token are required" });
  }

  const user = await getUserFromCache(username);

  if (!user) {
    user = await User.findOne({ username });
  } else {
    if (user) {
      await setUserToCache(username, {
        password: user.password,
        totpSecret: user.totpSecret,
      });
    }
  }

  if (user && bcrypt.compareSync(password, user.password)) {
    // verify the totp with generated keys and secret
    const verifiedTotp = speakeasy.totp.verify({
      secret: user.totpSecret,
      encoding: "base32",
      token: token,
    });

    if (verifiedTotp) {
      return res.json({ message: "Authentication successful" });
    } else {
      return res.status(401).json({ message: "Invalid TOTP code" });
    }
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
};

module.exports = { registerUser, authenticateUser };
