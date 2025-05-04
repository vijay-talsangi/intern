const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const userSchema = new Schema({
    "Roll No": {
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
    Gender: { 
        type: String, 
        required: true,
        enum: ['MALE', 'FEMALE', 'OTHER'] 
    },
    DOB: { 
        type: String,
        required: true,
        match: /^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/ // Validate dd/mm/yyyy format
    },
    "Reservation Category": {
        type: String,
        required: true,
    },
    "Current Address": {
        type: String,
        required: true
    },
    "Permanent Address": {
        type: String,
        required: true
    },
    "Current Term Score": {
        type: Number,
        required: true
    },
    "Xth percentage": {
        type: Number,
        required: true
    },
    "Xth Board": {
        type: String,
        required: true
    },
    "Year of passing 10th": {
        type: Number,
        required: true
    },
    "XIIth percentage": {
        type: Number,
        required: true
    },
    "XIIth Board": {
        type: String,
        required: true
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
    "Resume Link": {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
});
const User = mongoose.model('users', userSchema);
module.exports = User;
