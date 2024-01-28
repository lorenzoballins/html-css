document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
  const tasksContainer = document.getElementById('tasks-container');
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach(task => {
    createTaskElement(task);
  });
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const task = { text: taskText, completed: false };
    createTaskElement(task);

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = '';
  }
}

function createTaskElement(task) {
  const tasksContainer = document.getElementById('tasks-container');

  const taskElement = document.createElement('div');
  taskElement.className = 'task';
  taskElement.innerHTML = `
    <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${JSON.stringify(task)})">
    <span>${task.text}</span>
    <button onclick="deleteTask('${task.text}')">Excluir</button>
  `;

  tasksContainer.appendChild(taskElement);
}

function toggleTask(task) {
  task.completed = !task.completed;

  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const index = tasks.findIndex(t => t.text === task.text);
  tasks[index] = task;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const filteredTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
  
    const taskElements = document.querySelectorAll('.task');
    taskElements.forEach(taskElement => {
      const spanElement = taskElement.querySelector('span');
      if (spanElement.textContent === taskText) {
        taskElement.remove();
      }
    });
  }