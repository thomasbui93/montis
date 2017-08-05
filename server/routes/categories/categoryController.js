import Category from "../../models/Category";
import co from "co";
import {normalizeResponse} from "../../configuration/api/apiHelper"

export const index = (req, res, next) => {
  co(function* () {
    let error = null;
    let categoryCollection
    try {
      categoryCollection = yield Category.find({isActive: true});
    } catch (e) {
      error = e;
    }

    res.json(normalizeResponse(categoryCollection, error));
  })
};

export const findOne = (req, res, next) => {
  co(function* () {
    let category;
    const urlKey = req.params.urlKey;
    let error = null;
    try {
      category = yield Category.findOne({url: urlKey, isActive: true}).select('-versionControl');
    } catch (e) {
      error = e;
    }

    res.json(normalizeResponse(category, error));
  })
};

export const createOne = (req, res, next) => {
  co(function* () {
    let category = new Category(req.body);

    try {
      yield category.save()
    } catch (error) {
      next(error);
    }

    res.status(200).json(normalizeResponse(category));
  })
};

export const update = (req, res, next) => {
  co(function* () {
    const categoryId = req.params.categoryId;
    let category;

    try {
      category = yield Category.findById(categoryId);
    } catch (error) {
      next(error);
    }

    try {
      yield category.update(req.body, {runValidators: true, context: 'query'})
    } catch (error) {
      next(error);
    }

    res.status(200).json(normalizeResponse(category));
  })
};

/*
  Remove category
 */
export const remove = (req, res, next) => {
  co(function* () {
    const categoryId = req.params.categoryId;

    try {
      yield Category.findByIdAndRemove(categoryId);
    } catch (error) {
      next(error);
    }

    res.status(200).json({status: true})
  })
};
