    // Define a UI vars 
var form = document.querySelector("#task-form");
var taskInput = document.querySelector("#task");
var taskLists =document.querySelector(".collection");       // console.log(form, taskInput, taskLists, clearBtn, taskLabel);  //to check which is makes error
var clearBtn = document.querySelector("#btn-clear");
var taskLabel = document.querySelector(".active");
var filter = document.querySelector("#search");


// console.log(form, taskLists, taskInput, clearBtn);

// Load all EventListener 

loadAllEventListeners();

function loadAllEventListeners(){
    console.log("loadAllEventListeners function triggered!");
        // Add task event 
    form.addEventListener("submit", addTask);  // submit is form is events
        // Remove task event 
    taskLists.addEventListener("click", removeTask);
        // Clear task event 
    clearBtn.addEventListener("click", clearTask);
       //Search Filter Event            // taskInput.addEventListener("blur", inputLabelDefault); //afterrclick add task input to default
    filter.addEventListener("input", filterTask);
        // Edit task event
    taskLists.addEventListener("click", editTask);
         // Update task event (Prevent default form submission)
    document.querySelector(".updateTask").addEventListener("click", function(e){
        e.preventDefault(); // ✅ Prevent form submission
        updateTask();
    });
}

function addTask(e){  
    e.preventDefault(); //this stop the formes flicker behaviour ( Stops page reload)
    console.log(taskInput.value);
    if(taskInput.value === ""){
        alert("Please enter the task");
    }
    else{
        const listValueToStore = taskInput.value;
        console.log(listValueToStore);
            // function that store it 
        saveTaskToLocalStorage(listValueToStore);

        // // create Element 
        // const li = document.createElement('li');

        // // add class 
        // li.className = "collection-item";

        // add innerText 
        // li.innerText = taskInput.value;          //value to be display          
        
        // // ceate Element 
        // const link = document.createElement("a");

        // // add class 
        // link.className = "delete-item secondary-content test";
        // //link 2 creating
        // const linkEdit = document.createElement("a");
        // linkEdit.className = "delete-item secondary-content test";
        // // add innerHtml 
        // link.innerHTML = `<i class="fa fa-remove"></i>`;
        // linkEdit.innerHTML = `<i class="fa fa-pencil edit"></i>`;
        // // append child 
        // li.appendChild(link);
        // li.appendChild(linkEdit);

        // // append child 
        // taskLists.appendChild(li);
        // // console.log(taskLists);

        // // clear the input value 
        taskInput.value = "";

        // Remove active class if input is empty when clicking outside
        taskLabel.classList.remove("active");
    }
}


// // Save Task to Local Storage
function saveTaskToLocalStorage(listValueToStore){
        let tasks ;//= JSON.parse(localStorage.getItem("TasksKey")) || [];          //localStorage.getItem("Tasks"): This checks if there is an item in localStorage with the key "Tasks".
                                                                                   // JSON.parse(): The data stored in localStorage is always stored as a string, so we need to convert it back into a JavaScript object or array using JSON.parse().
                                                                                    // || []: If there is no "Tasks" in localStorage (i.e., it's the first time you are adding tasks), localStorage.getItem("Tasks") will return null, and the || [] will make sure that tasks is initialized as an empty array ([]), so you can safely add new tasks to it. 
    if (localStorage.getItem("TasksKey") === null) {
        tasks = []; 
    } else {
        try {
            // Parse the tasks from localStorage
            tasks = JSON.parse(localStorage.getItem("TasksKey"));
            
            // Check if the retrieved value is an array, else reset to an empty array
            if (!Array.isArray(tasks)) {
                tasks = [];
            }
        } catch (error) {
            // If JSON.parse fails, reset to an empty array
            tasks = [];
        }
    }
        
        tasks.push(listValueToStore);
        const taskValue = JSON.stringify(tasks);
        console.log(taskValue);

        localStorage.setItem("TasksKey", taskValue); 
        displayTasks();
}

// Display the task when page load or retrieve the value from localStorage
function displayTasks() {
    isClear();
    taskLists.innerHTML = "";  // Clear current tasks in list
    let retriveTasks;

    // Check if TasksKey exists in localStorage
    if (localStorage.getItem("TasksKey") === null) {
        retriveTasks = []; // No tasks, set to an empty array
    } else {
        try {
            // Parse the tasks from localStorage
            retriveTasks = JSON.parse(localStorage.getItem("TasksKey"));
            
            // Check if the retrieved value is an array, else reset to an empty array
            if (!Array.isArray(retriveTasks)) {
                retriveTasks = [];
            }
        } catch (error) {
            // If JSON.parse fails, reset to an empty array
            retriveTasks = [];
        }
    }

    // Loop through the tasks and display them
    retriveTasks.forEach(function(eachTasks) {
        // Create Element 
        const li = document.createElement('li');

        // Add class 
        li.className = "collection-item";
        li.innerHTML = `${eachTasks}
        <a href="#" class="delete-item secondary-content">
            <i class="fa fa-remove"></i>
        </a>
        <a href="#" class="edit-item secondary-content">
            <i class="fa fa-pencil edit"></i>
        </a>`;

        // Append child 
        taskLists.appendChild(li);
    });
}


