const express = require("express");
const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(express.static("public"));


// In-memory database for tasks
let tasks = [
  { id: 1, title: "Learn Docker", completed: false },
  { id: 2, title: "Build a microservice", completed: true },
];

//default route

app.get("/", (req, res) => {
    res.send("Task Microservice is Running!");
  });
  
// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Get a single task by ID
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// Create a new task
app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: req.body.completed || false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  task.title = req.body.title || task.title;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
  res.json(task);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Task microservice running on port ${PORT}`));
