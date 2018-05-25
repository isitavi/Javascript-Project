// Define UI Vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const button = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');






// Load all event listeners
loadEventListeners();
addvaluetoLocalStorage();

// Load all event listeners
function loadEventListeners(){
  // Add task to Tasks
  form.addEventListener('submit',addTask);

  //Add task from localstorage
  document.addEventListener('DOMContentLoaded',addtasktoTask);

  // Remove task form task list EventListener
  taskList.addEventListener('click',removeTask);

  // Clear all task by clicking on clear task

  button.addEventListener('click',clearTask);

  filter.addEventListener('keyup',filterTask);

}





  // Add task event
  function addTask(evntObj){
    if(taskInput.value === ''){
     return alert('Insert a task');
    }else{
      // Create li element
  const li = document.createElement('li');
  
  // Add class
  li.className = 'collection-item' ;
  
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  
  // Create new link element
  const link = document.createElement('a');
  
  // Add class
  link.className = 'delete-item secondary-content';
  
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>'
  
  // Append the link to li
  li.appendChild(link);
  
  
  // Append li to ul
  taskList.appendChild(li);
 
  
  //Add value to local storage
  addvaluetoLocalStorage(taskInput.value);
  
  // Clear input
  taskInput.value = '';
    }
    
// Add Task


  
 
  
  
    evntObj.preventDefault();
  }





  //Persist value to local storage
function addvaluetoLocalStorage(newTask) {
    let values;
    
    if(localStorage.getItem('values') ===  null){
      values = [];
    }else{
      values = JSON.parse(localStorage.getItem('values'));
    }

    values.push(newTask);
    // console.log(taskInput.value);
    localStorage.setItem('values',JSON.stringify(values));
}







//Add tasks form localstorage to Tasks Field

function addtasktoTask(){
  let values;
    // If there is any values in localstorage then add those values to tasks
    if(localStorage.getItem('values') ===  ''){
      values = [];
    }else{
      values = JSON.parse(localStorage.getItem('values'));
    }
    values.forEach((value) =>{
       // Create li element
          const li = document.createElement('li');
          
          // Add class
          li.className = 'collection-item' ;
          
          // Create text node and append to li
          li.appendChild(document.createTextNode(value));
          
          // Create new link element
          const link = document.createElement('a');
          
          // Add class
          link.className = 'delete-item secondary-content';
          
          // Add icon html
          link.innerHTML = '<i class="fa fa-remove"></i>'
          
          // Append the link to li
          li.appendChild(link);
          
          
          // Append li to ul
          taskList.appendChild(li);


    })

  }
  













//Remove Task
  //Example of Delegation parentElement(li) -> parentElement(a) -> Delete item(<i>)
function removeTask(evntObj){
  // Trace <a> which is define as link and its class is delete-item
  if(evntObj.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      evntObj.target.parentElement.parentElement.remove();

      // Remove task from localstorage which are already loaded in Task
      removetaskFromLocalStorage(evntObj.target.parentElement.parentElement);


    }
    
    // console.log(evntObj.target);
  }
}

//Remove from localStorage

function removetaskFromLocalStorage(taskItem){
  // console.log(taskItem); 

    let values;
    // If there is any values in localstorage then add those values to tasks
    if(localStorage.getItem('values') ===  ''){
      values = [];
    }else{
      values = JSON.parse(localStorage.getItem('values'));
    }

    values.forEach((isanyTask,index) => {
      if(taskItem.textContent == isanyTask){
        return values.splice(index,1);
      }
    });

    localStorage.setItem('values',JSON.stringify(values));

}






//Remove child

function clearTask(){
  // Don't use this method cause this is slow
  // taskList.innerHTML = '';

  //Use while to empty DOM elements cause this is 400 times faster
  if(confirm('This action delete all your activity tasks. Are you sure?')){
    while(taskList.firstChild) taskList.removeChild(taskList.firstChild);
  }
  
  clearTaskFromLocalStorage();
}


//Clear task from localstorage
function clearTaskFromLocalStorage() {
  localStorage.clear();
}

function filterTask(evntObj){
  // Track what's i'm typing
  const monitorInput = evntObj.target.value.toLowerCase();
  
  document.querySelectorAll('li').forEach((task) =>{
    // task contanins all the tasks
    //textcontent display what i'm typing and each time i'm typing foreach just try to match with each character
    const item = task.innerText; 
    console.log(item);
    if(item.toLowerCase().indexOf(monitorInput) !=-1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  });

}


console.log(10+5*2);


