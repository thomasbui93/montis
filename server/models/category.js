import mongoose, {Schema} from "mongoose";
import shortId from "shortid";
import {DEFAULT_THUMBNAIL} from "../configuration/api/categoryHelper"
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
  image: {
    type: String,
    required: false,
    default: DEFAULT_THUMBNAIL
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  includedInNavigation: {
    type: Boolean,
    default: false
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

class Category {

}

schema.loadClass(Category);

export default mongoose.model('Category', schema);