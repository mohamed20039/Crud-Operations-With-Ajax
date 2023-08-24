<?php

    include 'conn.php';
    header("Content-Type: application/json");

    $action = $_POST['action'];

    function readAll($connection){
        $message = array();
        $data = array();
        $query = "SELECT * FROM student";

        $result = $connection->query($query);

        if ($result){
            while ($row = $result->fetch_assoc()){
                $data [] = $row;
            }
            $message = array("status" => true , "data" => $data);
        }
        else {
            $message = array("status" => false , "data" => $connection -> error);
        }

        echo json_encode($message);
    }
    function readStudentInfo($connection){
        $message = array();
        $data = array();
       $studentId = $_POST['id'];

        $query = "SELECT * FROM `student` where id = '$studentId'";

        $result = $connection->query($query);

        if ($result){
            while ($row = $result->fetch_assoc()){
                $data [] = $row;
            }
            $message = array("status" => true , "data" => $data);
        }
        else {
            $message = array("status" => false , "data" => $connection -> error);
        }

        echo json_encode($message);
    }

    function registerStudent($connection){
        $studentId = $_POST['id'];
        $studentName = $_POST['name'];
        $studentClass = $_POST['class'];

        $data = array();

        $query = "INSERT INTO student(id , name , class) VALUES('$studentId','$studentName','$studentClass')";

        $result = $connection->query($query);

        if ($result){
            $data = array("status" => true , 'data' => "Registered Successfully");
        }
        else {
            $data = array("status" => false , 'data' => $connection -> error);
        }

        echo json_encode($data);

    }

    function updateStudent($connection){
        $studentId = $_POST['id'];
        $studentName = $_POST['name'];
        $studentClass = $_POST['class'];

        $data = array();

        $query = "UPDATE student set name= '$studentName', class='$studentClass' where id = '$studentId'";

        $result = $connection->query($query);

        if ($result){
            $data = array("status" => true , 'data' => "Registered Successfully");
        }
        else {
            $data = array("status" => false , 'data' => $connection -> error);
        }

        echo json_encode($data);

    }

    function deleteStudent($connection){
        $message = array();
        $data = array();
        $id = $_POST['id'];
        $query = "DELETE FROM student WHERE id = '$id'";

        $result = $connection->query($query);

        if ($result){
            $message = array("status" => true , "data" => $data);
        }
        else {
            $message = array("status" => false , "data" => $connection -> error);
        }

        echo json_encode($message);
    }

    if (isset($action)){
        $action($connection);
    }
    else{
        echo "Action is required...";
    }

    

?>