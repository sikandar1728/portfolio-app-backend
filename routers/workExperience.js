const express = require('express');

const { addWorkExperience, getAllWorkExperiences,
    updateWorkExperience, deleteWorkExperience } = require('../controllers/workExperience');

const router = express.Router();

router.post('/addWorkExperience', addWorkExperience);
router.get('/experience', getAllWorkExperiences);
router.put('/editWorkExperience/:experienceId', updateWorkExperience)
router.delete('/deleteWorkExperience/:experienceId', deleteWorkExperience)

module.exports = router;