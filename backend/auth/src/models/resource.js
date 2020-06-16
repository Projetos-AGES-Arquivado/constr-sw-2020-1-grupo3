const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    resourceType: {type: mongoose.Schema.Types.ObjectId, ref: 'ResourceType'},
    resourceName: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Resource', ResourceSchema);
