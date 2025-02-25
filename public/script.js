const API_URL = "/tasks";

async function fetchTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `${task.title} <button onclick="deleteTask(${task.id})">Delete</button>`;
        taskList.appendChild(li);
    });
}

async function addTask() {
    const taskTitle = document.getElementById("taskTitle").value;
    if (!taskTitle) return;
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: taskTitle })
    });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
}

fetchTasks();
