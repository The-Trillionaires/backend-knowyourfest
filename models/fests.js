const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const festsSchema = new Schema({
  fest_name:{
    type: String,
    required:true
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
  }
},{
  timestamps:true
});

const fests = mongoose.model("fest",festsSchema);

module.exports = fests;
