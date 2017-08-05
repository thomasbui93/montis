import mongoose, {Schema} from "mongoose";
import shortId from "shortid";
import {DEFAULT_THUMBNAIL} from "../configuration/api/articleHelper"
import uniqueValidator from "mongoose-unique-validator"
const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: DEFAULT_THUMBNAIL
  },
  url: {
    type: String,
    unique: true
  },
  createAt: {
    type: Date,
    default: new Date()
  },
  updateAt: {
    type: Date,
    default: new Date()
  },
  isActive: {
    type: Boolean,
    default: true
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  version: {
    type: String,
    default: 0
  },
  versionControl: {
    type: Array,
    default: []
  }
});

schema.pre('save', function(next) {
  this.url = `${this.title.trim().split(' ').concat('-')}-${shortId.generate()}`;
  next();
});

schema.pre('update', function (next) {
  this.updateAt = new Date();
  next();
});

schema.plugin(uniqueValidator);

class Article {
  static textSearch(query) {
    return this.find({title: query, description: query, url: query});
  }
}

schema.loadClass(Article);

export default mongoose.model('Article', schema);