import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  description: {
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
  },
  isActive: {
    type: Boolean,
    default: false
  }
});

schema.pre('save', function(next) {
  if(!this.code){
    this.code = this.name.split(' ').concat('_');
  }
  next();
});

schema.pre('update', function (next) {
  this.updateAt = new Date();
  next();
});

schema.plugin(uniqueValidator);

class Attribute {

}

schema.loadClass(Attribute);

export default mongoose.model('Attribute', schema);