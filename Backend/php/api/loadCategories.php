<?php
header("Access-Control-Allow-Origin: https://jessicavanderzwaag.nl");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

include "../index.php";


$result = $conn->query("SELECT * FROM Category");

$category = [];

if ($result && $result->num_rows > 0){
    while($row = $result->fetch_assoc()) {
        $category[] = $row;
    }
}

echo json_encode($category);
?>