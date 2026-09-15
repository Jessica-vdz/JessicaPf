<?php 

$host = "mariadb";
$user = "jessica";
$password = "1234";
$database = "portfolio_db";

$conn = new mysqli($host, $user, $password, $database);

if($conn -> connect_error){
    die("connection failed because :" . $conn->connect_error);
}

?>