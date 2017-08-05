import Tag from '../../models/tag';
import co from 'co';
import {getCollectionConfig} from '../../configuration/api/articleHelper';
import {normalizeResponse} from "../../configuration/api/apiHelper"

/**
 * List all tags
 * @param req
 * @param res
 * @param next
 */
export const index = (req, res, next) => {
  co(function* () {
    let tags = [];
    let collectionConfig = {};

    try {
      collectionConfig = yield getCollectionConfig();
    } catch (error){
      next(error)
    }

    const pageNumber = req.query.p || collectionConfig.pageNumber;
    const pageSize = req.query.s || collectionConfig.pageSize;
    const skip = (parseInt(pageNumber)-1) * parseInt(pageSize);

    try {
      tags = yield Tag.find({ isActive: false })
        .sort({createAt: -1})
        .limit(pageSize)
        .skip(skip)
        .exec();
    } catch (error) {
      next(error);
    }

    res.json(normalizeResponse(tags));
  });
};

/**
 * Create the tag
 * @param req
 * @param res
 * @param next
 */
export const createOne = (req, res, next) => {
  co(function* () {
    let tag = new Tag(req.body);

    try {
      yield tag.save()
    } catch (error){
      next(error);
    }

    res.status(200).json(normalizeResponse(tag));
  })
};

/**
 * Get one tag detail
 * @param req
 * @param res
 * @param next
 */
export const findOne = (req, res, next) => {
  co(function* () {
    let category;
    const urlKey = req.params.urlKey;
    let error = null;

    try {
      category = yield Tag.findOne({url: urlKey, isActive: true});
    } catch (e) {
      error = e;
    }

    res.json(normalizeResponse(category, error));
  })
};

/**
 * Update the tag
 * @param req
 * @param res
 * @param next
 */
export const update = (req, res, next) => {
  co(function* () {
    const tagId = req.params.tagId;
    let tag;

    try {
      tag = yield Tag.findById(tagId);
    } catch (error){
      next(error);
    }

    try {
      yield tag.update(req.body, {runValidators: true, context: 'query'})
    } catch (error){
      next(error);
    }

    res.status(200).json(normalizeResponse(tag));
  })
};

/**
 * Remove the tag
 * @param req
 * @param res
 * @param next
 */
export const remove = (req, res, next) => {
  co(function* () {
    const tagId = req.params.tagId;

    try {
      yield Tag.findByIdAndRemove(tagId);
    } catch (error){
      next(error);
    }
    res.status(200).json({status: true})
  })
};