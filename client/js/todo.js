var taskForm = document.getElementById('taskForm');
var titleInput = document.getElementById('titleInput');
var descInput = document.getElementById('descInput');
var statusInput = document.getElementById('statusInput');
var taskContainer = document.getElementById('taskContainer');
var editTaskId = null;

function loadTasks() {
  fetch('http://localhost:8000/api/task')
  .then(function(res) { return res.json(); })
  .then(function(data) {
    if (data.tasks) {
      data.tasks.forEach(function(task) {
        addTaskCard(task);
      });
    }
  })
  .catch(function(err) {
    console.error('Error loading tasks:', err);
  });
}

taskForm.addEventListener('submit', function(event) {
  event.preventDefault();

  var taskData = {
    title: titleInput.value,
    description: descInput.value,
    status: statusInput.value
  };

  var url = 'http://localhost:8000/api/task';
  var method = 'POST';

  if (editTaskId) {
    url += '/' + editTaskId;
    method = 'PUT';
  }

  fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    if (data.task) {
      if (editTaskId) {
        updateTaskCard(data.task);
        editTaskId = null;
        taskForm.querySelector('button[type="submit"]').textContent = 'Add Task';
      } else {
        addTaskCard(data.task);
      }
      taskForm.reset();
    } else {
      alert(data.message || 'Error processing task');
    }
  })
  .catch(function(err) {
    console.error(err);
  });
});

function addTaskCard(task) {
  var card = document.createElement('div');
  card.className = 'col-md-4 mb-3';

  card.innerHTML = `
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task.description || ''}</p>
        <p class="card-text"><small class="text-muted">${task.status}</small></p>
        <button class="btn btn-sm btn-warning edit-btn" data-id="${task._id}">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-sm btn-danger delete-btn" data-id="${task._id}">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `;

  taskContainer.prepend(card);
}

function updateTaskCard(task) {
  var cards = taskContainer.querySelectorAll('.col-md-4');
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    if (card.querySelector('.edit-btn').getAttribute('data-id') === task._id) {
      card.querySelector('.card-title').textContent = task.title;
      card.querySelector('.card-text').textContent = task.description || '';
      card.querySelector('.text-muted').textContent = task.status;
      break;
    }
  }
}

taskContainer.addEventListener('click', function(event) {
  if (event.target.closest('.delete-btn')) {
    var btn = event.target.closest('.delete-btn');
    var id = btn.getAttribute('data-id');

    if (confirm('Are you sure you want to delete this task?')) {
      fetch('http://localhost:8000/api/task/' + id, { method: 'DELETE' })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.message === 'Task Deleted successfully') {
          btn.closest('.col-md-4').remove();
        } else {
          alert('Error occurred while deleting the task.');
        }
      })
      .catch(function(err) {
        console.error(err);
      });
    }
  }

  if (event.target.closest('.edit-btn')) {
    var btn = event.target.closest('.edit-btn');
    var id = btn.getAttribute('data-id');
    editTaskId = id;

    fetch('http://localhost:8000/api/task/' + id)
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.task) {
        titleInput.value = data.task.title;
        descInput.value = data.task.description || '';
        statusInput.value = data.task.status || 'pending';
        taskForm.querySelector('button[type="submit"]').textContent = 'Update Task';
      }
    })
    .catch(function(err) {
      console.error(err);
    });
  }
});

window.onload = loadTasks;
