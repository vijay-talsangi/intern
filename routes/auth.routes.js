const express = require('express');
const router = express.Router();
const { signup ,login, logout, adminlogin, adminlogout} = require('../controllers/auth.controllers');

router.get('/login', (req, res) => {
    res.render('auth/login', {error: null});
});
router.get('/logout', logout);
router.post('/login', login);
router.get('/signup', (req, res) => {
    res.render('auth/signup', {error: null});
});
router.post('/signup', signup);
router.get('/adminlogin', (req, res) => {
    res.render('auth/adminlogin', {error: null});
});
router.post('/adminlogin', adminlogin);
router.get('/adminlogout', adminlogout);
module.exports = router;