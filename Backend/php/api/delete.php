<?php
header("Access-Control-Allow-Origin: https://jessicavanderzwaag.nl");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Invalid method"
    ]);
    exit;
}

include "../index.php";

$data = $_POST;

if (!isset($data["category"])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Missing action"
    ]);
    exit;
}

switch ($data["category"]) {
    case "me":
        if (!isset($data['deleteItem'])) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "missing fields"
            ]);
            exit;
        }
        $id = $data['deleteItem'];

        $stmt = $conn->prepare("DELETE FROM Me WHERE Me_ID = ?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "delete Me"
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Database insert failed"
            ]);
        }
        $stmt->close();
        break;

    case "projects":
        if (!isset($data['deleteItem'])) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "missing fields"
            ]);
            exit;
        }

        $id = $data['deleteItem'];

        $stmt = $conn->prepare("DELETE FROM Projects WHERE  Project_ID = ?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "delete Projects"
            ]);
        }
        $stmt->close();
        break;

    case "book":
        if (!isset($data['deleteItem'])) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "missing fields"
            ]);
            exit;
        }

        $id = $data['deleteItem'];

        $stmt = $conn->prepare("DELETE FROM Books WHERE  Books_ID = ?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "delete Projects"
            ]);
        }
        $stmt->close();
}