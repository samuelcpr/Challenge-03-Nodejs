const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
    const {} = request
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const { title, url, techs } = request.body

    const repository = {
        id: uuid(),
        title,
        url,
        techs,
        likes: 0
    };
    // add push()
    repositories.push(repository)

    return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
    const { id } = request.params;
    const { title, techs, url } = request.body; // we will receive the attributes and return them in json(repository)
    // the error was the lowercase i of the findIndex
    repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if (repositoryIndex < 0) {
        return response.status(404).json({ error: "Repository not found" });
    }

    const repository = {
        ...repositories[repositoryIndex],
        title,
        techs,
        url

    };

    repositories[repositoryIndex] = repository;

    return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
    const { id } = request.params;

    repositoryIndex = repositories.findIndex(repository => repository.id === id);
    // resolution : repositoryIndex < 0
    if (repositoryIndex < 0) {
        return response.status(404).json({ error: "Repository not found" });
    }

    repositories.splice(repositoryIndex, 1);

    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;

    repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if (repositoryIndex < 0) {
        return response.status(404).json({ error: "Repository not found" });
    }

    const likes = ++repositories[repositoryIndex].likes;

    return response.json({ likes }); // remove the "" from the attribute and put it between {}likes to fix the error 
});

module.exports = app;