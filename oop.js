// models
const TodoList = [TodoItem]

class TodoItem {
  constructor(){
    this.id = random();
    this.task = "",
    this.completed = false
  }

  html(){
    const todoItem = document.createElement('li');
    const checkbox = document.createElement('input');
    const deleteBtn = document.createElement('button');

    todoItem.id = this.id; //1234
    checkbox.id = `checkbox-${this.id}`; //checkbox-1234
    deleteBtn.id = `delete-${this.id}`; //delete-1234

    checkbox.type = 'checkbox';
    checkbox.checked = false;
    deleteBtn.innerText = 'delete';

    todoItem.appendChild(checkbox);
    todoItem.appendChild(deleteBtn);
  }

  modify(updatedTask){
    this.task = updatedTask;
    const el = document.getElementById(this.id);
    el.innerText(this.task);
  }

  setStatus(status){
    this.completed = status;
    const el = document.getElementById(`checkbox-${this.id}`);
    el.checked = status;
  }

  attachInputHandler(){
    const el = document.getElementById(this.id);
    const callback = (e) => {
      el.innerText = e.target.value;
    }
    el.addEventListener('keyup', callback);
  }

  attachDeleteHandler(){
    const el = document.getElementById(`delete-${this.id}`);
    const callback = (e) => {
      // delete the todo
    }
    el.addEventListener('click', callback);
  }

  attachCheckboxHandler(){
    const el = document.getElementById(`checkbox-${this.id}`);
    const callback = (e) => {
      el.innerText = e.target.value;
    }
    el.addEventListener('keyup', callback);
  }
}

// api
// TodoItem.create();
// TodoItem.modify(updatedTask);
// TodoItem.setStatus(status);

// TodoList.create();
// TodoList.remove(item);
// TodoList.add(item);

const asyncCode = () => {
  console.log(1);
  window.setTimeout(() => console.log(2), 100);
  console.log(3);
  console.log(4);
}