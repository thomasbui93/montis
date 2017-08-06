import co from 'co';
import Media from '../../models/media';
import {normalizeResponse} from "../../configuration/api/apiHelper";
import {getCollectionConfig} from "../../configuration/api/articleHelper";

export const index = (req, res, next) => {
  res.json({'status': true});
};

export const uploadMedia = (req, res, next) => {
  const file = req.file;
  const {fileName} = req.body;
  console.log(req.body);

  const media = new Media({
    filePath: file.path,
    name: fileName,
    size: file.size,
    mimetype: file.mimetype
  });

  co(function* () {
    try {
      yield media.save();
    } catch (error) {
      next(error);
    }
  });

  res.status(200).json(normalizeResponse(media));
};

export const getAllMedia = (req, res, next) => {
  co(function* () {
    let medias = [];
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
      medias = yield Media.find({})
        .sort({createAt: -1})
        .limit(pageSize)
        .skip(skip)
        .exec();
    } catch (error) {
      next(error);
    }

    res.json(normalizeResponse(medias));

  });
};

export const getOneMedia = (req, res, next) => {
  const mediaId = req.params.mediaId;
  co(function* () {
    let media = [];
    try {
      media = yield Media.findById(mediaId);
    } catch (error) {
      next(error);
    }

    res.json(normalizeResponse(media));
  });
};