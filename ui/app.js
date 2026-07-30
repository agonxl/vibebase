async function fetchVibeData() {
    try {
        const response = await fetch('/api/vibe');
        const data = await response.json();
        renderDashboard(data);
    } catch (error) {
        console.error("Error fetching vibe data:", error);
    }
}

function renderDashboard(data) {
    const todoList = document.getElementById('todo-list');
    const doneList = document.getElementById('done-list');
    
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    if (data.todo.length === 0) todoList.innerHTML = `<li><span style="opacity: 0.5">No active tasks...</span></li>`;
    data.todo.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        todoList.appendChild(li);
    });

    if (data.done.length === 0) doneList.innerHTML = `<li><span style="opacity: 0.5">No completed tasks yet...</span></li>`;
    data.done.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        doneList.appendChild(li);
    });

    const total = data.todo.length + data.done.length;
    let percentage = 0;
    if (total > 0) {
        percentage = Math.round((data.done.length / total) * 100);
    }
    
    document.getElementById('score-text').textContent = `${percentage}%`;
    document.getElementById('task-count-text').textContent = `${data.done.length} of ${total} Tasks Complete`;
    updateProgressRing(percentage);

    // Using basic markdown formatting for handoff content
    let handoffHtml = (data.handoff || "No handoff note found.")
        .replace(/\n/g, '<br>')
        .replace(/### (.*)/g, '<h3>$1</h3>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/- (.*)/g, '<li>$1</li>');
        
    document.getElementById('handoff-content').innerHTML = handoffHtml;

    // Security Status
    const threatLevel = document.getElementById('threat-level');
    const secHero = document.getElementById('security-hero');
    
    if (data.hasEnv) {
        threatLevel.textContent = 'Low';
        threatLevel.className = 'safe-text';
        secHero.innerHTML = `<h3 class="safe-text">100% SECURE</h3><div class="shield-icon glow">🛡️</div>`;
    } else {
        threatLevel.textContent = 'High';
        threatLevel.className = 'danger-text';
        secHero.innerHTML = `<h3 class="danger-text">VULNERABLE</h3><div class="shield-icon glow danger">⚠️</div>`;
    }

    // Dynamic Project & Git Data
    document.getElementById('project-name').textContent = data.projectName || "Vibebase Project";
    const gitBadge = document.getElementById('git-badge');
    
    if (data.gitBranch) {
        gitBadge.style.display = 'inline-block';
        gitBadge.textContent = `🌱 ${data.gitBranch} ${data.uncommitted > 0 ? `(${data.uncommitted} changes)` : ''}`;
        if (data.uncommitted > 0) {
            gitBadge.style.background = 'rgba(239, 68, 68, 0.2)';
            gitBadge.style.color = 'var(--danger)';
        } else {
            gitBadge.style.background = 'rgba(34, 197, 94, 0.2)';
            gitBadge.style.color = 'var(--safe)';
        }
    } else {
        gitBadge.style.display = 'none';
    }
}

function updateProgressRing(percent) {
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
}

fetchVibeData();
setInterval(fetchVibeData, 5000);
