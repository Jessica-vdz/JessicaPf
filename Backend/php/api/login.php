<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

session_start();
include "../index.php";


    if (!isset($data["userName"], $data["password"])) {
        echo json_encode([
            "success" => false,
            "message" => "Gebruikersnaam en wachtwoord nodig"
        ]);
        exit;
    }

    $user = $data["userName"];
    $password = $data["password"];

    $stmt = $conn->prepare("SELECT userName FROM user WHERE UserName = ? AND PasswordDb = SHA2(?,256)");
    $stmt->bind_param("ss", $user, $password);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($userName);
        $stmt->fetch();

        session_regenerate_id(true);

        $_SESSION["userName"] = $userName;
        echo json_encode([
            "success" => true,
            "user" => ["userName" => $userName]
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "message" => "Gebruikersnaam of wachtwoord onjuist"
        ]);
    }
}
?>