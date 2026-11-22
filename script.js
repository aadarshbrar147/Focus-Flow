/* DASHBOARD */

const dashboard = document.querySelector(".dashboard");

if (dashboard) {

    const username = document.getElementById("username");
    const todayDate = document.getElementById("todayDate");

    const completedCount = document.getElementById("completedCount");
    const pendingCount = document.getElementById("pendingCount");
    const totalCount = document.getElementById("totalCount");

    const progressText = document.querySelector("#progressText");
    const progressCircle = document.querySelector("#progressCircle");

    /* Greeting */

    const hour = new Date().getHours();

    if (hour < 12) {

        username.textContent = "Good Morning";

    } else if (hour < 18) {

        username.textContent = "Good Afternoon";

    } else {

        username.textContent = "Good Evening";

    }

    /* Date */

    todayDate.textContent = new Date().toLocaleDateString("en-IN", {

        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"

    });

    /* Read Tasks */

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const completed = tasks.filter(task => task.completed).length;

    const pending = tasks.length - completed;

    completedCount.textContent = completed;
    pendingCount.textContent = pending;
    totalCount.textContent = tasks.length;

    /* Progress */

    let percent = 0;

    if (tasks.length > 0) {

        percent = Math.round((completed / tasks.length) * 100);

    }

    progressText.textContent = percent + "%";

    const circumference = 440;

    const offset =
        circumference - (percent / 100) * circumference;

    progressCircle.style.strokeDashoffset = offset;
  
    /* Dashboard Task Preview */

    const dashboardTasks = document.getElementById("dashboardTasks");

    if (dashboardTasks) {

        // Get only pending tasks
        const pendingTasks = tasks.filter(task => !task.completed);

        // Display maximum 3 tasks
        const previewTasks = pendingTasks.slice(0, 3);

        if (previewTasks.length === 0) {

            const message = document.createElement("p");

            message.className = "dashboard-empty";

            message.textContent = tasks.length === 0
                ? "No tasks yet. Add your first task!"
                : "You're all caught up!";

            dashboardTasks.appendChild(message);

        } else {

            previewTasks.forEach(task => {

                // Create task container
                const taskItem = document.createElement("div");

                taskItem.className = "dashboard-task-item";

                // Create status indicator
                const indicator = document.createElement("span");

                indicator.className = "dashboard-task-marker";

                // Create task text
                const taskText = document.createElement("span");

                taskText.className = "dashboard-task-text";

                taskText.textContent = task.text;

                // Add elements to container
                taskItem.append(indicator, taskText);

                // Add container to dashboard
                dashboardTasks.appendChild(taskItem);

            });

            // Show remaining task count
            if (pendingTasks.length > 3) {

                const moreTasks = document.createElement("p");

                moreTasks.className = "dashboard-more";

                moreTasks.textContent =
                    `+ ${pendingTasks.length - 3} more pending tasks`;

                dashboardTasks.appendChild(moreTasks);

            }

        }

    }

}

/* TASK PAGE */

const taskPage = document.querySelector(".task-page");

if (taskPage) {

    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const searchTask = document.getElementById("searchTask");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    /* Save */

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}

    /* Render */

    function renderTasks(list = tasks) {

        taskList.innerHTML = "";

        if (list.length === 0) {

            taskList.innerHTML = `
                <div class="empty-message">
                    No Tasks Yet
                </div>
            `;

            return;

        }

        list.forEach((task, index) => {

            const div = document.createElement("div");

            div.className = "task";

            if (task.completed) {

                div.classList.add("completed");

            }

            div.innerHTML = `
                <input
                    type="checkbox"
                    class="complete-check"
                    data-index="${index}"
                    ${task.completed ? "checked" : ""}
                >

                <span class="task-text">
                    ${task.text}
                </span>

                <div class="task-buttons">

                    <button
                        class="edit-btn"
                        data-index="${index}">
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        data-index="${index}">
                        Delete
                    </button>

                </div>
            `;

            taskList.appendChild(div);

        });

    }

    renderTasks();
