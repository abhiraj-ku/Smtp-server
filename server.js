require("dotenv").config();
const fs = require("fs");
const qrcode = require("qrcode");
const { redisClient } = require("./db/dbRedis");
const bcryptjs = require("bcryptjs");
const speakeasy = require("speakeasy");
const { addToQueue } = require("./src/queue");
const SMTPServer = require("smtp-server").SMTPServer;
const connectDB = require("./src/config/db");
const express = require("express");

const app = express();
connectDB();
const server = new SMTPServer({
  // for secure connection we will use tls and generate a key pair using open ssl
  secure: true,
  key: fs.readFileSync("./keys/private.key"),
  cert: fs.readFileSync("./keys/certificate.crt"),
  authOptionala: false,

  onAuth(auth, session, callback) {
    if (auth.username === "admin" && auth.password === "password") {
      callback(null, { user: auth.username });
    } else {
      callback(new Error("Invalid Credentials"));
    }
  },

  // Four important methods for recieving the service
  onConnect(session, cb) {
    console.log("Session Accept", session.id);

    // cb(new Error('cant accept')) // in case we simply reject the req
    cb(); // this simply accepts the incoming req
  },

  onMailFrom(address, session, cb) {
    console.log("On Mail from", address.address, session.id);
    cb(); //simply accept all the mail
  },

  onRcptTo(address, session, cb) {
    console.log("OnRcpt from", address.address, session.id);

    cb(); //
  },

  onData(stream, session, cb) {
    // when the stram of data starts coming to the server
    stream.on("data", (data) => console.log(`onData ${data.toString()}`));

    // once the data has been recieved or the stream has ended
    stream.on("end", cb);
  },
});

server.listen(2525, () => console.log("SMTP server running on port 2525"));

// gracefully close the server
process.on("SIGTERM", () => {
  console.log("SIGTERM signal recieved, closing the server");

  server.close(() => {
    console.log("HTTP server closed");

    process.exit(0);
  });
});

//SIGINT -> signal interrupt ctrl+c
process.on("SIGINT", () => {
  console.log("SIGINT signal recieved, closing the server");

  server.close(() => {
    console.log("HTTP server closed");

    process.exit(0);
  });
});
