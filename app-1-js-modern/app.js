const tasks = [] // Lista de tareas

const form = document.getElementById('taskForm')
const input = document.getElementById('taskInput')
const list = document.getElementById('taskList')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const title = input.value.trim()
  if (title !== '') {
    addTask(title)
    input.value = ''
  }
})

function addTask(title) {
  const task = {
    id: Date.now(),
    title,
    completed: false
  }
  tasks.push(task)
  renderTasks()
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id)
  if (task) task.completed = !task.completed
  renderTasks()
}

function renderTasks() {
  list.innerHTML = ''
  tasks.forEach(({ id, title, completed }) => {
    const li = document.createElement('li')
    li.innerHTML = `
      <input type="checkbox" ${completed ? 'checked' : ''} onchange="toggleTask(${id})" />
      <span style="text-decoration: ${completed ? 'line-through' : 'none'}">${title}</span>
    `
    list.appendChild(li)
  })
}