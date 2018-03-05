const {mongoose} = require('./../db/mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
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

UserSchema.methods.toJSON = function(){
	var user = this;
	var userObject = user.toObject();
	return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function(){
	var user = this;
	var access = 'auth';
	var token = jwt.sign({
		_id:user._id.toHexString(),
		access
	}, 'shh, secret').toString();

	user.tokens = user.tokens.concat([{token, access}]);
	return user.save().then(() =>{
		return token;
	})
}

UserSchema.statics.findByToken = function(token){
	var User = this;
	var decode;
	try{
		decode = jwt.verify(token, 'shh, secret');
	} catch(e){
		console.log(e)
		return Promise.reject();
	}

	return User.findOne({
		_id: decode._id,
		'tokens.token': token
	})
}

UserSchema.statics.findByCredentials = function(credu){
	var User = this;
	var email = credu.email
	return User.findOne({email}).then( (user) => {

		if(!user){
			return Promise.reject();
		}

		bcrypt.compare(credu.password, user.password, (err, res) =>{
			console.log(res)
			console.log()
			if(res){
				return user
			}else{
				return null
			}		
		})
	})
}

var count = 0
UserSchema.pre('save', function(next) {
	
	var user = this;
	if(count == 0){		
		bcrypt.hash(user.password, 10).then(function(hash) {
			user.password = hash;
			count++;
			next();
		});
	}else{
		next();
	}
});

var User = mongoose.model('User', UserSchema);

module.exports = {User}