import express from "express";
import employees from "./db/employees.js";

const app = express();

// GET /
app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

// GET /employees
app.route("/employees").get((req, res) => {
  res.send(employees);
});

// GET /employees/random (moved above :id, so it will be checked first)
app.route("/employees/random").get((req, res) => {
  const randomId = Math.floor(Math.random() * employees.length);
  const randomEmployee = employees[randomId];
  res.send(randomEmployee);
});

// GET /employees/:id
app.route("/employees/:id").get((req, res) => {
  const id = Number(req.params.id);
  const employee = employees.find((employee) => employee.id === id);
  if (employee) {
    res.send(employee);
  } else {
    res.status(404).send("Employee not found");
  }
});

export default app;
