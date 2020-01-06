(function() {
    'use strict';

    let textInput     = document.getElementById('textInput'),
        createBtn     = document.getElementById('createBtn'),
        form          = document.getElementById('form'),
        todosList     = document.getElementById('todos'),
        completedList = document.getElementById('completed');

    let tasks = getData();
    tasks.forEach((task) => {
        createTask(todosList, {
            text : task.text,
            id   : task.id
        });
    })

    textInput.addEventListener('input', function() {
        if (textInput.value.length) {
            createBtn.removeAttribute('disabled');
        } else {
            createBtn.setAttribute('disabled', true);
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        createTask(todosList, {
            text : textInput.value,
            id   : null
        })
        //     textInput.value);

        // textInput.value = '';
        // createBtn.setAttribute('disabled', true);

    });

    function createTask(target, task) {
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = task.text;

        target.appendChild(li);

        if (target == todosList) {
            let time = new Date,
                id   = task.id ? task.id : `todo-${time.getTime()}`;
                // `todo-${time.getTime()}`,
                // tasks = getData();

            let tasks = getData();
            tasks.push({
                id : id,
                text : task.text
            });

            if (!task.id) {
                saveData(tasks);
            }

            li.innerHTML = `
                <div class="form-check mb-2">
                    <input type="checkbox" class="form-check-input" id="${id}">
                    <label class="form-check-label" for="${id}">${task.text}</label>
                </div>
                <input type="text" class="form-control mb-2" value="${task.text}" hidden>
                <button class="btn btn-sm btn-warning editBtn" type="button">Редактировать</button>
                <button class="btn btn-sm btn-danger deleteBtn" type="button">Удалить</button>
                <button class="btn btn-sm btn-success saveBtn" hidden type="button">Сохранить</button>
                <button class="btn btn-sm btn-secondary cancelBtn" hidden type="button">Отменить</button>
                <button class="btn btn-sm btn-success getBackBtn" hidden type="button">Восстановить</button> <!-- >>>>> li.innerHTML = text -->
            `;

            document.getElementById(id).addEventListener('change', function(e) {
                e.target.setAttribute('disabled', true);
    
                let label  = e.target.nextElementSibling;
    
                createTask(completedList, {
                    text : label.innerText,
                    id   : null
                });
                removeTask(li);
            })

            li.querySelector('.deleteBtn').addEventListener('click', function() {
                removeTask(li);
            })

            li.querySelector('.editBtn')
              .addEventListener('click', function() {

                makeEditMode(li);
            })

            li.querySelector('.cancelBtn')
              .addEventListener('click', function() {

                let defaultText = li.querySelector('label').innerText;
                li.querySelector('input[type="text"]').value = defaultText;

                makeReadMode(li);
            })

            li.querySelector('.saveBtn')
              .addEventListener('click', function() {
                saveTask(li);
            })

            li.querySelector('input[type="text"]')
              .addEventListener('keypress', function(e) {
                if (e.keyCode == 13) {
                    saveTask(li);
                }
            })
        }
    }

    function makeReadMode(target) {
        changeVisibility(target, [
            '.form-control',
            '.saveBtn',
            '.cancelBtn'
        ], true);

        changeVisibility(target, [
            '.form-check',
            '.deleteBtn',
            '.editBtn'
        ], false);
    }

    function makeEditMode(target) {
        changeVisibility(target, [
            '.form-check',
            '.deleteBtn',
            '.editBtn'
        ], true);

        changeVisibility(target, [
            '.form-control',
            '.saveBtn',
            '.cancelBtn'
        ], false);
    }

    function saveTask(target) {
        let editedText = target.querySelector('input[type="text"]').value;
        target.querySelector('label').innerText = editedText;

        makeReadMode(target);
    }

    function removeTask(target) {
        let id = target.querySelector('[type="checkbox"]').getAttribute('id'),
            tasks = getData(),
            index = -1;

        tasks.forEach((task, i) => {
            if (task.id == id) {
                index = i;
            }
        });

        tasks.splice(index, 1);
            
        console.log(id);
        console.log(index);

        target.remove();
    }

    function changeVisibility(parent, elems, hide) {
        elems.forEach(elem => {
            if (hide) {
                parent.querySelector(elem)
                      .setAttribute('hidden', true);
            } else {
                parent.querySelector(elem)
                      .removeAttribute('hidden');
            } 
        })
    }






    function saveData(data) {
        data = JSON.stringify(data);
        localStorage.setItem('tasks', data /* 146 */);
    }

    function getData() {
        var data = localStorage.getItem('tasks');
        return data = data ? JSON.parse(data) : [];
        // if (data) {
        //     data = JSON.parse(date);
        // } else {
        //     data = [];
        // } /*an explain of 149*/

        // return data;
    }
    console.log(getData());
})();