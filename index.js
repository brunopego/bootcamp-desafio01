const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

server.use((req, res, next) => {
    console.count("Number of requisitions");
    return next();
});

function checkProjectExistsById(req, res, next) {
    const project =  projects.find(proj => proj.id == req.params.id);
    
    if(!project) {
        return res.status(400).json({ "error": "The project doesn't exist" });
    }

    return next();
}

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

server.post('/projects/:id/tasks', checkProjectExistsById, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(proj => proj.id == id);

    project.tasks.push(title);

    return res.json(project);

});

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.put('/projects/:id', checkProjectExistsById, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(proj => proj.id == id);

    project.title = title;

    return res.json(project);

});

server.delete('/projects/:id', checkProjectExistsById, (req, res) => {
    const { id } = req.params;

    const projIndex = projects.findIndex(proj => proj.id == id);

    projects.splice(projIndex, 1);

    return res.status(200).json({ "message": "Project deleted" });

});

server.listen(3000);