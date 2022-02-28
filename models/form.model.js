const mongoose = require('mongoose');

const form = new mongoose.Schema(
    {
        nombre:{type:String},
        apellido:{type:String},
        pais:{type:String},
        telefono:{type:String},
        correo:{type:String}
    }
);

const formModel = mongoose.model('NewsletterInfo', form);

module.exports = formModel;