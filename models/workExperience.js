const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workExperienceSchema = new Schema({
    companyName: {
        type: String,
        required: [true, "company name is required!"],
    },
    startDate: {
        type: String,
        required: [true, "start date is required!"],
    },
    endDate: {
        type: String,
        required: [true, "end date is required!"],
    },
    description: {
        type: String,
        required: [true, "work description is required!"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('WorkExperience', workExperienceSchema)