function renderTodos() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';
  
  todos.forEach((todo, index) => {
    const todoItem = document.createElement('li');
    todoItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    if (todo.completed) {
      todoItem.classList.add('completed');
    }

    const todoText = document.createElement('span');
    todoText.innerHTML = todo.completed ? `<i class="fas fa-check-circle"></i> ${todo.text}` : todo.text;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const completeButton = document.createElement('button');
    completeButton.className = 'btn btn-success btn-sm mr-2';
    completeButton.textContent = todo.completed ? 'Undo' : 'Complete';
    completeButton.onclick = () => {
      todo.completed = !todo.completed;
      renderTodos();
    };

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
      todos.splice(index, 1);
      renderTodos();
    };

    if (todo.completed) {
      completeButton.style.display = 'none';
      deleteButton.style.display = 'none';
    } else {
      completeButton.style.display = 'inline';
      deleteButton.style.display = 'inline';
    }

    actions.appendChild(completeButton);
    actions.appendChild(deleteButton);

    todoItem.appendChild(todoText);
    todoItem.appendChild(actions);
    todoList.appendChild(todoItem);
  });
}

const todos = [];

document.getElementById('add-todo-form').addEventListener('submit', (event) => {
  event.preventDefault();
  
  const newTodoText = document.getElementById('new-todo').value.trim();
  if (newTodoText === '') return;

  todos.push({ text: newTodoText, completed: false });
  document.getElementById('new-todo').value = '';
  renderTodos();
});

renderTodos();
