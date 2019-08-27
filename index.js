const express = require("express");
const projects = require("./projects");

const server = express();
server.use(express.json());

server.use("/projects", projects);

server.listen(3000);
