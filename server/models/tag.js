import mongoose, { Schema } from 'mongoose';
import shortId from 'shortid';
import uniqueValidator from 'mongoose-unique-validator'

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
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
    default: false
  }
});

schema.pre('save', function(next) {
  this.url = `${this.title.split(' ').trim().concat('-')}-${shortId.generate()}`;
  next();
});

schema.pre('update', function (next) {
  this.updateAt = new Date();
  next();
});

schema.plugin(uniqueValidator);

class Tag {

}

schema.loadClass(Tag);

export default mongoose.model('Tag', schema);