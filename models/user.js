const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    admin: Boolean,
    age: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;