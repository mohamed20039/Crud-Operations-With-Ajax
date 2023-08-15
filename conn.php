<?php
    $conn = new mysqli("localhost","root","","student crud table");

    if ($conn->connect_error){
        echo $conn->error;
    }
?>