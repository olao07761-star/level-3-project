const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    storage: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    marketValue: {
        type: String,
        required: true
    },
    tradeInValue: {
        type: String,
        required: true
    },
    trend: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    availabilityColor: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
