const {mongoose} = require('./../db/mongoose');
const validator = require('validator');
var User = mongoose.model('User', {
	name:{
		type:String,
		minlength:3,
		trim:true,
		require:true
	},
	email : {
		type:String,
		require:true,
		minlength:5,
		trim:true,
		unique:true,
		validate:{
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password : {
		type:String,
		minlength:3,
		trim:true,
		require:true
	},
	tokens:[
		{
			access:{
				type:String,
				require:true
			},
			token:{
				type:String,
				require:true
			}
		}
	]
});

module.exports = {User}