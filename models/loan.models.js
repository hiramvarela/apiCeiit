const mongoose = require('mongoose');
const User = require("../models/user.models").User;
const objSchema = new mongoose.Schema({
    nameUser:{
        type:Number,
        require:true
    },
    date:{
        type:Date,
        require:true 
    },
    nameObj:{
        type: String,
        require:true
    },
    status:{
        type:Boolean,
        require: true
    },
    linkOpenLoan:{
        type:String
    },
    linkCloseLoan:{
        type:String
    }
});

const Loan =  mongoose.model('Loan', objSchema);

module.exports = {
    Loan
};