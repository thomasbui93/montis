import Article from "../../models/article";
import co from "co";
import {getCollectionConfig} from "../../configuration/api/articleHelper";
import {normalizeResponse} from "../../configuration/api/apiHelper"

export const index = (req, res, next) => {
  co(function* () {
    let collectionConfig = {};

    try {
      collectionConfig = yield getCollectionConfig();
    } catch (error) {
      next(error)
    }
    return collectionConfig;
  }).then(collectionConfig => {
    const pageNumber = req.query.p || collectionConfig.pageNumber;
    const pageSize = req.query.s || collectionConfig.pageSize;
    const skip = (parseInt(pageNumber) - 1) * parseInt(pageSize);

    Article.find({isActive: true})
      .select('-versionControl')
      .sort({createAt: -1})
      .limit(pageSize)
      .skip(skip)
      .populate('tags', 'categories')
      .exec(function (error, articles) {
        res.json(normalizeResponse(articles, error));
      });
  })
};

export const findOne = (req, res, next) => {
  co(function* () {
    let article;
    const urlKey = req.params.urlKey;
    let error = null;
    try {
      article = yield Article.findOne({url: urlKey, isActive: true}).select('-versionControl');
    } catch (e) {
      error = e;
    }


    try {
      article = yield article.populate('tags').execPopulate();
    } catch (e) {
      error = e;
    }

    res.json(normalizeResponse(article, error));
  })
};

export const createOne = (req, res, next) => {
  co(function* () {
    let article = new Article(req.body);

    try {
      yield article.save()
    } catch (error) {
      next(error);
    }

    res.status(200).json(normalizeResponse(article));
  })
};

export const update = (req, res, next) => {
  co(function* () {
    const articleId = req.params.articleId;
    let article;

    try {
      article = yield Article.findById(articleId);
    } catch (error) {
      next(error);
    }

    try {
      yield article.update(req.body, {runValidators: true, context: 'query'})
    } catch (error) {
      next(error);
    }

    res.status(200).json(normalizeResponse(article));
  })
};


export const remove = (req, res, next) => {
  co(function* () {
    const articleId = req.params.articleId;

    try {
      yield Article.findByIdAndRemove(articleId);
    } catch (error) {
      next(error);
    }
    res.status(200).json({status: true})
  })
};

