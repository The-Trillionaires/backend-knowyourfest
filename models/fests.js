const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const festsSchema = new Schema({
  fest_name:{
    type: String,
    required:true,
    unique:true
  },
  image:{
    type: String,
    default: ""
  },
  description:{
    type: String,
    required: true
  },
  website_link:{
    type: String,
    default: ""
  },
  college: {
    type: String,
    required:true
  },
  date:{
    type: String,
    default: "Coming Soon"
  },
  remaing_days:{
    type:String,
    default:999999999
  },
},{
  timestamps:true
});

const fests = mongoose.model("fest",festsSchema);

module.exports = fests;
