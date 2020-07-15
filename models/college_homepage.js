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
  tag_name:{
    type:String,
    default:"Coming Soon"
  },
  venue:{
    type:String,
    default:"Pune"
  },
  badge_name:{
    type:String,
    default:"badge-success"
  },
  image_url:{
    type: String,
    default:""
  }
})

const College_homepage = mongoose.model('college_homepage',college_homepage);

module.exports = College_homepage;
