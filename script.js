// Get elements
const clock = document.getElementById('clock');
const tasksContainer = document.getElementById('taskTable');
const taskNameInput = document.getElementById('taskName');
const startTimeInput = document.getElementById('startTime');
const endTimeInput = document.getElementById('endTime');
let taskId = 1;

// Clock
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}
setInterval(updateTime, 1000);

// Function to add a new task
function addTask() {
    const taskNameInput = document.getElementById('taskName');
    const startTimeInput = document.getElementById('startTime');
    const endTimeInput = document.getElementById('endTime');

    const taskName = taskNameInput.value.trim();
    const startTime = startTimeInput.value.trim();
    const endTime = endTimeInput.value.trim();

    if (taskName === '' || startTime === '' || endTime === '') {
        alert('Please enter all task details');
        return;
    }

    const taskTable = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    const newRow = taskTable.insertRow();
    const taskId = taskTable.rows.length;
    newRow.innerHTML = `
        <td>${taskId}</td>
        <td>${taskName}</td>
        <td>${formatTime(startTime)}</td>
        <td>${formatTime(endTime)}</td>
        <td class="status">
            <div class="checkbox-container">
                <input type="checkbox" id="task${taskId}" onchange="toggleTaskCompletion(this)">
            </div>
        </td>
        <td><button class="action-btn" onclick="deleteTask(this)">Delete</button></td>
    `;

    taskNameInput.value = '';
    startTimeInput.value = '';
    endTimeInput.value = '';

    schedulePopup(taskName, startTime);
    updateProgress();
}

// Function to toggle task completion
function toggleTaskCompletion(checkbox) {
    const row = checkbox.closest('tr');
    row.classList.toggle('completed');
    updateProgress();
}

// Function to delete a task
function deleteTask(button) {
    const row = button.closest('tr');
    row.remove();
    updateProgress();
}

// Function to update the progress bar and text
function updateProgress() {
    const totalTasks = document.querySelectorAll('#taskTable tbody tr').length;
    const completedTasks = document.querySelectorAll('#taskTable tbody tr.completed').length;

    const progressBarFill = document.getElementById('progressBarFill');
    const progressText = document.getElementById('progressText');

    const percentComplete = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    progressBarFill.style.width = percentComplete + '%';
    progressText.textContent = `${completedTasks}/${totalTasks} tasks done`;
}

// Other functions...


function schedulePopup(taskName, startTime) {
    const now = new Date();
    const [hours, minutes] = startTime.split(':');
    const start = new Date();
    start.setHours(hours);
    start.setMinutes(minutes);
    start.setSeconds(0); // Set seconds to 0 to ensure precise timing
    start.setMilliseconds(0); // Set milliseconds to 0 to ensure precise timing

    // Calculate the timeout in milliseconds
    let timeout = start - now;

    // If the timeout is negative, it means the start time has already passed
    if (timeout < 0) {
        // Advance the start time to the next day
        start.setDate(start.getDate() + 1);
        timeout = start - now;
    }

    // Schedule the popup
    setTimeout(() => {
        openPopup(`It's time to start ${taskName}`);
    }, timeout);
}


function openPopup(message) {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popupMessage');
    popupMessage.textContent = message;
    popup.style.display = 'block';
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
}
function deleteTask(button) {
    const row = button.parentNode.parentNode;
    row.remove();
}

// Inside the addTask() function, after the task row is inserted
updateProgress();

// Inside the toggleTaskCompletion() function, after the class is added or removed

