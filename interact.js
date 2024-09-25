
const taskarray = [];
let completedCount = 0;
const alerting = document.querySelector("#alerting");
const tasks = document.querySelector("#tasks");
const taskInput = document.querySelector('#input');
const deleteAll = document.querySelector("#deleteAll");

document.querySelector('#submit').addEventListener('click', function() {
    

    //testing adding icons i js instead of html
    const checkIcon = document.createElement("img");
    checkIcon.src = "./pics/check.svg";
    checkIcon.alt = "Check";
    checkIcon.className = "check-icon";

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "./pics/delete.svg"; 
    deleteIcon.alt = "Delete";
    deleteIcon.className = "delete-icon";

   //getting text from input
    const taskText = taskInput.value;
            
    //checking if string is empty and if so adding an alert
    if (taskText.length == "") {
        alerting.innerHTML = "Ooops you forgot to write someting!";
        return;
    } else {
        alerting.innerHTML = "";
    }
        //creating a list
        const li = document.createElement('li');
        li.textContent = taskText;
            
        // adding listner to delete-icon
        deleteIcon.addEventListener('click', function() {
            li.remove();
        });

    
        // adding icons to li
        li.appendChild(checkIcon);
        li.appendChild(deleteIcon);

        // adding input to list
        tasks.appendChild(li);

        // clearing input 
        taskInput.value = '';
        
        
        // delete all tasks by adding listner
        deleteAll.addEventListener("click", function() {
            tasks.innerHTML = '';
        });
        
        //Working to make task complete or not complete and counting tasks
        checkIcon.addEventListener("click", function() {  
            li.classList.toggle("completed");
            if (li.classList.contains("completed")) {
                completedCount++;
            } else {
                
                completedCount--;
            }

        
        
        document.querySelector("#completedCount").innerHTML = "Completed tasks: " + completedCount;       
         
         });
         

       


    // add object to array
    taskarray.push({ text: taskText, completed: false });
});





