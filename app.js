// SELECTORS
form = document.querySelector('.input-form');
inputField = document.querySelector('#task-field');
ul = document.querySelector('.collection');
clearTask = document.querySelector('.clear-tasks');
filter = document.querySelector('#filter');

// Load all Event Listeners
loadEventListeners();

// Event Listeners
function loadEventListeners(){

form.addEventListener('submit', addTask);
ul.addEventListener('click', removeTask);
clearTask.addEventListener('click', clearTasks);
filter.addEventListener('keyup', filterTasks);
getFromLocalStorage();

}



// Functions and Methods

function addTask(e){
  if(inputField.value === ''){

    alert('Please Write a Task');

  } else {
    

    // Create Element li
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(inputField.value));
    // Create element link(a)
    const a = document.createElement('a');
    a.className = 'delete-item secondary-content';
    li.appendChild(a);
    // Create Element i
    const i = document.createElement('i');
    i.className = 'fa fa-remove';
    a.appendChild(i);

    //append all to UL
    ul.appendChild(li);

    //Store in LS call
    storeInLocalStorage(inputField.value);

    //Clear Text Upon submit
    inputField.value = '';

    
  }

  e.preventDefault();
}


// Store in Local Storage
function storeInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  
  localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Retrive and Display Data from LS
function getFromLocalStorage(){

  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    // Create element link(a)
    const a = document.createElement('a');
    a.className = 'delete-item secondary-content';
    li.appendChild(a);
    // Create Element i
    const i = document.createElement('i');
    i.className = 'fa fa-remove';
    a.appendChild(i);

    //append all to UL
    ul.appendChild(li);

  });
}

// Remove a task
function removeTask(e){

  if(e.target.classList.contains('fa-remove')){

    if(confirm('Delete This Task?')){

      e.target.parentElement.parentElement.remove();
    }
  }

  // Remove Task from LS call
  removeTaskFromLocalStorage(e.target.parentElement.parentElement);

  e.preventDefault();
}

// Clear all tasks
function clearTasks(e){

  if(confirm('Clear All Tasks?')){

    while(ul.firstChild){

      ul.removeChild(ul.firstChild);
    }

    clearTasksfromLocalStorage();
  }
}

// Remove Task from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Clear all tasks from LS
function clearTasksfromLocalStorage(){
  localStorage.clear();

}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;

    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';

    }
  });
}






// TESTERS
// document.body.addEventListener('click', runEvent);
// function runEvent(e){
  // if(e.target.classList.contains('clear-tasks')){
  //   console.log('correct');
  // }else {
  //   console.log('wrong');
  // }
  // console.log(e.target);
// }