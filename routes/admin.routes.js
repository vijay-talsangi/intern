const express = require('express');
const router = express.Router();
const {postInternship, getAdminInternships, getInternshipDetails, deleteInternship} = require('../controllers/admin.controllers');

router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.status(401).render('auth/adminlogin', { error: "Please login first" });
    }
    const user = req.session.user;
    res.render('admin/dashboard', { user });
});
router.post('/internship', postInternship);
router.get('/internships', getAdminInternships);
router.get('/internship/:internshipId', getInternshipDetails);
router.post('/internship/:internshipId/delete', deleteInternship);
module.exports = router;