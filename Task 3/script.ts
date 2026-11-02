interface Task {
    name: string;
    completed: boolean;
}

const todos: Task[] = [];
let filtermode: string = "all";

function renderTasks(): void {
    const taskList: HTMLUListElement = document.getElementById("taskList") as HTMLUListElement;
    taskList.replaceChildren();

    todos.forEach((task, index) => {
        if (filtermode === "active" && task.completed) {
            return;
        }
        else if (filtermode === "completed" && !task.completed) {
            return;
        }

        const listItem: HTMLLIElement = document.createElement("li");
        const checkTask: HTMLInputElement = document.createElement("input");

        checkTask.type = "checkbox";
        checkTask.checked = task.completed;
        checkTask.addEventListener("change", () => {
            task.completed = checkTask.checked;
            renderTasks();
        });

        const itemname: HTMLSpanElement = document.createElement("span");
        itemname.textContent = task.name;

        const checkTaskdiv : HTMLDivElement = document.createElement("div");
        checkTaskdiv.className = "checkTaskDiv";
        checkTaskdiv.appendChild(checkTask);
        checkTaskdiv.appendChild(itemname);

        const deleteButton: HTMLButtonElement = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style = "user-select: none;";
        deleteButton.addEventListener("click", () => {
            todos.splice(index, 1);
            renderTasks();
        });
        
        listItem.addEventListener("dblclick", (event: MouseEvent) => {
            const target = event.target;
            if (target instanceof Element && target.closest("button, input")) { return; }
            if (!document.getElementById("editdiv")) {
                const editdiv = document.createElement("div");
                const editInput = document.createElement("input");
                const editlabel = document.createElement("span");
                editdiv.style = "display: flex; gap: 10px;";
                editdiv.id = "editdiv";
                editlabel.textContent = "Edit task";
                editlabel.style = "font-size = 14px; user-select: none;";
                editInput.placeholder = task.name;
                editdiv.appendChild(editlabel);
                editdiv.appendChild(editInput);
                listItem.insertBefore(editdiv, deleteButton);
                
                editInput.addEventListener("mousedown", (event: MouseEvent) => {
                    if (event.detail > 1) {
                        event.preventDefault();
                    }
                });

                editInput.addEventListener("keydown", (event: KeyboardEvent) => {
                    if (event.key === "Enter") {
                        let taskname: string = editInput.value;
                        if (taskname.trim() !== "") {
                            task.name = taskname;
                            renderTasks();
                        }
                    }
                }); 
            }
        });

        listItem.appendChild(checkTaskdiv);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });

    updateActiveTaskCount();
}

function updateActiveTaskCount(): void {
    const activeCount: HTMLSpanElement = document.getElementById("activeCount") as HTMLSpanElement;
    activeCount.textContent = todos.filter((task, index) => !task.completed).length.toString();
}

function addTask(): void {
    const taskInput: HTMLInputElement = document.getElementById("taskInput") as HTMLInputElement;
    if (taskInput.value.trim() !== "") {
        todos.push({ name: taskInput.value, completed: false });
        taskInput.value = "";
        renderTasks();
    }
}

// function editTask(task: Task): void {
//     const editInput = document.createElement("input");
//     editInput.id = "editBox";
//     editInput.placeholder = task.name;
//     document.

//     let taskname: string = editInput.value;
//     if (taskname.trim() !== "") {
//         task.name = taskname;
//         renderTasks();
//     }
// }

function filterTasks(event: any): void {
    if (event.target.nodeName == "INPUT"){
        filtermode = event.target.value;
        renderTasks();
    }
}

function clearCompleted(): void {
    for (let i = todos.length - 1; i >= 0; i--) {
        if (todos[i]?.completed)
            todos.splice(i, 1);
    }
    renderTasks();
}

function clearAll(): void{
    todos.length = 0;
    renderTasks();
}

document.getElementsByName("filter")?.forEach((filterbutton, index, label) => filterbutton.addEventListener("click", filterTasks));
document.getElementById("addTaskButton")?.addEventListener("click", addTask);
document.getElementById("taskInput")?.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        addTask();
    }
});
document.getElementById("clearCompletedButton")?.addEventListener("click", clearCompleted);
document.getElementById("clearAllButton")?.addEventListener("click", clearAll);