import mongoose from '../db/db';
import * as crypto from 'crypto';

let Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String,
        unique: true,
        required: false
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

User.methods.encryptPassword = function(password:string){
  return crypto.pbkdf2Sync(password,this.salt,10000, 512, 'sha512').toString('hex');
}
//проверь поднимется ли контекст, если сделать стрелочную функцию в методе ниже
User.virtual('userId')
  .get(function(){
      return this.id;
  })

User.virtual('password')
  .set(function(password:string){
      this.salt = crypto.randomBytes(128).toString('hex');
      this.hashedPassword = this.encryptPassword(password);
  })
  .get(function(){this.hashedPassword})

User.methods.validatePassword = function(password:string){
  return this.encryptPassword(password) === this.hashedPassword;
}

export default mongoose.model( 'User',User );
export { User };
