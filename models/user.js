const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  lastname:{
    type:String,
    default:""
  },
  firstname:{
    type:String,
    default:""
  },
  admin:{
    type:Boolean,
    default:false
  }
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('user',userSchema);

module.exports = User;
