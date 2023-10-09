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
  const deleteButton = document.createElement('span')

  if (inbox.value === '') {
    alert('Invalid entry. Try again.')
  } else {
    task.innerHTML = inbox.value
    list.appendChild(task)

    editIcon.src = EDIT_IMG_PATH
    task.appendChild(editIcon)

    deleteButton.innerHTML = CLOSE_BUTTON_CODE
    task.appendChild(deleteButton)
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
  const editIcon = document.createElement('img')
  const deleteButton = document.createElement('span')
  const xDeleteButton = taskElement.querySelector('span')
  const xEditIcon = taskElement.querySelector('img')
  const inputFieldForEdit = document.createElement('input')
  let xInputFieldForEdit = null

  if (previousTaskElement === '') {
    previousTaskElement = taskElement
  } else {
    xInputFieldForEdit = previousTaskElement.querySelector('input')
    const text = xInputFieldForEdit.value
    const editIcon = document.createElement('img')
    const deleteButton = document.createElement('span')

    if (xInputFieldForEdit) {
      xInputFieldForEdit.remove()
    }
    previousTaskElement.textContent = text

    editIcon.src = EDIT_IMG_PATH
    previousTaskElement.appendChild(editIcon)

    deleteButton.innerHTML = CLOSE_BUTTON_CODE
    previousTaskElement.appendChild(deleteButton)

    previousTaskElement = taskElement
  }

  if (xDeleteButton) {
    xDeleteButton.remove()
  }

  if (xEditIcon) {
    xEditIcon.remove()
  }

  const newTask = taskElement.textContent

  inputFieldForEdit.type = 'text'
  inputFieldForEdit.id = 'task'
  inputFieldForEdit.value = newTask
  taskElement.innerHTML = ''
  taskElement.appendChild(inputFieldForEdit)
  deleteButton.innerHTML = CLOSE_BUTTON_CODE
  taskElement.appendChild(deleteButton)
  saveData()

  const task = document.getElementById('task')
  task.focus()

  inputFieldForEdit.addEventListener('keyup', (event) => {
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

        editIcon.src = EDIT_IMG_PATH
        taskElement.appendChild(editIcon)

        deleteButton.innerHTML = CLOSE_BUTTON_CODE
        taskElement.appendChild(deleteButton)

        saveData()
      }
    }
  })
}
function saveData () {
  localStorage.setItem(LOCAL_STORAGE_KEY, list.innerHTML)
}

function showTask () {
  list.innerHTML = localStorage.getItem(LOCAL_STORAGE_KEY)
}
showTask()
localStorage.clear()
