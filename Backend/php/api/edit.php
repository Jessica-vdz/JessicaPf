<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
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

if (!isset($data["action"])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Missing action"
    ]);
    exit;
}

switch ($data["action"]) {
    case "project":
        $id = $data["id"];
        $name = $data["name"];
        $description = $data["description"];
        $gitlink = $data["gitlink"];
        $projectlink = $data["projectLink"];
        $projectLanguages = $data["ProjectLanguages"];

        $stmt = $conn->prepare("SELECT ProjectImg FROM Projects WHERE Project_ID = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();

        $result = $stmt->get_result();
        $project = $result->fetch_assoc();
        $stmt->close();

        $projectImg = $project["ProjectImg"];

        if (isset($_FILES["projectImg"])) {
            $img = $_FILES["projectImg"];

            $uploadDir = __DIR__ . "/projects/";

            if (
                !is_dir($uploadDir) &&
                !mkdir($uploadDir, 0755, true)
            ) {
                http_response_code(500);
                echo json_encode(["succes" => false, "message" => "map err"]);
                exit;
            }

            $fileName = bin2hex(random_bytes(16)) . ".png";
            $destination = $uploadDir . $fileName;

            if (!move_uploaded_file($img["tmp_name"], $destination)) {
                http_response_code(500);
                echo json_encode([
                    "success" => false,
                    "message" => "Afbeelding opslaan is mislukt"
                ]);
                exit;
            }

            $projectImg = "/api/projects/" . $fileName;
        }
        $stmt = $conn->prepare("UPDATE Projects SET Name =?, Description =?, GitLink = ?, ProjectLink =?,  ProjectImg =?, ProjectLanguages=? WHERE Project_ID =?");
        $stmt->bind_param("ssssssi", $name, $description, $gitlink, $projectlink, $projectImg, $projectLanguages, $id);

        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "goed bewerkt!"
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "niet gelukt!"
            ]);
        }

        $stmt->close();
        break;
}
?>