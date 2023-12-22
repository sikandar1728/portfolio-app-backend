const WorkExperience = require('../models/workExperience')
const { API_RESPONSE_MESSAGE, API_STATUS_CODES } = require('../constants/constants')

const addWorkExperience = async (req, res) => {
    try {
        const { companyName, startDate, endDate, description } = req.body;

        const startDateValue = new Date(startDate);
        const endDateValue = new Date(endDate);

        if (endDateValue <= startDateValue) {
            return res.json({
                status: API_STATUS_CODES.ERROR_CODE,
                message: API_RESPONSE_MESSAGE.END_DATE_ERROR,
            })
        }

        const experience = new WorkExperience({
            companyName,
            startDate,
            endDate,
            description
        });

        await experience.save();

        return res.json({
            status: API_STATUS_CODES.SUCCESS,
            message: API_RESPONSE_MESSAGE.EXPERIENCE_ADDED,
            body: experience
        })

    } catch (error) {
        return res.json({
            status: API_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

const getAllWorkExperiences = async (req, res) => {
    try {
        const experiences = await WorkExperience.find();
        return res.json({
            status: API_STATUS_CODES.SUCCESS,
            experiences: experiences,
        })
    } catch (error) {
        return res.json({
            status: API_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

const updateWorkExperience = async (req, res) => {
    try {
        const existingExperience = await WorkExperience.findById(req.params.experienceId);
        const { companyName, startDate, endDate, description } = req.body;

        if (!existingExperience) {
            return res.json({
                status: API_STATUS_CODES.NOT_FOUND,
                message: API_RESPONSE_MESSAGE.NO_EXPERIENCE_FOUND
            })
        }

        if (companyName) {
            existingExperience.companyName = companyName;
        }
        if (startDate) {
            existingExperience.startDate = startDate;
        }
        if (endDate) {
            existingExperience.endDate = endDate;
        }
        if (description) {
            existingExperience.description = description;
        }

        await existingExperience.save();

        return res.json({
            status: API_STATUS_CODES.SUCCESS,
            message: API_RESPONSE_MESSAGE.EXPERIENCE_UPDATED
        })

    } catch (error) {
        return res.json({
            status: API_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

const deleteWorkExperience = async (req, res) => {
    try {
        const workExperience = await WorkExperience.findById(req.params.experienceId);

        if (!workExperience) {
            return res.json({
                status: API_STATUS_CODES.NOT_FOUND,
                message: API_RESPONSE_MESSAGE.NO_EXPERIENCE_FOUND
            })
        }

        await workExperience.deleteOne();

        return res.json({
            status: API_STATUS_CODES.SUCCESS,
            message: API_RESPONSE_MESSAGE.EXPERIENCE_DELETED,
        })
    } catch (error) {
        return res.json({
            status: API_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: error.message,
        })
    }
}

module.exports = { addWorkExperience, getAllWorkExperiences, updateWorkExperience, deleteWorkExperience }