var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Cart = new Schema({
  name 		:  String,
 

},{collection : 'cart'});

module.exports = mongoose.model('Cart', Cart);