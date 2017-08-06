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
      collections: ['articles','tags','categories', 'configurations']
    }
  },
  bootstrapConfigurations: {
    data: [{
      code: 'articlePagination',
      name: 'Article Pagination',
      description: 'Default number of document in a page',
      value: 10
    }, {
      code: 'categoryPagination',
      name: 'Category Pagination',
      description: 'Default number of category in a page',
      value: 10
    }, {
      code: 'attributePagination',
      name: 'Attribute Pagination',
      description: 'Default number of attribute in a page',
      value: 10
    }, {
      code: 'tagPagination',
      name: 'Tag Pagination',
      description: 'Default number of tag in a page',
      value: 10
    }]
  }
};