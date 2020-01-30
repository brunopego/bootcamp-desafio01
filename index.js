const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    const project = {
        id,
        title,
        tasks: []
    };

    project.tasks = req.body.tasks;

    projects.push(project);

    return res.json(project);

});

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.listen(3000);