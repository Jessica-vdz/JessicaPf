<?php
header("Content-Type: application/json");

include "../index.php";

$result = $conn->query("SELECT * FROM Projects");

if (!$result) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $conn->error
    ]);
    exit;
}

$projects = [];

while ($row = $result->fetch_assoc()) {
    $projects[] = $row;
}

echo json_encode($projects);
?>