<?php
    $connection = new mysqli("localhost","root","","student crud table");

    if ($connection->connect_error){
        echo $connection->error;
    }
?>