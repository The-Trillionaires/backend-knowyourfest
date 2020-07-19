const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collegeSchema = new Schema({
  name: {
    type: String,
    required:true,
    unique: true
  },
  short_name: {
    type: String,
    required:true,
    unique: true
  }
},{timestamp: true});

const college = mongoose.model('college',collegeSchema);

module.exports = college;
