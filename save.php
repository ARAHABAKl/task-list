<?php
$taskName = $_POST['taskName'];
$taskDate = $_POST['taskDate'];

// Load the existing tasks from the XML file
$tasks = simplexml_load_file('tasks.xml');
if (!$tasks) {
    $tasks = new SimpleXMLElement('<tasks></tasks>');
}

// Add the new task
$newTask = $tasks->addChild('task');
$newTask->addChild('name', $taskName);
$newTask->addChild('date', $taskDate);

// Save the updated tasks to the XML file
$tasks->asXML('tasks.xml');
?>


