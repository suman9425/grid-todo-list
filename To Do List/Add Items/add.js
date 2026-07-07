// add.js

document.addEventListener('DOMContentLoaded', function() {
    // selecting input of form
    const titleInput = document.querySelector('input[placeholder="Title"]');
    const descInput = document.querySelector('.textarea-field');
    const priorityInput = document.querySelector('.priority-select');
    const submitBtn = document.querySelector('.submit-btn');
    const formHeading = document.querySelector('h1');

    // Index line for list and editting
    let todos = JSON.parse(localStorage.getItem('todosList')) || [];
    let editIndex = localStorage.getItem('editIndex');

    // editting 
    if (editIndex !== null) {
        let todoToEdit = todos[editIndex];
        titleInput.value = todoToEdit.title;
        descInput.value = todoToEdit.description;
        priorityInput.value = todoToEdit.priority;
        
        // changing the texts of form
        formHeading.innerText = "Edit Todo";
        submitBtn.innerText = "Update";
    }

    document.querySelector('.todo-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const title = titleInput.value;
        const description = descInput.value;
        const priority = priorityInput.value;

        if(title.trim() === "") {
            alert("Please enter a title!");
            return;
        }

        const newTodo = {
            title: title,
            description: description,
            priority: priority || "None"
        };

        // updating by editting at same old place
        if (editIndex !== null) {
            todos[editIndex] = newTodo;
            localStorage.removeItem('editIndex'); // Kaam sakepachi index hataidine
        } else {
            // if new data then add
            todos.push(newTodo);
        }

        // save and return back to dashboard
        localStorage.setItem('todosList', JSON.stringify(todos));
        window.location.href = '/To Do List/todo.html';
    });
});