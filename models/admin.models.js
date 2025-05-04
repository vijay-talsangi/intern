const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Admins = mongoose.model('Admin', AdminSchema);
module.exports = Admins;