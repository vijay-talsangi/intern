const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.status(401).render('auth/login', { error: "Please login first" });
    }
    const user = req.session.user;
    res.render('student/dashboard', { user });
});
module.exports = router;