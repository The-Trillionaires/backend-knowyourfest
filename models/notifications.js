const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  text:{
    type:String,
    required:true,
    unique: true
  }
})

const notification = mongoose.model("notification",notificationSchema);

module.exports = notification;
