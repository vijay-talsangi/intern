const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    company: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String 
    },
    stipend: { 
        type: String 
    },
    eligibility: {
        minCGPA: { type: Number, default: 0 },
        minXthPercentage: { type: Number, default: 0 },
        minXIIthPercentage: { type: Number, default: 0 }
    },
    postedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'admin' 
    },
    applicants: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users' 
    }]
});

const Internship = mongoose.model('internship', InternshipSchema);
module.exports = Internship;