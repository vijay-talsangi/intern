const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const userSchema = new Schema({
    prn: {
        type: String,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true
    },
    Department: {
        type: String,
        required: true
    },
    Course: {
        type: String,
        required: true
    },
    Program: {
        type: String,
        required: true
    },
    "Current Term": {
        type: Number,
        required: true
    },
    Mobile: {
        type: Number,
        required: true
    },
    "Email ID": {
        type: String,
        required: true,
        match: /.+\@.+\..+/ // Simple regex for email validation
    },
    password: {
        type: String,
        required: true,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // Password regex
        message: 'Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.'
    },
    "Year of passing 12th": {
        type: Number,
        required: true
    },
    "Lateral Entry": {
        type: String,
        required: true,
        enum: ['YES', 'NO'] // To ensure only these two values are accepted
    },
    Backlogs: {
        type: String,
        required: true,
        enum: ['YES', 'NO']
    },
    College: {
        type: String,
        required: true
    },
    "Applied At": {
        type: Date,
        required: true,
        default: Date.now
    },
    "Current Stage": {
        type: Number,
        required: true
    },
    "Application Status": {
        type: String,
        required: true
    },
    "Resume Link": {
        type: String,
        required: true
    },
    "Last Edited": {
        type: Date,
        required: true,
        default: Date.now
    }
});
const User = mongoose.model('users', userSchema);
module.exports = User;
