const taskArray = [];
let completedCount = 0;

const alerting = document.querySelector("#alerting");
const tasks = document.querySelector("#tasks");
const taskInput = document.querySelector("#input");
const deleteAll = document.querySelector("#deleteAll");


function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function updateCompletedCount() {
  completedCount = taskArray.filter(task => task.completed).length;
  document.querySelector("#completedCount").innerHTML = `${completedCount} completed`;
}

function getStoredTasks() {
  try {
    const tasksFromStorage = localStorage.getItem("tasks");
    return tasksFromStorage ? JSON.parse(tasksFromStorage) : [];
  } catch (e) {
    console.error("Failed to load tasks:", e);
    return [];
  }
}

function createDeleteIcon(li, taskArray) {
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./pics/delete.svg";
  deleteIcon.alt = "Delete";
  deleteIcon.className = "delete-icon";

  deleteIcon.addEventListener("click", (event) => {
    const taskId = li.dataset.id;
    taskArray = taskArray.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    li.remove();
    updateCompletedCount();
    event.stopPropagation();
  });

  return deleteIcon;
}

function createTaskElement(task, taskArray) {
  const li = document.createElement("li");
  li.dataset.id = task.id;
  li.textContent = task.text;
  if (task.completed) li.classList.add("completed");

  li.appendChild(createDeleteIcon(li, taskArray));

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    const foundTask = taskArray.find(t => t.id === task.id);
    if (foundTask) {
      foundTask.completed = !foundTask.completed;
      localStorage.setItem("tasks", JSON.stringify(taskArray));
      updateCompletedCount();
    }
  });

  return li;
}

document.querySelector("#submit").addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (!taskText) {
    alerting.innerText = "Input must not be empty";
    return;
  }

  const newTask = {
    id: generateId(),
    text: taskText,
    completed: false
  };

  const li = createTaskElement(newTask, taskArray);
  tasks.appendChild(li);
  taskArray.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(taskArray));
  taskInput.value = "";
  alerting.innerText = "";
  updateCompletedCount();
});

deleteAll.addEventListener("click", () => {
  tasks.innerHTML = "";
  taskArray.length = 0;
  localStorage.removeItem("tasks");
  updateCompletedCount();
});

// Initiate app
document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = getStoredTasks();
  taskArray.push(...storedTasks);
  
  storedTasks.forEach(task => {
    tasks.appendChild(createTaskElement(task, taskArray));
  });

  updateCompletedCount();
});