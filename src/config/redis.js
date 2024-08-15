const redis = require("redis");
const { REDIS_URL, REDIS_PASSWORD } = require("./constants");

const redisClient = redis.createClient({
  url: REDIS_URL,
  password: REDIS_PASSWORD,
});

redisClient.on("error", () => {
  console.error("error in redis", error);
});

module.exports = redisClient;
