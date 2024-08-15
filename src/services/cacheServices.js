const redisClient = require("../config/redis");

const getUserFromCache = async (username) => {
  try {
    const user = await redisClient.hgetAsync(username);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error(`Error fetching user ${username} from Redis:`, error);
    return null; // Return null if there's an error fetching the user
  }
};

const setUserToCache = async (username, user) => {
  try {
    await redisClient.hsetAsync(username, JSON.stringify(user));
  } catch (error) {
    console.error(`Error setting user ${username} in Redis:`, error);
  }
};

module.exports = {
  getUserFromCache,
  setUserToCache,
};
