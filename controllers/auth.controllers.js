const bcrypt = require("bcryptjs");
const Users = require("../models/users.models");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");

exports.login = wrapAsync(async (req, res) => {
    const { email, password, role } = req.body;
    if(!email || !password || !role) {
        throw new ExpressError(400, "Please provide all required fields");
    }
    if(role == 'student'){
        const user = await Users.findOne({ "Email ID": email });
        if (!user) {
            return res.status(401).render('auth/login', { error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).render('auth/login', { error: "Wrong Password" });
        }
        req.session.user = user;
        req.session.role = role;
        res.status(200).redirect('/student/dashboard');
    }
});
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).render('auth/login', { error: "Logout failed" });
        }
        res.redirect('/auth/login');
    });
};