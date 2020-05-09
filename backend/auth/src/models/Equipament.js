const mongoose = require('mongoose');

const EquipamentSchema = new mongoose.Schema({
    description: String,
    type: String,
    brand: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Equipament', EquipamentSchema);
