document.getElementById('add-task').addEventListener('click', function() {
    document.getElementById('task-form').style.display = 'block';
    document.getElementById('task-name').focus();

    // Check if a new session is created

});
document.getElementById('save-task').addEventListener('click', function() {
    var taskName = document.getElementById('task-name').value;
    var taskDate = document.getElementById('task-date').value;
    if (taskName === '' || taskDate === '') {
        alert('Заполните все поля');
        return;
    }
    var task = document.createElement('div');
    task.innerHTML = taskName + '<br>' + new Date().toLocaleDateString() + '<br>' + taskDate;
    document.getElementById('task-list').appendChild(task);
    saveTask(taskName, taskDate);
    document.getElementById('task-form').style.display = 'none';
    loadTasks();
})

function saveTask(taskName, taskDate) {
    $.ajax({
        url: 'save.php',
        type: 'POST',
        data: {
            taskName: taskName,
            taskDate: taskDate
        },
        success: function(data) {
            console.log('Data saved successfully');
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}

function getTasks() {
    var tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    fetch('tasks.xml')
        .then(response => response.text())
        .then(text => {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(text, 'text/xml');
            var tasks = xmlDoc.getElementsByTagName('task');
            var tasksArray = [];
            for (var i = 0; i < tasks.length; i++) {
                var task = tasks[i];
                var name = task.getElementsByTagName('name')[0].textContent;
                var date = task.getElementsByTagName('date')[0].textContent;
                tasksArray.push({name: name, date: date});
            }
            // Проверяем, есть ли уже задачи в списке
            var existingTasks = document.querySelectorAll('#task-list div');
            if (existingTasks.length === 0) {
                // Если задач нет, добавляем новые
                tasksArray.forEach(function(task) {
                    var taskDiv = document.createElement('div');
                    taskDiv.innerHTML = task.name + '<br>' + new Date().toLocaleDateString() + '<br>' + task.date;
                    document.getElementById('task-list').appendChild(taskDiv);
                });
            }
        })
        .catch(error => console.error('Error:', error));
}

window.onload = loadTasks;

// Создаем функцию для создания новой сессии
// Вызывать функцию createNewSession каждые 5 секунд
var intervalId = setInterval(createNewSession, 50000);

function createNewSession() {
    // Отправляем POST-запрос на сервер
    $.ajax({
        url: 'createSession.php',
        type: 'POST',
        success: function(data) {
            console.log('New session created');
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}

$('#save-task').click(function() {
    var taskName = $('#task-name').val();
    var taskDate = $('#task-date').val();

    // Создаем новый элемент задачи
    var newTask = $('<task></task>');
    newTask.append($('<name></name>').text(taskName));
    newTask.append($('<date></date>').text(taskDate));

    // Загружаем существующие задачи
    var tasks = $.parseXML($.ajax({
        type: "GET",
        url: "tasks.xml",
        async: false
    }).responseText);

    // Добавляем новую задачу в начало списка
    $(tasks).find('tasks').prepend(newTask);

    // Сохраняем обновленный XML-файл
    $.ajax({
        type: "POST",
        url: "update_tasks.php",
        data: { xml: $(tasks).find('tasks')[0].outerHTML }
    });

    // Обновляем список задач на странице
    location.reload();
});
