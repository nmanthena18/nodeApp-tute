const {User} = require('./users');
module.exports.userActions = (app, _) =>{
	app.post('/users', (req, res) =>{
		var body = _.pick(req.body, ['name', 'email', 'password']);
		var user = new User(body);	
		user.save().then(() => {
			//res.send(user).
			return user.generateAuthToken();
		}).then((token)=>{
			res.header('x-auth', token).send(user);
		}), (e) => {
			res.status(400).send(e)
		};
	});

	app.post('/user/me', (req, res) =>{
		var token = req.header('x-auth');
		User.findByToken(token).then((user) =>{
			if(!user){
				return Promise.reject();
			}
			res.send(user)
		}).catch((e)=>{
			res.status(401).send();
		})
	});

	app.post('/user/login', (req, res) =>{
		var body = _.pick(req.body, ['email', 'password']);
		User.findByCredentials(body).then((user) =>{
			console.log(user)
			res.send('user');
		}).catch( (e) => {			
			res.status(400).send();
		})
	});
}