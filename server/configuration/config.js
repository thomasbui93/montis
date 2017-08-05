export default {
  expressPort: 3001,
  database: {
    mongodb: {
      defaultUri: "mongodb://localhost/montis",
      options: {
        useMongoClient: true
      },
      rawUri: "mongodb://localhost:27017/montis"
    },
    redis: {
      port: 6379
    }
  },
  command: {
    database: {
      collections: ['articles','tags','categories']
    }
  }
};