/* ADD TASK */

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        text: text,

        completed: false

    });

    saveTasks();

    renderTasks();

    taskInput.value = "";

    taskInput.focus();

}


/* ADD BUTTON */

addTaskBtn.addEventListener("click", addTask);


/* ENTRY KEY */

taskInput.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        addTask();

    }

});


/* TASK ACTIONS */

taskList.addEventListener("click", function(e){

    const index = e.target.dataset.index;

    if(index === undefined) return;


    /* DELETE */

    if(e.target.classList.contains("delete-btn")){

        tasks.splice(index,1);

        saveTasks();

        renderTasks();

        return;

    }


    /* EDIT */

    if(e.target.classList.contains("edit-btn")){

        const newText = prompt(

            "Edit Task",

            tasks[index].text

        );

        if(newText === null) return;

        if(newText.trim() === "") return;

        tasks[index].text = newText.trim();

        saveTasks();

        renderTasks();

        return;

    }

});


/* COMPLETE TASK */

taskList.addEventListener("change", function(e){

    if(!e.target.classList.contains("complete-check")){

        return;

    }

    const index = e.target.dataset.index;

    tasks[index].completed = e.target.checked;

    saveTasks();

    renderTasks();

});
/* SEARCH TASKS */

searchTask.addEventListener("input", function () {

    const search = this.value.toLowerCase().trim();

    const filtered = tasks.filter(task =>

        task.text.toLowerCase().includes(search)

    );

    renderTasks(filtered);

});



}
/* QUOTE PAGE */

const quotePage = document.querySelector(".quote-page");

if (quotePage) {

    const quoteText = document.getElementById("quoteText");
    const quoteAuthor = document.getElementById("quoteAuthor");
    const newQuoteBtn = document.getElementById("newQuoteBtn");

    /*  QUOTES DATABASE */

    const quotes = [

        {
            text: "Success is the sum of small efforts repeated day after day.",
            author: "Robert Collier"
        },

        {
            text: "Discipline is choosing between what you want now and what you want most.",
            author: "Abraham Lincoln"
        },

        {
            text: "The future depends on what you do today.",
            author: "Mahatma Gandhi"
        },

        {
            text: "Dream big. Start small. Act now.",
            author: "Robin Sharma"
        },

        {
            text: "Do something today that your future self will thank you for.",
            author: "Unknown"
        },

        {
            text: "Consistency beats motivation.",
            author: "Unknown"
        },

        {
            text: "Small daily improvements lead to remarkable results.",
            author: "James Clear"
        },

        {
            text: "Your habits shape your future.",
            author: "Unknown"
        }

    ];

    /*  SHOW RANDOM QUOTE */

    function showQuote() {

        const randomIndex = Math.floor(

            Math.random() * quotes.length

        );

        quoteText.textContent =
            `"${quotes[randomIndex].text}"`;

        quoteAuthor.textContent =
            "— " + quotes[randomIndex].author;

    }

    /* BUTTON */

    newQuoteBtn.addEventListener("click", showQuote);

    /* FIRST QUOTE */

    showQuote();
}
/* FEEDBACK PAGE */

const feedbackPage = document.querySelector(".feedback-page");

if(feedbackPage){

    const feedbackForm =
        document.getElementById("feedbackForm");

    feedbackForm.addEventListener("submit",function(e){

        // Stop page refresh
        e.preventDefault();

        const name =
            document.getElementById("feedbackName").value.trim();

        const email =
            document.getElementById("feedbackEmail").value.trim();

        const message =
            document.getElementById("feedbackMessage").value.trim();

        if(name==="" || email==="" || message===""){

            alert("Please fill all fields.");

            return;

        }

        /* Save feedback locally */

        const feedback = {

            name:name,

            email:email,

            message:message,

            date:new Date().toLocaleString()

        };

        const feedbacks =
            JSON.parse(localStorage.getItem("feedbacks")) || [];

        feedbacks.push(feedback);

        localStorage.setItem(
            "feedbacks",
            JSON.stringify(feedbacks)
        );

        alert("Thank you for your feedback!");

        feedbackForm.reset();

    });

}