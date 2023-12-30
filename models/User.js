const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter name"],
    },
    avatar: {
        public_id: String,
        url: String,
    },
    summary: {
        type: String,
        required: [true, "Add something about your profile"],
    },
    skills: [
        {
            skillTitle: { type: String, required: true }
        }
    ],
    workExperience: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WorkExperience",
        }
    ],

})

module.exports = mongoose.model('User', userSchema)