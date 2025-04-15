const mongoose = require("mongoose");

const MySchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'A note must have title'],
        unique : [true, 'Name must be unique']
    },
    markdownContent : {
        type : String,
        required : [true, 'File cannot be empty']
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

const Notes = mongoose.model('NotesSchema', MySchema);
module.exports = Notes;