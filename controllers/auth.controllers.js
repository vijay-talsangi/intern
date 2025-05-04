const bcrypt = require("bcryptjs");
const Users = require("../models/users.models");
const Admins = require("../models/admin.models");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");

exports.signup = wrapAsync(async (req, res) => {
    const {
        "Roll No": rollNo,
        Name: name,
        Department: department,
        Course: course,
        Program: program,
        "Current Term": currentTerm,
        Mobile: mobile,
        "Email ID": email,
        Gender: gender,
        DOB: dob,
        "Reservation Category": reservationCategory,
        "Current Address": currentAddress,
        "Permanent Address": permanentAddress,
        "Current Term Score": currentTermScore,
        "Xth percentage": xthPercentage,
        "Xth Board": xthBoard,
        "Year of passing 10th": yearOfPassing10th,
        "XIIth percentage": xiithPercentage,
        "XIIth Board": xiithBoard,
        "Year of passing 12th": yearOfPassing12th,
        "Lateral Entry": lateralEntry,
        Backlogs: backlogs,
        College: college,
        "Resume Link": resumeLink,
        password
    } = req.body;
    // Convert DOB from yyyy-mm-dd to dd/mm/yyyy
    const dobParts = dob.split('-'); // Split the yyyy-mm-dd format
    const formattedDOB = `${dobParts[2]}/${dobParts[1]}/${dobParts[0]}`; // Convert to dd/mm/yyyy format

    // Validate required fields
    if (
        !rollNo || !name || !department || !course || !program || !currentTerm ||
        !mobile || !email || !gender || !dob || !reservationCategory ||
        !currentAddress || !permanentAddress || !currentTermScore || !xthPercentage ||
        !xthBoard || !yearOfPassing10th || !xiithPercentage || !xiithBoard ||
        !yearOfPassing12th || !lateralEntry || !backlogs || !college || !resumeLink || !password
    ) {
        throw new ExpressError(400, "Please provide all required fields");
    }
    // Check if the user already exists
    const existingUser = await Users.findOne({ "Email ID": email });
    if (existingUser) {
        return res.status(400).render('auth/signup', { error: "User already exists" });
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).render('auth/signup', { error: "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new Users({
        "Roll No": rollNo,
        Name: name,
        Department: department,
        Course: course,
        Program: program,
        "Current Term": currentTerm,
        Mobile: mobile,
        "Email ID": email,
        Gender: gender,
        DOB: formattedDOB,
        "Reservation Category": reservationCategory,
        "Current Address": currentAddress,
        "Permanent Address": permanentAddress,
        "Current Term Score": currentTermScore,
        "Xth percentage": xthPercentage,
        "Xth Board": xthBoard,
        "Year of passing 10th": yearOfPassing10th,
        "XIIth percentage": xiithPercentage,
        "XIIth Board": xiithBoard,
        "Year of passing 12th": yearOfPassing12th,
        "Lateral Entry": lateralEntry,
        Backlogs: backlogs,
        College: college,
        "Resume Link": resumeLink,
        password: hashedPassword
    });

    // Save the user to the database
    await user.save();

    // Redirect to the login page
    res.status(201).redirect('/auth/login');
});
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
exports.adminlogin = wrapAsync(async (req, res) => {
    const { username, password, role } = req.body;
    if(!username || !password || !role) {
        throw new ExpressError(400, "Please provide all required fields");
    }
    const admin = await Admins.findOne({ username });
    if (!admin) {
        return res.status(401).render('auth/adminlogin', { error: "Admin not found" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        return res.status(401).render('auth/adminlogin', { error: "Wrong Password" });
    }
    req.session.user = admin;
    req.session.role = 'admin';
    res.status(200).redirect('/admin/dashboard');
}
);
exports.adminlogout = wrapAsync(async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).render('auth/adminlogin', { error: "Logout failed" });
        }
        res.redirect('/auth/adminlogin');
    } );
}
);
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).render('auth/login', { error: "Logout failed" });
        }
        res.redirect('/auth/login');
    });
};