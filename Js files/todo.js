const todoSearch = document.getElementById("todoSearch");
const addBtn = document.getElementById("taskAddBtn");
let taskList = document.querySelector(".todo-list");


addBtn.addEventListener("click", () => {
    let value = todoSearch.value;

    if (value == '') {
        alert("Write some task !!");
    } else {

        createTaskUI(value);
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(value);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        value = " ";
    }
});

function createTaskUI(value) {
    let task = document.createElement("div");
    task.classList.add("task");

    task.innerHTML = `
        <div class="task-box-1">
            <input type="radio">
            <p>${value}</p>
        </div>
        <button class="deleteBtn">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

    taskList.appendChild(task);


    task.querySelector(".deleteBtn").addEventListener("click", () => {
        task.remove();

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(t => t !== value);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
}

window.addEventListener("load", () => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(value => {
        createTaskUI(value);
    });
});