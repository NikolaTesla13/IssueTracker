const mongoose = require('mongoose');

const IssueSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    asignedTo: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Issue', IssueSchema);