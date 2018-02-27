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
	
	db.collection('cData').find({completed:false}).toArray().then( (docs) =>{
		console.log(JSON.stringify(docs, null, 2))
	}, (err) => {
		console.log('Unable to fetch'+ err)
	});
	
	db.collection('cData').find({text:"Naresh"}).toArray().then( (docs) =>{
		console.log(JSON.stringify(docs, null, 2))
	}, (err) => {
		console.log('Unable to fetch'+ err)
	});
	
	db.collection('cData').find().count().then( (count) =>{
		console.log(`Total count is: ${count}`)
	}, (err) => {
		console.log('Unable to fetch'+ err)
	});

  client.close();
});