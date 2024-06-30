const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
});
itemSchema.index({ name: 1 }); // Index on 'name' field
module.exports = mongoose.model('Item', itemSchema);
