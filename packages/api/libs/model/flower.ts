import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

let Flower = new Schema({
    id:{
       type: Number,
       required: true,
       unique: true
    },
    name:{
        type: String,
        required: true,
    },
    source:{
        type: String,
        required: true
    }
})

Flower.virtual('model')
    .get(function(){
        return this.source && this.name;
    })

export default mongoose.model('Flower',Flower);
export { Flower };