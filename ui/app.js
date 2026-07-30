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
        secHero.innerHTML = `<h3 class="safe-text">100% SECURE</h3><div class="shield-icon glow"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg></div>`;
    } else {
        threatLevel.textContent = 'High';
        threatLevel.className = 'danger-text';
        secHero.innerHTML = `<h3 class="danger-text">VULNERABLE</h3><div class="shield-icon glow danger"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></div>`;
    }

    // Dynamic Project & Git Data
    document.getElementById('project-name').textContent = data.projectName || "Vibebase Project";
    const gitBadge = document.getElementById('git-badge');
    
    if (data.gitBranch) {
        gitBadge.style.display = 'inline-flex';
        gitBadge.style.alignItems = 'center';
        
        // Git branch SVG icon instead of emoji
        const gitIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M6 15V9a3 3 0 1 0 0-6 3 3 0 0 0 0 6v6"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`;
        gitBadge.innerHTML = `${gitIcon} ${data.gitBranch} ${data.uncommitted > 0 ? `(${data.uncommitted} changes)` : ''}`;
        
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

    // Render Alerts
    const alertsView = document.getElementById('view-alerts');
    if (alertsView) {
        if (data.alerts && data.alerts.length > 0) {
            // Remove flex centering for empty state
            alertsView.style.justifyContent = 'flex-start';
            alertsView.style.padding = '2rem';
            
            let alertsHtml = `<h2 style="margin-bottom: 20px; font-weight: 600;">System Alerts (${data.alerts.length})</h2>`;
            data.alerts.forEach(alert => {
                const color = alert.type === 'danger' ? 'var(--danger)' : (alert.type === 'warning' ? '#f59e0b' : 'var(--neon-purple)');
                const icon = alert.type === 'danger' ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>` : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
                
                alertsHtml += `
                <div class="glass-card" style="margin-bottom: 15px; border-left: 4px solid ${color};">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="color: ${color};">${icon}</div>
                        <div>
                            <h3 style="margin-bottom: 5px; color: ${color};">${alert.title}</h3>
                            <p style="opacity: 0.8; font-size: 0.95rem;">${alert.message}</p>
                        </div>
                    </div>
                </div>`;
            });
            alertsView.innerHTML = alertsHtml;
        } else {
            // Restore empty state
            alertsView.style.justifyContent = 'center';
            alertsView.style.padding = '0';
            alertsView.innerHTML = `
                <div class="empty-state">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--neon-cyan)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.5; margin-bottom: 20px;"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                    <h2>Alerts & Notifications</h2>
                    <p class="subtext">You have no active alerts at this time. System is perfectly healthy.</p>
                </div>
            `;
        }
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

// Tab Switching Logic
document.querySelectorAll('.side-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        document.querySelectorAll('.side-nav a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        document.querySelectorAll('.tab-view').forEach(view => {
            view.classList.remove('active');
        });
        
        const targetId = 'view-' + link.getAttribute('data-tab');
        const targetView = document.getElementById(targetId);
        if (targetView) targetView.classList.add('active');
    });
});

fetchVibeData();
setInterval(fetchVibeData, 5000);
