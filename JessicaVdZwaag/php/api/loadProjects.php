<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

include "../index.php";

$result = $conn->query("SELECT * FROM Projects");

$project = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $project[] = $row;
    }
}

echo json_encode($project);
?>