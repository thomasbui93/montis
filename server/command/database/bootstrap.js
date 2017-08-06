import {MongoClient} from 'mongodb';
import config from '../../configuration/config';
import co from 'co';
import configPath from '../../constant/configPath';

const bootstrapDefaultCollection = db => {
  co(function* () {
    const categories = db.collection('categories');
    const tags = db.collection('tags');
    const configurations = db.collection('configurations');

    let errors = [];
    let defaultCategoryId;
    let defaultTagId;

    try {
      const defaultCategory = yield categories.insertOne({
        title: 'Unknown category',
        description: 'Category is assigned automatically for articles omitted categories.',
        url: 'unknown-category',
        isActive: true
      });

      if (defaultCategory) {
        const {ops} = defaultCategory;
        defaultCategoryId = {
          code: configPath.defaultCategoryId,
          name: ops[0].title,
          description: ops[0].description,
          value: ops[0]._id
        };
      }

    } catch (exceptionalError) {
      errors.push(exceptionalError);
    }

    try {
      const defaultTag = yield tags.insert({
        title: 'Unsorted tag',
        description: 'Tag is assigned automatically for articles omitted categories.',
        url: 'unsorted-tag',
        isActive: true
      });

      if (defaultTag) {
        const {ops} = defaultTag;
        defaultTagId = {
          code: configPath.defaultTagId,
          name: ops[0].title,
          description: ops[0].description,
          value: ops[0]._id
        };
      }

    } catch (exceptionalError) {
      errors.push(exceptionalError);
    }

    try {
      let bootstrapConfiguration = config.bootstrapConfigurations.data;

      if(defaultCategoryId) {
        bootstrapConfiguration.push(defaultCategoryId);
      }

      if(defaultTagId) {
        bootstrapConfiguration.push(defaultTagId);
      }

      yield configurations.insertMany(bootstrapConfiguration);
    } catch (exceptionalError) {
      errors.push(exceptionalError);
    }

    return errors;
  }).then(function (errors) {
    if (errors.length > 0) {
      console.log(errors);
    } else {
      console.log('Done creating category, tag and configuration');
      db.close();
    }
  });

};
export default () => {
  MongoClient.connect(config.database.mongodb.defaultUri)
    .then(function (db, error) {
      if (error) {
        console.log('An unexpected error happened', error.toString());
        return false;
      }

      bootstrapDefaultCollection(db);
    })
};
