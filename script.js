const apiURL = "https://to-do-app-backend-1srg.onrender.com/api/tasks";

// Fetch all tasks from the backend and display them
async function fetchTasks() {
  const res = await fetch(apiURL);
  const tasks = await res.json();

  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear existing list

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <label>
        <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask('${task._id}', ${!task.completed})" />
        <span>${task.title}</span>
      </label>
      <button onclick="deleteTask('${task._id}')">🗑️</button>
    `;

    taskList.appendChild(li);
  });
}

// Add a new task
async function addTask() {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();
  if (!title) return alert("Please enter a task");

  await fetch(apiURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  input.value = "";
  fetchTasks(); // Refresh list
}

// Toggle task completion (check/uncheck)
async function toggleTask(id, completed) {
  await fetch(`${apiURL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });

  fetchTasks(); // Refresh list
}

// Delete a task
async function deleteTask(id) {
  await fetch(`${apiURL}/${id}`, { method: "DELETE" });
  fetchTasks(); // Refresh list
}

// Initial fetch when page loads
fetchTasks();
