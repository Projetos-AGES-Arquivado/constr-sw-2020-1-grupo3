const mongoose = require('mongoose');

const ResourceTypeSchema = new mongoose.Schema({
    type: String
}, 
{
    timestamps: true,
});

module.exports = mongoose.model('ResourceType', ResourceTypeSchema);
