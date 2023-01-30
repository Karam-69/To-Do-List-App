let submit = document.querySelector('.tast-add');
let box = document.querySelector('.task-box');
let input = document.querySelector('input[name="tast-input"]');
let all = document.querySelector('.all');
let pending = document.querySelector('.pending');
let completed = document.querySelector('.completed');
let clearBtn = document.querySelector('.clear-btn');


// Empty Arry To Store Tasks..
let arryOfTasks = [];

//  Add Tasks To Empty Arry
if (localStorage.getItem('tasks')) {
    arryOfTasks = JSON.parse(localStorage.getItem('tasks'));
    addTasksToPage(arryOfTasks);
} else {
    noTasks(arryOfTasks)
}

submit.addEventListener("click", function () {

    if (submit.id == "edit") {

    } else {
        if (input.value == "") {
            input.placeholder = "pls put task"
        } else {
            addTaskToArray(input.value);
            input.value = " ";
            location.reload();

        }
    }

});

//  Settings Tasks  
function addTaskToArray(input) {

    // Create Task 

    const task = {
        id: Date.now(),
        title: input,
        completed: false
    }

    arryOfTasks.push(task);

    // Add Task To Page
    addTasksToPage(arryOfTasks);

    // Add Task To localStorage
    addTaskTolocalStorage(arryOfTasks);
};

// Add The Task To LocalStorage
function addTaskTolocalStorage(arryOfTasks) {
    localStorage.setItem('tasks', JSON.stringify(arryOfTasks));
};

// Show Tasks On Page
function addTasksToPage(arryOfTasks) {
    // Empty Tasks Box
    box.innerHTML = " ";
    // Uploading Tasks Arry
    arryOfTasks.forEach(task => {

        let li = document.createElement("li");
        li.classList.add("task");
        li.id = task.id;
        let div = document.createElement("div");

        var taskInput = document.createElement("input");
        taskInput.setAttribute("type", "checkbox");
        taskInput.setAttribute("name", "settings");
        taskInput.id = task.id;

        let taskP = document.createElement("p");
        taskP.innerText = task.title;
        taskP.classList.add("task-title");

        if (task.completed == true) {
            taskP.classList.add("task-completed");
            taskInput.checked = true;
        }
        div.appendChild(taskInput);
        div.appendChild(taskP);

        let taskImg = document.createElement("img");
        taskImg.setAttribute('src', 'imgs/menu.svg');
        taskImg.classList.add("settings");

        let ul = document.createElement("ul");
        ul.classList.add("edit-menu");
        ul.id = task.id;

        let liEdit = document.createElement("li");
        liEdit.classList.add("edit");
        liEdit.innerHTML = '<i class="uil uil-pen"></i> Edit';

        let lidelete = document.createElement("li");
        lidelete.innerHTML = ' <i class="uil uil-trash"></i> Delete ';
        lidelete.classList.add("delete");

        ul.appendChild(liEdit);
        ul.appendChild(lidelete);

        li.appendChild(div);
        li.appendChild(taskImg);
        li.appendChild(ul);

        box.appendChild(li);

    });

};

function noTasks(arryOfTasks) {
    if (arryOfTasks.length == 0) {
        let pragrph = document.createElement('p');
        pragrph.innerText = "No Tasks Yep";
        pragrph.classList.add('no-task');
        box.appendChild(pragrph);
    }
}

// Control Tasks List
let checkboxes = document.querySelectorAll('[type=checkbox][name=settings]');

clearBtn.addEventListener("click", function () {
    // Clear LocalStorage
    localStorage.clear();
    // Update Page
    box.innerHTML = " ";
    arryOfTasks = [];
    noTasks(arryOfTasks);
});

checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
        let parent = checkbox.parentElement;
        arryOfTasks.forEach(task => {
            if (this.checked) {
                // Change Task Stats 
                if (task.id == checkbox.id) {
                    task.completed = true;
                    parent.lastElementChild.classList.add("task-completed");

                }
                localStorage.setItem("tasks", JSON.stringify(arryOfTasks));
            } else {
                if (task.id == checkbox.id) {
                    task.completed = false;
                    parent.lastElementChild.classList.remove("task-completed");
                }
            }
            localStorage.setItem("tasks", JSON.stringify(arryOfTasks));
        });
    });
});

pending.addEventListener("click", function () {
    arryOfTasks.forEach(function (task) {
        if (task.completed == true) {
            let taskElement = document.getElementById(`${task.id}`);
            taskElement.style.display = "none";
            all.removeAttribute("id");
            completed.removeAttribute("id");
        } else {
            let taskElementTwo = document.getElementById(`${task.id}`);
            taskElementTwo.style.display = "flex";
            pending.setAttribute("id", "active");
            all.removeAttribute("id");
        }
    })
});

completed.addEventListener("click", function () {
    arryOfTasks.forEach(function (task) {
        if (task.completed == true) {
            let taskElement = document.getElementById(`${task.id}`);
            taskElement.style.display = "flex";
            completed.setAttribute("id", "active");
        } else {
            let taskElementTwo = document.getElementById(`${task.id}`);
            taskElementTwo.style.display = "none";
            all.removeAttribute("id");
            pending.removeAttribute("id");
        }
    })
});

all.addEventListener("click", function () {
    arryOfTasks.forEach(function (task) {
        let taskElement = document.getElementById(`${task.id}`);
        taskElement.style.display = "flex";
        pending.removeAttribute("id");
        completed.removeAttribute("id");
        all.setAttribute("id", "active");
    })
});

// Menu Task
let editBtb = document.querySelectorAll('.edit');
let deleteBtn = document.querySelectorAll('.delete');

editBtb.forEach(function (edit) {
    edit.addEventListener("click", function () {
        let parent = edit.parentElement;
        arryOfTasks.forEach(task => {
            if (task.id == parent.id) {
                input.focus()
                input.value = task.title;
                submit.setAttribute("id", "edit");
                submit.addEventListener("click", function () {
                    task.title = input.value;
                    localStorage.setItem("tasks", JSON.stringify(arryOfTasks));
                    submit.removeAttribute("id");
                    location.reload();
                });
            };
        });
    });
});

deleteBtn.forEach(function (deleted) {
    deleted.addEventListener("click", function () {
        let parent = deleted.parentElement;
        let divelement = document.getElementById(parent.id);
        arryOfTasks.forEach(task => {
            if (task.id == parent.id) {
                arryOfTasks.splice(arryOfTasks.findIndex(ele => task.id == parent.id), 1)
                localStorage.setItem("tasks", JSON.stringify(arryOfTasks));
                    location.reload();
            }

        });
    });
});

// Delte Elemnt by js
// delte element in arry