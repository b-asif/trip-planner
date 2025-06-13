const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    travellers: Number,
    startAvailability: [Date],
    endOfAvailability: [Date],
    travelDays: Number
});

module.exports = mongoose.model("Traveler", userSchema);