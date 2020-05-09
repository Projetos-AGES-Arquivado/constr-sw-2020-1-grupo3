const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    description: String,
    type: String,
    capacity: Number,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Room', RoomSchema);
