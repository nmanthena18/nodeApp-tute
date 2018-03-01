const {User} = require('./users');
module.exports.userActions = (app, _) =>{
	app.post('/users', (req, res) =>{
		var body = _.pick(req.body, ['name', 'email', 'password']);
		var user = new User(body);	
		user.save().then((user) => {
			res.send(user)
		}, (e) => {
			res.status(400).send(e)
		});
	});
}