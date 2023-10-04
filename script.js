const inbox = document.getElementById('inbox')
const list = document.getElementById('list')
let previousTaskElement = ''

inbox.focus()

function addTask () {
  const task = document.createElement('li')
  const img = document.createElement('img')
  const span = document.createElement('span')

  if (inbox.value === '') {
    alert('Invalid entry. Try again.')
  } else {
    task.innerHTML = inbox.value
    list.appendChild(task)

    img.src = 'images/icons8-edit-50.png'
    task.appendChild(img)

    span.innerHTML = '\u00d7'
    task.appendChild(span)
  }
  inbox.value = null
  saveData()
}

inbox.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    addTask()
  }
})

addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked')
    saveData()
    inbox.focus()
  } else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove()
    saveData()
    inbox.focus()
  } else if (e.target.tagName === 'IMG') {
    editTask(e.target.parentElement)
    saveData()
  }
}, false)

function editTask (taskElement) {
  const img = document.createElement('img')
  const span = document.createElement('span')
  const xSpan = taskElement.querySelector('span')
  const xImg = taskElement.querySelector('img')
  const input = document.createElement('input')

  if (previousTaskElement === '') {
    previousTaskElement = taskElement
  } else {
    const xInput = previousTaskElement.querySelector('input')
    const text = xInput.value
    const img = document.createElement('img')
    const span = document.createElement('span')

    if (xInput) {
      xInput.remove()
    }
    previousTaskElement.textContent = text

    img.src = 'images/icons8-edit-50.png'
    previousTaskElement.appendChild(img)

    span.innerHTML = '\u00d7'
    previousTaskElement.appendChild(span)

    previousTaskElement = taskElement
  }

  if (xSpan) {
    xSpan.remove()
  }

  if (xImg) {
    xImg.remove()
  }

  const newTask = taskElement.textContent

  input.type = 'text'
  input.id = 'task'
  input.value = newTask
  taskElement.innerHTML = ''
  taskElement.appendChild(input)
  span.innerHTML = '\u00d7'
  taskElement.appendChild(span)
  saveData()

  const task = document.getElementById('task')
  task.focus()

  input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const xInput = taskElement.querySelector('input')
      const text = xInput.value

      if (xInput.value === '') {
        alert('Invalid entry. Try again.')
      } else {
        if (xInput) {
          xInput.remove()
        }

        taskElement.textContent = text

        if (taskElement === previousTaskElement) {
          previousTaskElement = ''
          inbox.focus()
        }

        img.src = 'images/icons8-edit-50.png'
        taskElement.appendChild(img)

        span.innerHTML = '\u00d7'
        taskElement.appendChild(span)

        saveData()
      }
    }
  })
}
function saveData () {
  localStorage.setItem('data', list.innerHTML)
}

function showTask () {
  list.innerHTML = localStorage.getItem('data')
}
showTask()
localStorage.clear()
