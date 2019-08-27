const express = require("express");
const router = express.Router();

const data = [];
let totalReqs = 0;

function logTotalReqs(req, res, next) {
  console.log(`${++totalReqs} requisições realizadas`);
  next();
}

function idExists(req, res, next) {
  const index = data.findIndex(({ id }) => id == req.params.id);
  if (index === -1) {
    res.status(404).send("Id não existe");
  } else {
    req.projectIndex = index;
    return next();
  }
}

router.use(logTotalReqs);

router.get("/", (req, res) => {
  res.json(data);
});

router.get("/:id", idExists, (req, res) => {
  res.json(project[req.projectIndex]);
});

router.post("/", (req, res) => {
  const id = data.length;
  const { title } = req.body;
  data.push({ id, title, tasks: [] });
  res.json(data);
});

router.put("/:id", idExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  data[id].title = title;
  res.json(data);
});

router.delete("/:id", idExists, (req, res) => {
  data.splice(req.projectIndex, 1);
  res.json(data);
});

router.delete("/:id", (req, res) => {});

router.post("/:id/tasks", idExists, (req, res) => {
  const { title } = req.body;
  data[req.projectIndex].tasks.push(title);
  res.json(data);
});

module.exports = router;
