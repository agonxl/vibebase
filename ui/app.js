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

    if (data.todo.length === 0) todoList.innerHTML = `<li><span style="opacity: 0.5">Henüz hedef eklenmemiş...</span></li>`;
    data.todo.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        todoList.appendChild(li);
    });

    if (data.done.length === 0) doneList.innerHTML = `<li><span style="opacity: 0.5">Henüz tamamlanan hedef yok...</span></li>`;
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
    
    document.getElementById('score-text').textContent = `%${percentage} Vibe`;
    updateProgressRing(percentage);

    document.getElementById('handoff-content').textContent = data.handoff || "Handoff notu bulunamadı.";

    const secStatus = document.getElementById('security-status');
    if (data.hasEnv) {
        secStatus.innerHTML = `✅ .env dosyası güvende!`;
        secStatus.className = 'security-status security-safe';
    } else {
        secStatus.innerHTML = `⚠️ DİKKAT: .env dosyası bulunamadı. Şifre sızıntılarına açık olabilirsiniz!`;
        secStatus.className = 'security-status security-warning';
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
