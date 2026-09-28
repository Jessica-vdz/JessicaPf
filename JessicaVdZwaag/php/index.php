<?php 

$host = "localhost";
$user = "u683142670_jessicaPort";
$password = "Stanleydam2502!";
$database = "u683142670_portfolioJess";

$conn = new mysqli($host, $user, $password, $database);

if($conn -> connect_error){
    die("connection failed because :" . $conn->connect_error);
}

?>