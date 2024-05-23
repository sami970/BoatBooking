const mongoose = require('mongoose');

const boatSchema = new mongoose.Schema({
  owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  title: String,
  boattype :String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  startDate: Number,
  stopDate: Number,
  maxGuests: Number,
  price: Number,
});

const BoatModel = mongoose.model('Boat', boatSchema);

module.exports = BoatModel;