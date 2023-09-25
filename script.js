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
}, false);

function saveData(){
    localStorage.setItem("data",list.innerHTML);
}

function showTask(){
    list.innerHTML=localStorage.getItem("data");
}
showTask();

localStorage.clear();
