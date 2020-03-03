import * as mongoose from 'mongoose';
import {Flower as FlowerSchema} from './flower';
import {User as UserSchema} from './user';

let Schema = mongoose.Schema;

let Bouquet = new Schema({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    content: [FlowerSchema],
    userOwner: UserSchema,
    createdData: {type: Date, default: Date.now}
})

export { Bouquet };
export default mongoose.model('Bouquet',Bouquet);

