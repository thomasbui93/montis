import Attribute from "../../models/attribute";
import co from "co";
import {getCollectionConfig} from "../../configuration/api/articleHelper";
import {normalizeResponse} from "../../configuration/api/apiHelper"
import configPath from '../../constant/configPath';
/**
 * Get all attributes
 * @param req
 * @param res
 * @param next
 */
export const getAll = (req, res, next) => {
  co(function* () {
    let attributes = [];
    let collectionConfig = {};

    try {
      collectionConfig = yield getCollectionConfig(configPath.attributePagination);
    } catch (error){
      next(error)
    }

    const pageNumber = req.query.p || collectionConfig.pageNumber;
    const pageSize = req.query.s || collectionConfig.pageSize;
    const skip = (parseInt(pageNumber)-1) * parseInt(pageSize);

    try {
      attributes = yield Attribute.find({ isActive: false })
        .sort({createAt: -1})
        .limit(pageSize)
        .skip(skip)
        .exec();
    } catch (error) {
      next(error);
    }

    res.json(normalizeResponse(attributes));
  });
};

/**
 * Get one attribute
 * @param req
 * @param res
 * @param next
 */
export const findOne = (req, res, next) => {
  co(function* () {
    let attribute;
    const attributeCode = req.params.attributeCode;
    let error = null;
    try {
      attribute = yield Attribute.findOne(attributeCode);
    } catch (e) {
      error = e;
    }

    res.json(normalizeResponse(attribute, error));
  })
};

/**
 * Create one attribute
 * @param req
 * @param res
 * @param next
 */
export const createOne = (req, res, next) => {
  co(function* () {
    let attribute = new Attribute(req.body);

    try {
      yield attribute.save()
    } catch (error){
      next(error);
    }

    res.status(200).json(normalizeResponse(attribute));
  })
};

/**
 * Update one attribute
 * @param req
 * @param res
 * @param next
 */
export const updateOne = (req, res, next) => {
  co(function* () {
    let attribute = new Attribute(req.body);

    try {
      attribute = yield attribute.save()
    } catch (error) {
      next(error);
    }

    res.status(200).json(normalizeResponse(attribute));
  })
};

/**
 * Remove one attribute
 * @param req
 * @param res
 * @param next
 */
export const removeOne = (req, res, next) => {
  co(function* () {
    const attributeCode = req.params.attributeCode;

    try {
      let attribute = yield Attribute.findOneAndRemove({code: attributeCode});
    } catch (error) {
      next(error);
    }
    res.status(200).json({status: true})
  })
};

/**
 * Remove all attributes by code
 * @param req
 * @param res
 * @param next
 */
export const removeAll = (req, res, next) => {
  co(function* () {
    const attributeCodes = req.params.attributeCodes;
    try{
      let operation = yield Attribute.remove({code: {$in : attributeCodes}});
    } catch (exceptionalErrors){
      next(exceptionalErrors);
    }
    res.status(200).json({status: true})
  })
};

/**
 * Update all attributes
 * @param req
 * @param res
 * @param next
 */
export const updateAll = (req, res, next) => {
  co(function* () {
    const attributeCodes = req.params.attributeCodes;
    const respectiveData = req.params.respectiveData;
    let operations = [];
    try {
      attributeCodes.forEach( function* (attributeCode, indexType) {
        const data = respectiveData[indexType];
        const operation = yield Attribute.findOneAndUpdate({code: attributeCode}, data);
        operations.push(operation);
      });
    } catch (exceptionalErrors) {
      next(exceptionalErrors);
    }

    try {
      yield operations;
    } catch (error){
      next(error);
    }

    res.status(200).json({status: true})
  })
};