// remove list 
function removeTask(e){     // e have what click 
    //   console.log(e.target.parentElement.parentElement.innerText);      //e.target  it show element to be clicked
    if(e.target.parentElement.className.includes("delete-item secondary-content")){
        if(confirm(`Are you sure to delete " ${e.target.parentElement.parentElement.innerText} "`))
             {      //    e.target.parentElement.parentElement.remove();
    //                 //   e.target.parentElement.parentElement
    //                   let itemValues = JSON.parse(localStorage.getItem("TasksKey"));
    //                   console.log(itemValues);
    //                   let testToMatch = e.target.parentElement.parentElement.innerText;
    //                   console.log(testToMatch);
    //                   itemValues = itemValues.filter(taskItem => taskItem.Text !== testToMatch)
    //                   localStorage.setItem("TasksKey", JSON.stringify(itemValues));
                         removeTaskFromList(e.target.parentElement.parentElement);
           }
     }
    }

function removeTaskFromList(selectedToRemove){
    console.log(selectedToRemove);
    let tasksArr;
    if (localStorage.getItem("TasksKey") === null) {
        tasksArr = []; // No tasks, set to an empty array
    } else {
        try {
            // Parse the tasks from localStorage
            tasksArr = JSON.parse(localStorage.getItem("TasksKey"));
            
            // Check if the retrieved value is an array, else reset to an empty array
            if (!Array.isArray(tasksArr)) {
                tasksArr = [];
            }
        } catch (error) {
            // If JSON.parse fails, reset to an empty array
            tasksArr = [];
        }
    }

    tasksArr.forEach(function(task, index){
        // console.log(`${eachElementOfTask} - ${index}`);
        if(selectedToRemove.innerText === task){
            tasksArr.splice(index, 1);
        }
    })
    localStorage.setItem("TasksKey",JSON.stringify(tasksArr));
    isClear();
    displayTasks();    
}

// Edit Tasks
let oldTaskBeforeEdit = ""; // Store the task before editing

function editTask(e){
    if(e.target.parentElement.classList.contains("edit-item")){
        let li = e.target.closest("li"); // Get the <li> element
        oldTaskBeforeEdit = li.firstChild.textContent.trim(); // Store the old task
        taskInput.value = oldTaskBeforeEdit; // Set input for editing

        if(taskInput.value){
            taskLabel.classList.add("active");
            document.querySelector(".addTask").style.display = "none"; // Hide "Add Task"
            document.querySelector(".updateTask").style.display = "block"; // Show "Update Task"
        }
    }
}


       //Update Tasks
function updateTask(){    
        // console.log(oldTaskList +" -0 ");
                    // Check if TasksKey exists in localStorage
        if (localStorage.getItem("TasksKey") === null) {
            retriveTasks = []; // No tasks, set to an empty array
        }
        else {
            try {
                // Parse the tasks from localStorage
                retriveTasks = JSON.parse(localStorage.getItem("TasksKey"));
                
                // Check if the retrieved value is an array, else reset to an empty array
                if (!Array.isArray(retriveTasks)) {
                    retriveTasks = [];
                }
            } catch (error) {
                // If JSON.parse fails, reset to an empty array
                retriveTasks = [];
            }
        }

       let taskIndex = retriveTasks.indexOf(oldTaskBeforeEdit);
       retriveTasks[taskIndex] = taskInput.value;
       console.log(retriveTasks);
       localStorage.setItem("TasksKey",JSON.stringify(retriveTasks));

      displayTasks(); // Refresh the UI with updated tasks

    // Reset UI after update
    taskInput.value = "";
    document.querySelector(".addTask").style.display = "block"; // Show "Add Task"
    document.querySelector(".updateTask").style.display = "none"; // Hide "Update Task"
    oldTaskBeforeEdit = ""; // Reset stored task
}




// Clear Task 
function clearTask(){
//     const listIteam = Array.from(taskLists.children);
//     listIteam.forEach(function(el){
//     el.remove();
// })


//try this also

    // cdonst allLi = document.querySelectorAll("li");
    // allLi.forEach(function(el){
    //         el.remove();
    // })
    let allLi;
    if (localStorage.getItem("TasksKey") === null) {
        allLi = []; // No tasks, set to an empty array
    } else {
        try {
            // Parse the tasks from localStorage
            allLi = JSON.parse(localStorage.getItem("TasksKey"));
            
            // Check if the retrieved value is an array, else reset to an empty array
            if (!Array.isArray(allLi)) {
                allLi = [];
            }
        } catch (error) {
            // If JSON.parse fails, reset to an empty array
            allLi = [];
        }
    }
    confirm(`Are sure , to clear all list`);
    allLi.forEach(function(){
        // console.log(`${eachElementOfTask} - ${index}`);
        if(allLi.length > 0){
            allLi.splice(0, allLi.length);
            localStorage.setItem("TasksKey",JSON.stringify(allLi));
        }
    })
    isClear();
    // localStorage.setItem("TasksKey",JSON.stringify(tasksArr));


}
    // it check is if the list item is zero, or not 
function isClear(){
    let checkList = localStorage.getItem("TasksKey");
    if(localStorage.getItem("TasksKey") === null){
        checkList = [];
    }
    else{
        checkList = JSON.parse(localStorage.getItem("TasksKey"));
        if(checkList.length == 0){
            document.querySelector(".card-action").style.display="none";
        }
        else{
            document.querySelector(".card-action").style.display="block";

        }
    }
}

//filter Task
function filterTask(e){
    const searchText = e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(function(li){
        const Item = li.innerText;
        console.log(Item.toLowerCase().indexOf(searchText));
        if(Item.toLowerCase().indexOf(searchText) !== -1){
            // console.log(Item.toLowerCase().indexOf(searchText)); if word matched return 0 
            li.style.display = "block";
        }
        else{
            li.style.display = "none";
        }
});
}


// Display tasks when the page loads
window.onload = function() {
    displayTasks();
    document.querySelector(".addTask").style.display = "block";
    document.querySelector(".updateTask").style.display = "none";
};






















