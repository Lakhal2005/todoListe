const inputBox = document.getElementById("input-box");
const listContainer = document.querySelector(".list-container");


// Clock of the Day

function startClock() {
    const clockContainer = document.querySelector(".date");

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        clockContainer.textContent = `${hours}:${minutes}:${seconds}`;
    }

    updateClock(); // Initialize the clock immediately
    setInterval(updateClock, 1000); // Update every second
}

// Start the clock when the page loads
startClock();




// Add Task Function
function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You Must Write The Task!");
        return;
    }

    // Create task container
    let task = document.createElement("div");
    task.className = "task";

    // Create list item
    let li = document.createElement("li");
    li.textContent = inputBox.value;

    // Create Delete Button
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";

    // Append elements to task container
    task.appendChild(li);
    task.appendChild(deleteButton);

    // Add task container to the list
    listContainer.appendChild(task);

    // Clear input field
    inputBox.value = "";

    // Save tasks
    saveData();

    // Add event listener to delete button
    deleteButton.addEventListener("click", function () {
        task.remove();
        saveData();
    });

    // Add event listener to toggle 'checked' class
    li.addEventListener("click", function () {
        li.classList.toggle("checked");
        saveData();
    });
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function getTasks() {
    const savedData = localStorage.getItem("data");
    listContainer.innerHTML = savedData ? savedData : "";

    // Reattach event listeners after loading
    const tasks = listContainer.querySelectorAll(".task");
    tasks.forEach((task) => {
        const deleteButton = task.querySelector(".delete");
        const li = task.querySelector("li");

        deleteButton.addEventListener("click", function () {
            task.remove();
            saveData();
        });

        li.addEventListener("click", function () {
            li.classList.toggle("checked");
            saveData();
        });
    });
}

// Initialize tasks from localStorage
getTasks();
