const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

let courses = [
    { id: 1, name: "java" },
    { id: 2, name: "javascript" },
    { id: 3, name: "python" }
];

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.post('/courses', (req, res) => {
    const newCourse = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

app.listen(port, () => {
    console.log("Server started");
});
