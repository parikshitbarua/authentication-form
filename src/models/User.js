import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 2,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 2,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash_password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.virtual("fullName").get(() => {
    return `${this.firstName} ${this.lastName}`;
});

UserSchema.method({
    async authenticate(password){
        return bcrypt.compare(password, this.hash_password)
    }
})
const UserModel = model('User', UserSchema);
export default UserModel;