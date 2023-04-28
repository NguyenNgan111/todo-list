import data from "./data.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// const data = {
//   tasks: [
//     { id: 1, todo: "Get a new helmet", tag: "Uncategorized" },
//     { id: 2, todo: "Purchase Milk & Corn Flakes", tag: "Groceries" },
//     { id: 3, todo: "Pay mortgage", tag: "Payments" },
//     { id: 4, todo: "Complete Assignments", tag: "College" },
//     { id: 5, todo: "Replace laptop’s screen", tag: "Uncategoriezed" },
//   ],
// };
//
// const data = require("./data");
// const express = require("express");
// const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const getData = (req, res) => {
  res.json(data.tasks);
};

const getAData = (req, res) => {
  res.json(data.tasks.find((task) => task.id == req.params.id));
};

app.get("/tasks", getData);
app.get("/tasks/:id", getAData);

// post
// var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/tasks", (req, res) => {
  const createdTimeStamp = new Date().toUTCString().slice(0, -3);
  const newTask = {
    id: Number(req.body.id),
    todo: req.body.todo,
    tag: req.body.tag,
    done: false,
    doneTime: "",
    createdTimeStamp: createdTimeStamp,
    personIncharge: "user",
  };
  res.send(newTask);
  data.tasks.push(newTask);
});
// put
app.put("/tasks/:id", (req, res) => {
  const task = {
    id: Number(req.params.id),
    todo: req.body.todo,
    tag: req.body.tag,
    done: req.body.done,
    doneTime: req.body.doneTime,
    createdTimeStamp: req.body.createdTimeStamp,
    personIncharge: req.body.personIncharge,
  };
  const index = data.tasks.findIndex((element) => element.id == task.id);
  if (index > -1) {
    console.log(index);
    data.tasks.splice(index, 1, task);
  } else {
    console.log("Not found task");
  }
  res.send(task);
});
//delete
// put
app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const index = data.tasks.findIndex((element) => element.id == id);
  if (index > -1) {
    data.tasks.splice(index, 1);
  } else {
    console.log("Not found task");
  }
  res.send(id);
});
//
const port = 8080;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
