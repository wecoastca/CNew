import * as mongoose from 'mongoose';

mongoose.connect('mongodb+srv://modelsstorage-auihi.mongodb.net:8080/constructor');

let db = mongoose.connection;

db.on('err',()=>console.log('connection db error'));
db.once('open',()=>console.log('connected to db'));

export default mongoose;