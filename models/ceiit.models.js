const mongoose = require('mongoose');

const objSchema = new mongoose.Schema({
    NOMBRE: {
        type: String,
        require: true
    },
    Lugar: {
        type: Number,
        require: true
    },
    isAvailable:{
        type : Boolean,
        require: true 
    },    
}, {collection:'ceiit'});

const Ceiit =  mongoose.model('Ceiit', objSchema);

module.exports = {
    Ceiit
};