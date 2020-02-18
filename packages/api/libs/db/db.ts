import * as mongoose from 'mongoose';

mongoose.connect('mongodb+srv://dbservice-v2rry.mongodb.net/test');

let db = mongoose.connection;

db.on('err',()=>console.log('connection db error'));
db.once('open',()=>console.log('connected to db'));
