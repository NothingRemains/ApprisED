const { request } = require('express')
const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const coursesController = require('../controllers/courses')
const parentController = require('../controllers/parent')
const teacherController = require('../controllers/teacher')

// @desc    GET Parent Homepage
// @route   /portal/parent/:id
router.get('/parent/:id', parentController.listChildren)

// @desc    GET Student Homepage
// @route   /portal/student/:id
router.get('/student/:id', coursesController.findCourses)

// @desc    GET Teacher Homepage
// @route   /portal/teacher/:id
router.get('/teacher/:id', teacherController.renderPortal)

// @desc    GET Course Homepage
// @route   /portal/teacher/:id
router.get('/teacher/course/:id', teacherController.renderCourse)

module.exports = router