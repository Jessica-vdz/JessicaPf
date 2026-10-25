<?php 

$host = "localhost";
$user = "*";
$password = "*!";
$database = "*";

$conn = new mysqli($host, $user, $password, $database);

if($conn -> connect_error){
    die("connection failed because :" . $conn->connect_error);
}

?>