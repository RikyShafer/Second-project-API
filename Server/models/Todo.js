const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    tags: {
        type: [String],
        require: true,
    },
    completed: {
        type: mongoose.Schema.Types.Boolean,
        default: false,
    },

},
    {
        timestamps: true
    })
module.exports = mongoose.model('Todo', TodoSchema)