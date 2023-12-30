const User = require("../models/user");

const { API_STATUS_CODES, API_RESPONSE_MESSAGE } = require("../constants/constants");

const addUserInfo = async (req, res) => {
    try {
        const { name, summary, avatar } = req.body;

        if (!name || !summary) {
            return res.json({
                status: API_STATUS_CODES.ERROR_CODE,
                message: API_RESPONSE_MESSAGE.INVALID_USER_INFO,
            })
        }

        const user = await User({
            name,
            summary,
            avatar,
        })

        await user.save();

        return res.json({
            status: API_STATUS_CODES.SUCCESS,
            message: API_RESPONSE_MESSAGE.USER_ADDED,
            body: user,
        })

    } catch (error) {
        return res.json({
            status: API_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findOne().populate("workExperience")

        if (user) {
            return res.json({
                status: API_STATUS_CODES.SUCCESS,
                user: user,
            })
        } else {
            return res.json({
                status: API_STATUS_CODES.NOT_FOUND,
                message: API_RESPONSE_MESSAGE.USER_NOT_FOUND
            })
        }
    } catch (error) {
        return res.json({
            status: API_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

const addSkill = async (req, res) => {
    try {
        const { skillTitle } = req.body;

        if (!skillTitle || skillTitle.length < 2) {
            return res.json({
                status: API_STATUS_CODES.ERROR_CODE,
                message: API_RESPONSE_MESSAGE.INVALID_SKILL,
            })
        }

        const user = await User.findOne();

        const newSkill = {
            skillTitle: skillTitle
        }

        user.skills.push(newSkill);

        await user.save();

        return res.json({
            status: API_STATUS_CODES.SUCCESS,
            message: API_RESPONSE_MESSAGE.SKILL_ADDED,
            body: user,
        })

    } catch (error) {
        return res.json({
            status: API_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

const updateSkill = async (req, res) => {
    try {
        const user = await User.findOne();

        if (!user) {
            return res.json({
                status: API_STATUS_CODES.NOT_FOUND,
                message: API_RESPONSE_MESSAGE.USER_NOT_FOUND
            })
        }

        const skillId = req.params.skillId;
        const skillToEdit = user.skills.find((skill) => skill._id.toString() == skillId);

        if (!skillToEdit) {
            return res.json({
                status: API_STATUS_CODES.NOT_FOUND,
                message: API_RESPONSE_MESSAGE.NO_SKILL_FOUND
            })
        }

        const { skillTitle } = req.body;
        if (!skillTitle) {
            return res.json({
                status: API_STATUS_CODES.ERROR_CODE,
                message: API_RESPONSE_MESSAGE.INVALID_SKILL,
            })
        }

        skillToEdit.skillTitle = skillTitle;

        await user.save();

        return res.json({
            status: API_STATUS_CODES.SUCCESS,
            message: API_RESPONSE_MESSAGE.SKILLL_UPDATED,
        })

    } catch (error) {
        return res.json({
            status: API_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

const deleteSkill = async (req, res) => {
    try {
        const skillId = req.params.skillId;
        const user = await User.findOne();

        if (!user) {
            return res.json({
                status: API_STATUS_CODES.NOT_FOUND,
                message: API_RESPONSE_MESSAGE.USER_NOT_FOUND
            })
        }

        const skillToDelete = user.skills.find((skill) => skill._id.toString() == skillId);

        if (!skillToDelete) {
            return res.json({
                status: API_STATUS_CODES.NOT_FOUND,
                message: API_RESPONSE_MESSAGE.NO_SKILL_FOUND
            })
        }

        user.skills.pull({ _id: skillToDelete._id });

        await user.save();

        return res.json({
            status: API_STATUS_CODES.SUCCESS,
            message: API_RESPONSE_MESSAGE.SKILLS_DELETED
        })

    } catch (error) {
        return res.json({
            status: API_STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: error.message
        })
    }
}

module.exports = { addUserInfo, getUser, addSkill, updateSkill, deleteSkill }