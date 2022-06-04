const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        // required: true,
        unique: true
    },
    password: {
        type: String
        // ,
        // required: true //DUE TO FB AND GOOGLE
    },
    myCart:[
        {
        type:Object
        }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    fbId:String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', userSchema);