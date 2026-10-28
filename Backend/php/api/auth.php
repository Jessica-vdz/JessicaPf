<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

session_start();

if (!isset($_SESSION["userName"])) {
    http_response_code(401);
    echo json_encode(["success" => false]);
    exit;
}

echo json_encode([
    "success" => true,
    "user" => [
        "userName" => $_SESSION["userName"]
    ]
]);