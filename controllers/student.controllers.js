const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Internship = require("../models/internship.models");
const Users = require("../models/users.models");

exports.getInternships = wrapAsync(async (req, res) => {
    const { studentId } = req.params;
    const student = await Users.findById(studentId);

   

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    // Fetch all internships
    const internships = await Internship.find({});

    // Filter internships based on eligibility
    const eligibleInternships = internships.filter(internship => {
        return (
            (student["Current Term Score"] ?? 0) >= (internship.eligibility.minCGPA ?? 0) &&
            (student["Xth percentage"] ?? 0) >= (internship.eligibility.minXthPercentage ?? 0) &&
            (student["XIIth percentage"] ?? 0) >= (internship.eligibility.minXIIthPercentage ?? 0)
        );
    });

    res.json(eligibleInternships);
}
);
exports.applyInternship = wrapAsync(async (req, res) => {
    const { internshipId, studentId } = req.params;

    // Find the internship
    const internship = await Internship.findById(internshipId);
    if (!internship) {
        return res.status(404).json({ message: 'Internship not found' });
    }

    // Find the student
    const student = await Users.findById(studentId);
    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    // Check if the student has already applied
    if (internship.applicants.includes(studentId)) {
        return res.status(400).json({ message: 'You have already applied for this internship' });
    }

    // Add the student to the internship's applicants list
    internship.applicants.push(studentId);
    await internship.save();

    res.status(200).json({ message: 'Applied successfully' });
});
exports.uploadResume = wrapAsync(async (req, res) => {
    const studentId = req.session.user._id;
    const { resume } = req.body;
    // Validate the resume link
    if (!resume) {
        return res.status(400).json({ message: 'Resume link is required' });
    }
    // Find the student
    const student = await Users.findById(studentId);
    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }
    // Update the student's resume link
    student["Resume Link"] = resume;
    await Users.updateOne({ _id: studentId }, { $set: { "Resume Link": resume } });
    res.status(200).json({ message: 'Resume uploaded successfully' });

}
);