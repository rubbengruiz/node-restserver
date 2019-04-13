
process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urldb = (process.env.NODE_ENV === 'dev') 
    ? 'mongodb://localhost:27017/dbmoker'
    : process.env.MONGO_URI;

process.env.URLDB = urldb;