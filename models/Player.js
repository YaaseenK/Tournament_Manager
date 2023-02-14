const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Your email was Wrong,please enter a valid email address",]
        },
    password: {
        type: String,
        
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    ingameusername: {
        type: String,
        unique: true,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
   
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    accountLevel: {
        type: Number,
        required: true,
    },
});

const user = model('user', userSchema);

module.exports = user;