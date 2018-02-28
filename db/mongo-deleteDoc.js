const {MongoClient, ObjectID} = require('mongodb');
const assert = require('assert');
const url = 'mongodb://localhost:27017/';

const dbName = 'myDB-1';

MongoClient.connect(url, (err, client) => {
	assert.equal(null, err);
	if(err) return console.log('Connection was not established');
	console.log("Connected successfully to server DB name : "+dbName);

  const db = client.db(dbName);
	/*db.collection('cData').insertOne({
		text: new Date(),
		completed: true
	}, (err, result) =>{
		if(err) return console.log('Unable to insert');
		console.log(result.ops[0]._id.getTimestamp());
	})*/
	db.collection('cData').deleteOne({text:'Naresh'}).then((result) =>{
		console.log(result)
	});
	
	db.collection('cData').deleteMany({completed:false}).then((result) =>{
		console.log(result)
	});
	
	db.collection('cData').findOneAndDelete({completed:true}).then((result) =>{
		console.log(result)
	});

  client.close();
});