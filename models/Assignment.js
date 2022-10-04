const mongoose = require('mongoose')

const AssignmentSchema = new mongoose.Schema({
    assignmentName: {
        type: String,
        required: true
    },
    assignmentCategory: {
        type: String,
        required: true
    },
    maxPoints: {
        type: Number,
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    teacherId: {
        type: String,
        required: true
    },
    grades: {
        studentId: {type: String, required: true},
        points: {type: Number, required: true, default: 0}
    }
    
}, { timestamps: true } )

module.exports = mongoose.model('Assignment', AssignmentSchema)