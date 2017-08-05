import {MongoClient} from 'mongodb';
import config from '../../configuration/config';
import co from 'co';

const bootstrapDefaultCollection = db => {
  co(function* () {
    const categories = db.collection('categories');
    const tags = db.collection('tags');

    let errors = [];
    let categoryOperation;
    let tagOperation;
    try {
      categoryOperation = yield categories.insert({
        title: 'Unknown category',
        description: 'Category is assigned automatically for articles omitted categories.',
        url: 'unknown-category',
        isActive: true
      })
    } catch (exceptionalError) {
      errors.push(exceptionalError);
    }

    try {
      tagOperation = yield tags.insert({
        title: 'Unsorted tag',
        description: 'Tag is assigned automatically for articles omitted categories.',
        url: 'unsorted-tag',
        isActive: true
      })
    } catch (exceptionalError) {
      errors.push(exceptionalError);
    }

    return errors;
  }).then(function (errors) {
    if (errors.length > 0) {
      console.log(errors);
    } else {
      console.log('Done creating category and tag');
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
