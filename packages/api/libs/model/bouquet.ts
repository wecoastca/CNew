import * as mongoose from 'mongoose';
import Flower from './flower';
import User from './user';

let Schema = mongoose.Schema;

let Bouquet = new Schema({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    content: [Flower],
    userOwner: User,
    createdData: {type: Date, default: Date.now}
})

export { Bouquet };
export default mongoose.model('Bouquet',Bouquet);

