import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true,
    unique: true
  },
  size: {
    type: Number,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: new Date()
  },
  updateAt: {
    type: Date,
    default: new Date()
  }
});

schema.pre('update', function (next) {
  this.updateAt = new Date();
  next();
});

schema.plugin(uniqueValidator);

class Media {

}

schema.loadClass(Media);

export default mongoose.model('Media', schema);