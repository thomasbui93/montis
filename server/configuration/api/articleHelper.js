import co from 'co';
import Configuration from '../../models/configuration';
import configPath from '../../constant/configPath';
import Category from '../../models/category';
import Tag from '../../models/tag';

export const getCollectionConfig = (code) => {
  if (!code) code = configPath.articlePagination;
  return co(function* () {
    const configuration = yield Configuration.findOne({code: code});
    return configuration ? {
      pageSize: configuration.value,
      pageNumber: 1
    } : {
      pageSize: 10,
      currentPage: 1
    };
  });
};

export const getDefaultCategory = () => {
  return co(function* () {
    const configuration = yield Configuration.findOne({code: configPath.defaultCategoryId});

    if (!configuration) return null;

    return Category.findById(configuration.value)
  });
};

export const getDefaultTag = () => {
  return co(function* () {
    const configuration = yield Configuration.findOne({code: configPath.defaultTagId});

    if (!configuration) return null;

    return Tag.findById(configuration.value)
  });
};

export const populateDefaultAttribute = doc => {
  return co(function* () {
    let errors = [];

    if (doc.categories.length === 0) {
      try {
        const defaultCategory = yield getDefaultCategory();
        doc.categories = [defaultCategory];
      } catch (exceptionalError) {
        errors.push(exceptionalError);
      }
    }

    if (doc.tags.length === 0) {
      try {
        const defaultTag = yield getDefaultTag();
        doc.tags = [defaultTag];
      } catch (exceptionalError) {
        errors.push(exceptionalError);
      }
    }

    return errors;
  })
};

export const DEFAULT_THUMBNAIL = `https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png`;
