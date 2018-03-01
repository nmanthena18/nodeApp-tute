const  mongoose = require('mongoose');
mongoose.Promise = global.Promise;
console.log(process.env.PORT)
mongoose.connect(prosess.env.MONGODB_URI || 'mongodb://localhost:27017/myDB-1');
module.exports = {mongoose}