<!DOCTYPE html>
<html>
<head>
    <title>Список задач</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="../style/style.css">
</head>
<body>
<div id="task-list">
    <!-- Здесь будут отображаться задачи -->
</div>
<div id="task-form" style="display: none;">
    <input type="text" id="task-name" placeholder="Название задачи">
    <input type="text" id="task-date" placeholder="Дата окончания задачи">
    <button id="save-task">Добавить</button>
</div>
<button id="add-task">Добавить</button>

<script src="../js/script.js"></script>
<script>
    $(function() {
        $( "#task-date" ).datepicker({
            dateFormat: "dd.mm.yy"
        });
    });
</script>
</body>
</html>

<?php
if (!file_exists('tasks.xml')) {
    $tasks = new SimpleXMLElement('<tasks></tasks>');
    file_put_contents('tasks.xml', $tasks->asXML());
} else {
    $tasks = simplexml_load_file('tasks.xml');
}
?>