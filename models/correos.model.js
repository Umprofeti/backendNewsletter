const mongoose = require('mongoose');

const email = new mongoose.Schema(
    {
        email:{type:String, unique: true},
    }
)

const emailModel = mongoose.model('Correos', email)

module.exports = emailModel