const express = require('express');

const { addUserInfo, addSkill, getUser, updateSkill, deleteSkill } = require('../controllers/user');

const router = express.Router();

router.post('/addUserInfo', addUserInfo)
router.get('/userInfo', getUser)

router.post('/addSkill', addSkill)
router.put('/editSkill/:skillId', updateSkill)
router.delete('/deleteSkill/:skillId', deleteSkill)

module.exports = router