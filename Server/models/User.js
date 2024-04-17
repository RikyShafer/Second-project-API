const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
    },
    email: {
        type: mongoose.Schema.Types.String,
        default: false,
    },
    address: {
        type: String,
    },
    
    phone: {
        type: String,
    },
},
    {
        timestamps: true
    })
module.exports = mongoose.model('User', UsersSchema)