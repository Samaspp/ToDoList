const inbox = document.getElementById('inbox')
const list = document.getElementById('list')
let previousTaskElement = ''
const EDIT_IMG_NAME = 'icons8-edit-50.png'
const EDIT_IMG_PATH = `images/${EDIT_IMG_NAME}`
const CLOSE_BUTTON_CODE = '\u00d7'
const LOCAL_STORAGE_KEY = 'data'

inbox.focus()

function addTask () {
  const task = document.createElement('li')
  const editIcon = document.createElement('img')
  const deleteButton = createDeleteButton()

  if (inbox.value === '') {
    alert('Invalid entry. Try again.')
  } else {
    task.innerHTML = inbox.value
    list.appendChild(task)

    editIcon.src = EDIT_IMG_PATH
    task.appendChild(editIcon)

    task.appendChild(deleteButton)
  }
  inbox.value = null
  inbox.focus()
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
  } else if (e.target.id.startsWith('delete-')) {
    e.target.parentElement.remove()
    saveData()
    inbox.focus()
  } else if (e.target.tagName === 'IMG') {
    editTask(e.target.parentElement)
    saveData()
  }
}, false)

function editTask (taskElement) {
  const newEditIcon = document.createElement('img')
  const newdeleteBtn = createDeleteButton()
  const taskDeleteBtn = taskElement.querySelector('button')
  const taskEditIcon = taskElement.querySelector('img')
  const taskInput = document.createElement('input')
  let xtaskInput = null
  const previousEditIcon = document.createElement('img')
  const previousDeleteButton = createDeleteButton()

  if (previousTaskElement === '') {
    previousTaskElement = taskElement
  } else {
    xtaskInput = previousTaskElement.querySelector('input')
    const text = xtaskInput.value

    if (xtaskInput) {
      xtaskInput.remove()
    }
    previousTaskElement.textContent = text

    previousEditIcon.src = EDIT_IMG_PATH
    previousTaskElement.appendChild(previousEditIcon)

    previousTaskElement.appendChild(previousDeleteButton)

    previousTaskElement = taskElement
  }

  if (taskDeleteBtn) {
    taskDeleteBtn.remove()
  }

  if (taskEditIcon) {
    taskEditIcon.remove()
  }

  const newTask = taskElement.textContent

  taskInput.type = 'text'
  taskInput.id = 'task'
  taskInput.value = newTask
  taskElement.innerHTML = ''
  taskElement.appendChild(taskInput)
  taskElement.appendChild(newdeleteBtn)
  saveData()

  const task = document.getElementById('task')
  task.focus()

  taskInput.addEventListener('keyup', (event) => {
    const newInputFieldDuringEdit = taskElement.querySelector('input')
    if (event.key === 'Enter') {
      const text = newInputFieldDuringEdit.value

      if (newInputFieldDuringEdit.value === '') {
        alert('Invalid entry. Try again.')
      } else {
        if (newInputFieldDuringEdit) {
          newInputFieldDuringEdit.remove()
        }

        taskElement.textContent = text

        if (taskElement === previousTaskElement) {
          previousTaskElement = ''
          inbox.focus()
        }

        newEditIcon.src = EDIT_IMG_PATH
        taskElement.appendChild(newEditIcon)

        taskElement.appendChild(newdeleteBtn)

        saveData()
      }
    }
  })
}

function createDeleteButton () {
  const dltButton = document.createElement('button')
  dltButton.innerHTML = CLOSE_BUTTON_CODE
  dltButton.id = 'delete-' + Date.now()
  return dltButton
}
function saveData () {
  localStorage.setItem(LOCAL_STORAGE_KEY, list.innerHTML)
}

function showTask () {
  list.innerHTML = localStorage.getItem(LOCAL_STORAGE_KEY)
}
showTask()
localStorage.clear()
