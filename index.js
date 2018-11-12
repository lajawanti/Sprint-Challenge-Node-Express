const express = require('express');
const cors = require('cors');

const projectsRouter = require('./projectsrouter/projectsRouter.js');
const actionsRouter = require('./actions/actionsRouter.js');

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => res.send("Welcome ... Here are.. PROJECTS!"));

server.use("/projects", projectsRouter);
server.use("/actions", actionsRouter);

const port = 9000;
server.listen(port, () => console.log(`App running on port ${port}`));
  
