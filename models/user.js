const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    access: {
        type: Boolean,
        default: false,
        required: true
    },    
    role: {
        type: Boolean,
        default: false,
        required: true
    },    
    image: {
        type: String
    }
});

mongoose.model('users', UserSchema);