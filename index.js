const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

// Custom middleware for logging
const loggerMiddleware = (req, res, next) => {
    const method = req.method;
    const ip = req.ip;
    const hostname = req.hostname;
    const date = new Date().toISOString();

    console.log(method);
    console.log(ip);
    console.log(hostname);
    console.log(date);
    next(); // Call next() to pass control to the next middleware function in the stack
};

// Register logger middleware globally
app.use(loggerMiddleware);

let courses = [
    { id: 1, name: "java" },
    { id: 2, name: "javascript" },
    { id: 3, name: "python" }
];

// GET all courses
app.get('/courses', (req, res) => {
    res.json(courses);
});

// POST a new course
app.post('/courses', (req, res) => {
    const newCourse = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

// PUT (update) a course by ID
app.put('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const courseToUpdate = courses.find(course => course.id === courseId);
    if (!courseToUpdate) {
        return res.status(404).send('Course not found');
    }
    courseToUpdate.name = req.body.name;
    res.json(courseToUpdate);
});

// DELETE a course by ID
app.delete('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const courseIndex = courses.findIndex(course => course.id === courseId);
    if (courseIndex === -1) {
        return res.status(404).send('Course not found');
    }
    const deletedCourse = courses.splice(courseIndex, 1);
    res.json(deletedCourse[0]);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
