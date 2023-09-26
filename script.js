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


function editTask(taskElement) {
   
    const xSpan = taskElement.querySelector("span");
    if (xSpan) {
      xSpan.remove();
    }

    const input = document.createElement("input");
    const edittext = taskElement.textContent;
   
    input.type = "text";
    input.value = edittext;
    
    input.focus();
   
  
    input.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
       

     taskElement.textContent = input.value;

     let img=document.createElement("img");
        img.src="images/icons8-edit-50.png";
        taskElement.appendChild(img);
   
        let span=document.createElement("span");
        span.innerHTML= "\u00d7"; //the into sign for deletion of tasks
        taskElement.appendChild(span);
        saveData();
      }
    });
  
    taskElement.innerHTML = "";
    taskElement.appendChild(input);
  }



function saveData(){
    localStorage.setItem("data",list.innerHTML);
}

function showTask(){
    list.innerHTML=localStorage.getItem("data");
}
showTask();

localStorage.clear();
