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

// Tasks
function addTask() {
    const taskName = taskNameInput.value;
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;

    if (taskName && startTime && endTime) {
        const newRow = tasksContainer.insertRow(-1);
// Inside addTask() function
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
`;

        taskId++;

        taskNameInput.value = '';
        startTimeInput.value = '';
        endTimeInput.value = '';

        schedulePopup(taskName, startTime);
    } else {
        alert('Please fill out all fields');
    }
}

function toggleTaskCompletion(checkbox) {
    const row = checkbox.parentNode.parentNode;
    if (checkbox.checked) {
        row.classList.add('completed');
    } else {
        row.classList.remove('completed');
    }
}

function schedulePopup(taskName, startTime) {
    const now = new Date();
    const [hours, minutes] = startTime.split(':');
    const start = new Date();
    start.setHours(hours);
    start.setMinutes(minutes);

    // Calculate the timeout in milliseconds
    const timeout = start - now;

    // Check if the timeout is positive (i.e., the start time is in the future)
    if (timeout > 0) {
        setTimeout(() => {
            openPopup(`It's time to start ${taskName}`);
        }, timeout);
    }
    // If the timeout is negative, it means the start time has already passed, so no need to schedule the popup
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
