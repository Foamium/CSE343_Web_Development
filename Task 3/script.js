const todos = [];
let filtermode = "all";
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.replaceChildren();
    todos.forEach((task, index) => {
        if (filtermode === "active" && task.completed) {
            return;
        }
        else if (filtermode === "completed" && !task.completed) {
            return;
        }
        const listItem = document.createElement("li");
        const checkTask = document.createElement("input");
        checkTask.type = "checkbox";
        checkTask.checked = task.completed;
        checkTask.addEventListener("change", () => {
            task.completed = checkTask.checked;
            renderTasks();
        });
        const itemname = document.createElement("span");
        itemname.textContent = task.name;
        const checkTaskdiv = document.createElement("div");
        checkTaskdiv.className = "checkTaskDiv";
        checkTaskdiv.appendChild(checkTask);
        checkTaskdiv.appendChild(itemname);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style = "user-select: none;";
        deleteButton.addEventListener("click", () => {
            todos.splice(index, 1);
            renderTasks();
        });
        listItem.addEventListener("dblclick", (event) => {
            const target = event.target;
            if (target instanceof Element && target.closest("button, input")) {
                return;
            }
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
                editInput.addEventListener("mousedown", (event) => {
                    if (event.detail > 1) {
                        event.preventDefault();
                    }
                });
                editInput.addEventListener("keydown", (event) => {
                    if (event.key === "Enter") {
                        let taskname = editInput.value;
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
function updateActiveTaskCount() {
    const activeCount = document.getElementById("activeCount");
    activeCount.textContent = todos.filter((task, index) => !task.completed).length.toString();
}
function addTask() {
    const taskInput = document.getElementById("taskInput");
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
function filterTasks(event) {
    if (event.target.nodeName == "INPUT") {
        filtermode = event.target.value;
        renderTasks();
    }
}
function clearCompleted() {
    for (let i = todos.length - 1; i >= 0; i--) {
        if (todos[i]?.completed)
            todos.splice(i, 1);
    }
    renderTasks();
}
function clearAll() {
    todos.length = 0;
    renderTasks();
}
document.getElementsByName("filter")?.forEach((filterbutton, index, label) => filterbutton.addEventListener("click", filterTasks));
document.getElementById("addTaskButton")?.addEventListener("click", addTask);
document.getElementById("taskInput")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});
document.getElementById("clearCompletedButton")?.addEventListener("click", clearCompleted);
document.getElementById("clearAllButton")?.addEventListener("click", clearAll);
export {};
//# sourceMappingURL=script.js.map