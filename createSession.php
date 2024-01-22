<?php
session_start();

    $_SESSION['sessionCreated'] = true;

    // Удаляем файл tasks.xml
    if (file_exists('tasks.xml')) {
        unlink('tasks.xml');

}
?>