export default () => ({
  port: process.env.PORT || 7000,
  jwt_secret: process.env.JWT_SECRET_KEY,
  database: {
    mongo_uri: process.env.MONGO_URI,
  },
  redis: {
    uri: process.env.REDIS_URI,
    ttl: process.env.REDIS_TTL,
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  },
});
