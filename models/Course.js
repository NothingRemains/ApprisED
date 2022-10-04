const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    teacherId: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    students: [String],
}, { timestamps: true } )

module.exports = mongoose.model('Course', CourseSchema)