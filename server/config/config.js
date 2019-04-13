
process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urldb; 
/*
if (process.env.NODE_ENV === 'dev')
    urldb = 'mongodb://localhost:27017/dbmoker';
else
    urldb = 'mongodb+srv://strider:qQnnTJr0KAHafBrQ@cluster0-46af5.mongodb.net/mokerdb';

urldb = (process.env.NODE_ENV === 'dev') 
? 'mongodb://localhost:27017/dbmoker'
: 'mongodb+srv://strider:qQnnTJr0KAHafBrQ@cluster0-46af5.mongodb.net/mokerdb';
*/

process.env.URLDB = 'mongodb+srv://strider:qQnnTJr0KAHafBrQ@cluster0-46af5.mongodb.net/mokerdb';