import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface UserI {
    username: string;
    email: string;
    password: string;
  }

const userSchema = new Schema<UserI>({
    username: {
        type: String,
        minlength: [3, 'username must be 3 chars at least.'],
        required: [true, 'Email is required.'],
        maxlength: [30, 'username cannot be more than 30 chars long.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        validate: {
            validator: function(value: string){return value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)},
            message: 'Cannot be a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minLength: [8, 'Password cannot be less than 8 chars long.']
    },
});

//User schema hooks
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10).then(hash => hash.toString());
    next()
});

//  Schema instances methods
userSchema.methods.createToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET , {
        expiresIn: process.env.JWT_EXPIRY
    });
}

userSchema.methods.isPasswordsMatched = async function(enteredPassword: string){
    return await bcrypt.compare(enteredPassword, this.password);
}

const UserModel = model<UserI>('User', userSchema);

export {UserModel}