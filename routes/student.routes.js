const express = require('express');
const router = express.Router();
const { getInternships, applyInternship, uploadResume } = require('../controllers/student.controllers');

router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.status(401).render('auth/login', { error: "Please login first" });
    }
    const user = req.session.user;
    res.render('student/dashboard', { user });
});
router.post('/upload-resume', uploadResume);
router.get('/internships/:studentId', getInternships);
router.post('/:studentId/apply/:internshipId', applyInternship);
module.exports = router;