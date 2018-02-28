const  mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/myDB-1');
module.exports = {mongoose}