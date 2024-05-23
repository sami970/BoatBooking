const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  boat: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Boat'},
  user: {type:mongoose.Schema.Types.ObjectId, required:true},
  startDate: {type:Date, required:true},
  stopDate: {type:Date, required:true},
  name: {type:String, required:true},
  phone: {type:String, required:true},
  price: Number,
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;