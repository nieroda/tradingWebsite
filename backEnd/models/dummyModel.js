const mongoose = require('mongoose')

var dummyModel = new mongoose.Schema({
    Dummy: {
        type: String,
        required: `Cannot be blank!`
    },
    Dummy1: {
        type: String,
        requred: `Cannot be blank`
    },
    DummyDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('dummyModel', dummyModel);
