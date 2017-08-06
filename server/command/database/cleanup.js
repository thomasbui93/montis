import {MongoClient} from 'mongodb';
import config from '../../configuration/config';
import {intersection} from 'lodash';
import co from 'co';

const cleanDatabase = (db, dbNames) => {
  co(function* () {
    let errors = [];

    if (dbNames !== '') {
      dbNames = dbNames.split(',').map(element => element.trim());
      dbNames = intersection(dbNames, config.command.database.collections);
    } else {
      dbNames = config.command.database.collections;
    }

    let cleanOperations = dbNames.map(function* (dbName) {
      let collection = db.collection(dbName);

      try {
        yield collection.drop();
        return Promise.resolve(undefined);
      } catch (exceptionalError) {
        return Promise.resolve(exceptionalError)
      }
    });

    try {
      yield cleanOperations;
    } catch (error){
      errors.push(error);
    }

    return errors
  }).then(errors => {
    if (errors.length > 0) {
      console.log('Errors happened in operation');
    } else {
      console.log('Done cleaning database');
    }
    db.close();
  }).catch(function (error) {

  });
};

export default (dbNames) => {
  MongoClient.connect(config.database.mongodb.defaultUri)
    .then(function (db, error) {
      if (error) {
        console.log('An unexpected error happened', error.toString());
        return false;
      }
      cleanDatabase(db, dbNames);
    })
};
