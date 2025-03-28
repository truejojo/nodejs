//@ts-nocheck
var mongoose = require('mongoose');
var customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    industry: String,
    orders: [
        {
            description: String,
            amountInCents: Number
        },
    ]
});
module.exports = mongoose.model('customer', customerSchema);
