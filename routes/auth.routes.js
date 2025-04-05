const express = require('express');
const router = express.Router();
const {login, logout} = require('../controllers/auth.controllers');

router.get('/login', (req, res) => {
    res.render('auth/login', {error: null});
});
router.get('/logout', logout);
router.post('/login', login);
module.exports = router;