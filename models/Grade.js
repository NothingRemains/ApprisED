const mongoose = require('mongoose')

const GradeSchema = new mongoose.Schema({
    assignmentId: {
        type: String,
        required: true
    },
    teacherId: {
        type: String,
        required: true
    },
    grade: [ {
        studentId: { type: String, required: true },
        studentGrade: { type: Number, required: true }
    }],
}, { timestamps: true } )

module.exports = mongoose.model('Grade', GradeSchema)