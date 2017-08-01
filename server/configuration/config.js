export default {
  expressPort: 3001,
  database: {
    mongodb: {
      defaultUri: "mongodb://localhost/montis",
      options: {
        useMongoClient: true
      }
    },
    redis: {
      port: 6379
    }
  }
};