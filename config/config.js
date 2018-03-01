var env = process.env.NODE_ENV || 'development';
console.log(`app running in ${env} environment`);
if(env === 'development'){
    process.env.MONGODB_URI = 'mongodb://localhost:27017/myDB-1'
}else if(env === 'test'){
    process.env.MONGODB_URI = 'mongodb://localhost:27017/myDB-test'
}