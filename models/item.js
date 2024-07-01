const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    state: String,
    city: String,
    address: String,
    paymentMode: String,
    remark: String,
    whatNumber: Number,
    total: Number,
    balance: Number,
    paid: Number,
    clientId:String

});
itemSchema.index({ name: 1 }); 
module.exports = mongoose.model('Item', itemSchema);
