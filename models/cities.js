const mongoose = require('mongoose');

const cities = new mongoose.Schema({
  id: String,
  name: String,
  ascii: String,
  alt_name: String,
  lat: String,
  lon: String,
  feat_class: String,
  feat_code: String,
  country: String,
  cc2: String,
  admin1: String,
  admin2: String,
  admin3: String,
  admin4: String,
  population: String,
  elevation: String,
  dem: String,
  tz: String,
  modified_at: String,
  score : Number
});

module.exports = mongoose.model('cities', cities);
