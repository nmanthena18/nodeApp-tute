const expect = require('expect');
const request = require('supertest');

const app = require('./app');
const {User} = require('./models/users');

describe('POST /Users', () => {
	it('Should create new user object', (done)=>{
		var user = {name:'my name', email:'something@ctepl.com'};		
		request(app)
			.post('/users')
			.send(user)
			.expect(200)
			.expect( (res) => {
				expect(res.body.name).toContain('my name')				
			})
			.end( (err, res) =>{
				if(err) { return done(err)}
				User.find().then( (s) =>{
					expect(s[0].name).toContain('my name');
					done();
				}).catch( (e) => done(e))
			})
			
	})
})