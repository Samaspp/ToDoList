const inbox= document.getElementById("inbox"); 
const list= document.getElementById("list");



inbox.focus();
function addTask(){ 
    if(inbox.value===''){
        alert("write something");
    }
    else{
        let task =document.createElement("li");
        task.innerHTML=inbox.value;
        list.appendChild(task);

       let img=document.createElement("img");
        img.src="images/icons8-edit-50.png";
        task.appendChild(img);
   
        let span=document.createElement("span");
        span.innerHTML= "\u00d7"; //the into sign for deletion of tasks
        task.appendChild(span);
    }
    inbox.value=null;
 saveData();
}

inbox.addEventListener('keyup', function(event) {
    if(event.key === 'Enter'){
        addTask();
    }
});

list.addEventListener("click",function(e){
    if(e.target.tagName ==="LI"){
        e.target.classList.toggle("checked");
      saveData();
    }
      else if(e.target.tagName ==="SPAN"){
      e.target.parentElement.remove();
      saveData();
    }
    else  if(e.target.tagName==="IMG"){
        editTask(e.target.parentElement);
        saveData();
    }
}, false);

var oldTaskElement = "";

function editTask(taskElement) {
   
    if(oldTaskElement === ""){
      oldTaskElement = taskElement;
    }else{
      const xInput = oldTaskElement.querySelector("input");
        var text = xInput.value;
        if (xInput) {
          xInput.remove();
        }
        oldTaskElement.textContent = text;
  
        let img=document.createElement("img");
        img.src="images/icons8-edit-50.png";
        oldTaskElement.appendChild(img);
   
        let span=document.createElement("span");
        span.innerHTML= "\u00d7"; //the into sign for deletion of tasks
        oldTaskElement.appendChild(span);
        saveData();
        oldTaskElement = taskElement
    }
    const xSpan = taskElement.querySelector("span");
    if (xSpan) {
      xSpan.remove();
    }
    const xImg = taskElement.querySelector("img");
    if (xImg) {
      xImg.remove();
    }
    const edittext = taskElement.textContent;
    
    taskElement.innerHTML = "";

    var input = document.createElement("input");
    input.type = "text";
    input.id = "task";
    input.value = edittext;
    taskElement.appendChild(input);

    //taskElement.appendChild(input);

    const task= document.getElementById("task"); 
    //input.value = edittext;
    task.focus();
   
    input.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
       
        const xInput = taskElement.querySelector("input");
        var text = xInput.value;
        if (xInput) {
          xInput.remove();
        }
        taskElement.textContent = text;
        
        if(taskElement == oldTaskElement){
          oldTaskElement = "";
          inbox.focus();
        }

        let img=document.createElement("img");
        img.src="images/icons8-edit-50.png";
        taskElement.appendChild(img);
   
        let span=document.createElement("span");
        span.innerHTML= "\u00d7"; //the into sign for deletion of tasks
        taskElement.appendChild(span);
        saveData();
      }
    });
  }



function saveData(){
    localStorage.setItem("data",list.innerHTML);
}

function showTask(){
    list.innerHTML=localStorage.getItem("data");
}
showTask();

localStorage.clear();
