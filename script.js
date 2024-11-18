// Select DOM elements
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const successMessage = document.getElementById('success-message');

// Load todos from local storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Display todos
function renderTodos() {
  todoList.innerHTML = ''; // Clear the current list
  todos.forEach((todo, index) => {
    // Create a list item for each todo
    const li = document.createElement('li');
    li.className = 'todo-item';

    // Create the text span
    const span = document.createElement('span');
    span.className = `todo-text ${todo.completed ? 'completed' : ''}`;
    span.textContent = todo.text;
    span.onclick = () => toggleComplete(index); // Toggle completion on click

    // Create the edit button
    const editButton = document.createElement('button');
    editButton.className = 'edit-btn';
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.onclick = () => editTodo(index);

    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.onclick = () => deleteTodo(index);

    // Append everything to the list item
    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    // Add the list item to the todo list
    todoList.appendChild(li);
  });
}


// Add a new todo
function addTodo() {
  const todoText = todoInput.value.trim(); // Get the input value
  if (todoText) {
    todos.push({ text: todoText, completed: false }); // Add a new to-do object
    saveTodos(); // Save the updated list to local storage
    renderTodos(); // Re-render the list
    todoInput.value = ''; // Clear the input
    showSuccessMessage(); // Show success message
  } else {
    alert('Please enter a task!');
  }
}


// Toggle completion
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed; // Toggle the completed status
  saveTodos(); // Save changes
  renderTodos(); // Re-render the list
}


// Edit an existing todo
function editTodo(index) {
  const newTodo = prompt('Edit your task:', todos[index].text); // Show a prompt
  if (newTodo !== null) {
    todos[index].text = newTodo.trim(); // Update the text
    saveTodos(); // Save changes
    renderTodos(); // Re-render the list
  }
}


// Delete a todo
function deleteTodo(index) {
  todos.splice(index, 1); // Remove the to-do at the specified index
  saveTodos(); // Save the updated list
  renderTodos(); // Re-render the list
}


// Save todos to local storage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Show success message
function showSuccessMessage() {
  successMessage.style.display = 'block';
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 2000);
}

// Initial rendering of todos
renderTodos();
