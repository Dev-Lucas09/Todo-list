const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

addBtn.addEventListener('click', addTask);
input.addEventListener('keydown', (e) => { if (e.key === 'Enter') addTask(); });

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,"&#039;");
}

function createTaskItem(text) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="task-text">${escapeHtml(text)}</span>
    <div class="icons">
      <button class="icon-btn" data-action="toggle" aria-label="Marcar como feito">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="icon-btn" data-action="delete" aria-label="Remover tarefa">
        <svg viewBox="0 0 24 24" fill="none">
          <polyline points="3 6 5 6 21 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14 11v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  `;
  return li;
}

function addTask() {
  const text = input.value.trim();
  if (!text) {
    alert('Digite uma tarefa!');
    input.focus();
    return;
  }
  const li = createTaskItem(text);
  taskList.appendChild(li);
  input.value = '';
  input.focus();
}

taskList.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;

  const action = btn.dataset.action;
  const li = btn.closest('li');
  if (!li) return;

  if (action === 'toggle') {
    li.querySelector('.task-text').classList.toggle('completed');
    btn.classList.toggle('active');
  } else if (action === 'delete') {
    li.classList.add('removing');
    setTimeout(() => li.remove(), 250);
  }
});
