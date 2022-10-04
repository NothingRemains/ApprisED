const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    isTeacher: {
        type: Boolean,
        required: true,
        default: false
    },
    isStudent: {
        type: Boolean,
        required: true,
        default: false
    },
    isParent: {
        type: Boolean,
        required: true,
        default: false
    }, 
    parentOf: {
        type: [String]
    },
    childOf: {
        type: [String]
    },
    courses: {
        type: [String]
    }
}, { timestamps: true } )

module.exports = mongoose.model('User', UserSchema)