const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Internship = require('../models/internship.models');

exports.postInternship = wrapAsync(async (req, res) => {
    if (!req.session.user) {
        return res.status(401).render('auth/adminlogin', { error: "Please login first" });
    }
    const { role } = req.session;
    if (role !== 'admin') {
        return res.status(403).render('auth/adminlogin', { error: "You are not authorized to post internships" });
    }
    const { title, description, company, location, eligibility, stipend } = req.body;

    if (!title || !description || !eligibility || !stipend || !company || !location) {
        throw new ExpressError(400, "Please provide all required fields");
    }

    const internship = new Internship({
        title,
        description,
        eligibility,
        stipend,
        company,
        location,
        postedBy: req.session.user._id,
        applicants: []
    });

    await internship.save();
    res.status(200).json({ message: "Internship posted successfully" });
});

exports.getAdminInternships = wrapAsync(async (req, res) => {
    if (!req.session.user) {
        return res.status(401).render('auth/adminlogin', { error: "Please login first" });
    }
    const internships = await Internship.find({ postedBy: req.session.user._id });
    res.json({ internships });
});
exports.getInternshipDetails = wrapAsync(async (req, res) => {
    const { internshipId } = req.params;
    const internship = await Internship.findById(internshipId).populate('applicants');
    if (!internship) {
        throw new ExpressError(404, "Internship not found");
    }
    res.json(internship.applicants);
});
exports.deleteInternship = wrapAsync(async (req, res) => {
    const { internshipId } = req.params;
    const internship = await Internship.findByIdAndDelete(internshipId);
    if (!internship) {
        throw new ExpressError(404, "Internship not found");
    }
    res.status(200).json({ message: "Internship deleted successfully" });
});