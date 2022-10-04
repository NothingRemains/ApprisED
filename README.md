# ApprisEd

A full-stack application to allow students, teachers, and parents to communicate for better educational outcome.  Currently tracks overall student grades, grades by class and assignment, and allows all parties to access grades for their appropriate parties.

**Link to project:** Currently not deployed as I find a free alternative to Heroku for site deployment.  Test locally.

## TESTING NEEDS:

-Clone down the repository and set up an appropriate database (MongoDB was used during the original build).

-Add the file ".env" to the "config" folder.  It should contain the following variables:
    -PORT = default port for server to listen on.
    -MONGO-URI = MongoDB connection string, obtained from MongoDB Atlas by clicking on "Connect" in your database cluster.
    -GOOGLE-CLIENT-ID and GOOGLE-CLIENT-SECRET from the Google API for OAuth authentication.

-Users added to the database are initially assigned without roles (leaving them with guest privileges only).  Currently, changes to this need to be made to the database to access the student, teacher, and parent portals by changing the boolean values in the database of isStudent, isTeacher, and isParent to true.  Additionally, Courses and Assignments in the database (Course.js and Assignment.js models for templates) must currently be added by hand, and students and teachers for each assigned once made.  I will eventually add a tool here for population with sample data.

![alt tag](http://placecorgi.com/1200/650)

## How It's Made:

**Tech used:**
The app currently uses OAuth 2.0 for Google user authentication, though this will eventually be changed over to local authentication.  Because of the nature of the app, most accounts/permissions would have to be given by a school's IT department to protect actual student data.

The app is written in JavaScript, with EJS templating and front-end built using TailwindCSS and daisyUI.  Additionally, ApprisED uses passport, express, and mongoose among other various minor tools.

## Optimizations

First-pass optimizations include some minor goals like overall grade inclusion in teacher grade tables, refactoring of data passed to EJS, and some user authentication on routes.  I'd also like to hone in on a11y requirements for accessibility in the app, and responsiveness for mobile users.

Mid-term goals focus on inclusion of data for upcoming school events, absence trackers for teachers alerting them to upcoming extracurricular activity absences, and personalized grade information (i.e., grade trends over time).  Also needs functionality for addition and modification of grades through the interface (currently managed through the db only).

Long-term goals include integration with scanner/QR technology to allow for attendance taking with student ID cards, as well as a digital pass system to allow students to check in/out of a classroom for personal or scholastic needs.  Alerting procedures for students at risk of being held back or dropping out may also be implemented.

###### --- Optimizations/Fixes to Current Code ---

- [ ] Refactor arrays passed to teacherCourses.ejs as objects with better structure.

- [ ] Responsive design for mobile and tablet users (currently desktop optimized only).

- [ ] Compliance with a11y principles to allow for greater accessibility.

- [ ] Information encryption for FERPA compliance.

- [ ] Controller function refactor, breaking out some components for db queries into middleware/multi-controller accessibility when functionality is similar.

- [ ] Refactor of partial views to allow for more reuseable components.

- [ ] Possible move to a relational database type, as much of the data is interconnected and may be better served by switching.

###### --- Additional Features and Functionality ---

- [ ] Addition of POST/PUT functionality for student assignments, to allow for addition of assignments within a class as well as grade editing.

- [ ] Tardy/absence functions, with possible scanner integration.

- [ ] Database/partial view for school activity calendars.

- [ ] Additional authentication for functionality to prevent unauthorized information access.

## Lessons Learned:

-A project like this may be better served with a relational database and a component-based framework, as much of the information is both stored and viewed in similar manners across pages.  Shifting this app to React and a relational database may make the final product more efficient and clean.

-TailwindCSS and daisyUI have been a godsend for someone who has not been trained in UX/UI design.  Very useful for making reasonable-looking views and functionality for the end user!
