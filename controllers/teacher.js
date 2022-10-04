const User = require('../models/User')
const Course = require('../models/Course')
const Assignment = require('../models/Assignment')


module.exports = {
    renderPortal: async (req, res) => {
        try { 
            const teacher = req.user
            const teacherCourses = await module.exports.listCourses(req.user.id)
            const students = await module.exports.listStudents(teacher)
            const uniqueStudents = [...new Map(students.flat().map((student, id) => [student[id], student])).values()]
            res.render('teacherPortal.ejs', { user: teacher, students: students, uniqueStudents: uniqueStudents, courses: teacherCourses })
        }
        catch(err) {
            console.log(err)
        }
    },
    renderCourse: async (req, res) => {
        try { 
            const teacher = req.user
            const course = req.params.id
            const courseInfo = await (await Course.find( { _id: course }))[0]
            console.log(`courseInfo = ${courseInfo}`)
            const assignments = await Assignment.find( { courseId: course })
            // grades format: [firstname, lastname, [ [assignmentName, points, maxPoints]]]
            // grades[0] gets each full user array, grades[0][0,1,2] gets firstname, lastname, array of assignments, grades[0][2][0] gets a singular assignment from the array, grades[0][2][0][0,1,2] gets assignmentname, studentpoints, maxpoints
            // Should eventually be refactored into an object
            const grades = await (await (module.exports.listGrades(assignments)))[0]
            console.log(grades[0][2][0][0])

            res.render('teacherCourses.ejs', { user: teacher, courseInfo: courseInfo, grades: grades })
        }
        catch(err) {
            console.log(err)
        } 
    },
    listStudents: async (teacher) => {
        let studentList = []
        let courseStudents = await (await User.find( { isStudent: true }))
        for (let course = 0; course < teacher.courses.length; course++) {
            studentList.push([])
            for( let student = 0; student < courseStudents.length; student++) {
                if( courseStudents[student].courses.includes(teacher.courses[course])) {
                    studentList[course].push(courseStudents[student])
                }
            }
        }
        return studentList
    },
    listGrades: async (assignments) => {
        console.log(`assignments = ${assignments}`)
        const studentIds = assignments.map(el => el.grades.studentId)
        let classStudents = (await User.find({ isStudent: true })).filter(el => studentIds.includes(el._id.valueOf()))
        let grades = []

        for (let student = 0; student < classStudents.length; student++) {
            let thisStudentAssignments = assignments.filter(el => assignments.filter(el => el.grades.studentId === studentIds[student])).map(each => [each.assignmentName, each.grades.points, each.maxPoints])

            grades.push(classStudents.map(el => [el.firstName, el.lastName, thisStudentAssignments]))
        }
        return grades
    },
    listCourses: async (teacher) => {
        //Might be a problem with sorting here, since it's done without courseIds
        allCourses = await Course.find( { teacherId: teacher })
        courseInfo = allCourses.map(el =>  [el.courseName, el._id] )
        return courseInfo
    }
}