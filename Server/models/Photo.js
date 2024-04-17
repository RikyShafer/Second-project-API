const mongoose = require('mongoose')

const PhotoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    imageUrl: {
        type: mongoose.Schema.Types.String,
        require: true,
    },

},
    {
        timestamps: true
    })
module.exports = mongoose.model('Photo', PhotoSchema)