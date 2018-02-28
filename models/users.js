const {mongoose} = require('./../db/mongoose');
var User = mongoose.model('User', {
	name:{
		type:String,
		minlength:1,
		trim:true,
		require:true
	},
	email : {
		type:String,
		require:true,
		minlength:5,
		trim:true,
	},
	completedAt : {
		type:Number	,
		default:null
	}
});

module.exports = {User}