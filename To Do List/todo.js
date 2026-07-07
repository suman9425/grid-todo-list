// todo.js

document.addEventListener('DOMContentLoaded', function() {
    const todoGrid = document.querySelector('.todo-grid');

    // "Add" button click garda purano edit data clear garne
    const addBtnLink = document.querySelector('.add-btn-link');
    if(addBtnLink) {
        addBtnLink.addEventListener('click', function() {
            localStorage.removeItem('editIndex');
        });
    }

    function displayTodos() {
        let todos = JSON.parse(localStorage.getItem('todosList')) || [];
        todoGrid.innerHTML = '';

        if (todos.length > 0) {
            todos.forEach(function(todo, index) {
                const card = document.createElement('div');
                card.classList.add('todo-card');

                const maxLength = 80;
                let isLongText = todo.description.length > maxLength;
                let shortText = isLongText ? todo.description.substring(0, maxLength) + "..." : todo.description;

                card.innerHTML = `
                    <h3>${todo.title}</h3>
                    <p class="desc-text">${shortText}</p>
                    ${isLongText ? '<button class="read-more-btn">Show more</button>' : ''}
                    
                    <div class="card-footer">
                        <p style="margin:0;">Priority: <span>${todo.priority}</span></p>
                        <div class="action-buttons">
                            <button class="edit-btn" data-index="${index}" title="Edit">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button class="delete-btn" data-index="${index}" title="Delete">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;

                // Show more / Show less logic
                if (isLongText) {
                    const btn = card.querySelector('.read-more-btn');
                    const descText = card.querySelector('.desc-text');
                    let isExpanded = false;

                    btn.addEventListener('click', function() {
                        if (isExpanded) {
                            descText.textContent = shortText;
                            btn.textContent = "Show more";
                        } else {
                            descText.textContent = todo.description;
                            btn.textContent = "Show less";
                        }
                        isExpanded = !isExpanded; 
                    });
                }

                // Delete button logic
                const deleteBtn = card.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', function() {
                    if(confirm("Are you sure you want to delete this task?")) {
                        todos.splice(index, 1);
                        localStorage.setItem('todosList', JSON.stringify(todos));
                        displayTodos(); 
                    }
                });

                // Edit button logic 
                const editBtn = card.querySelector('.edit-btn');
                editBtn.addEventListener('click', function() {
                    // Kun chai edit garna lageko tesko ID save garne
                    localStorage.setItem('editIndex', index);
                    
                    // sending to add.html
                    window.location.href = '/To Do List/Add Items/add.html'; 
                });

                todoGrid.appendChild(card);
            });
        } else {
            todoGrid.innerHTML = '<p style="color: white; font-size: 18px; text-align: center; width: 100%;">No tasks added yet. Click "Add" to create a new task!</p>';
        }
    }

    displayTodos();
});