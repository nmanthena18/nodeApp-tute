var jwt = require('jsonwebtoken');

var token = jwt.sign({ foo: 'bar' }, 'secret');

var decoded = jwt.verify(token, 'secret');

console.log(token)
console.log(decoded)