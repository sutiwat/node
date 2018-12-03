const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide your username']
    },
    email: {
        type: String,
        required: [true, 'Please provide you email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide you password']
    }
});

UserSchema.pre('save', function(next){
    const user = this
    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(user.password,salt,(err,hash)=>{
            user.password = hash
            next()
        })
    })
})

module.exports = mongoose.model('User', UserSchema);