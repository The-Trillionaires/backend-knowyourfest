const mongoose = require('mongoose');
const Schmea = mongoose.Schema;

const college_homepage = new Schmea({
  name: {
    type: String,
    required:true,
    unique: true
  },
  description:{
    type:String,
    default:""
  },
  venue:{
    type:String,
    default:"Pune"
  },
  image_url:{
    type: String,
    default:""
  },
  date:{
    type: String,
    default: ""
  },
  remaing_days:{
    type:Number,
    default:999999999
  },
  show:{
    type: String,
    default: 'off'
  }
})

const College_homepage = mongoose.model('college_homepage',college_homepage);

module.exports = College_homepage;
