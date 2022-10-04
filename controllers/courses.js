const Course = require("../models/Course")
const Assignment = require("../models/Assignment")
const User = require("../models/User")

module.exports = {
    findCourses: async (req,res) => {
        try {
            
            const student = req.params.id
            console.log(student)
            const studentInfo = await User.find( { _id: student } )
            console.log(`StudentInfo = ${studentInfo}`)
            const courses = await Course.find( { user: student } )
            //fix for multiple students later, currently hardcoded
            const assignments = await Assignment.find( { "students[0]": student })
            
            let courseList = courses.map(course => course.courseName)
            let studentAssignments = module.exports.findAssignments(student, courses, assignments);
            let studentGrades = module.exports.findGrades(student, studentAssignments)
            let overallGrades = module.exports.findOverallGrades(student, studentGrades, courseList)

            res.render("studentPortal.ejs", { student: studentInfo, user: req.user, grades: overallGrades, studentAssignments: studentAssignments })
        }
        catch(err) {
            console.log(err)
        }
    },
    findAssignments: (student, courses, assignments) => {
        let courseAssignments = []

        courses.forEach((course) => {
            let thisCourseAssignments = assignments.filter(el => el.courseId === course._id.valueOf())
            courseAssignments.push(thisCourseAssignments)
            })
        return courseAssignments;
    },
    findGrades: (student, studentAssignments) => {
        let thisStudentGrades = []

        studentAssignments.forEach(course => {
           let replaceWithPoints = course.map(el => [el.grades.points, el.maxPoints])
           thisStudentGrades.push(replaceWithPoints)
        })
        return thisStudentGrades
    },
    findOverallGrades: (student, studentGrades, courseList) => {
        let coursePoints = []

        studentGrades.forEach((course, index) => {
            const studentPoints = course.reduce((totalGrade, currentGrade) => totalGrade + currentGrade[0], 0)
            const maxPoints = course.reduce((totalGrade, currentGrade) => totalGrade + currentGrade[1], 0)
            const pointsPercent = studentPoints / maxPoints * 100
            const percentage = ((pointsPercent).toFixed(2) + '%')
            const letterGrade = (pointsPercent >= 90) ? 'A' : 
                                (pointsPercent >= 80) ? 'B' :
                                (pointsPercent >= 70) ? 'C' :
                                (pointsPercent >= 60) ? 'D' : 'F'

            // coursePoints.push([studentPoints, maxPoints, percentage, letterGrade])
            coursePoints.push({ 'course': courseList[index], 
                                'studentPoints': studentPoints, 
                                'maxPoints': maxPoints,
                                'percentage': percentage,
                                'letterGrade': letterGrade })
        })
        return coursePoints
    }
}