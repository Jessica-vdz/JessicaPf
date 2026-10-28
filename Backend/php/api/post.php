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
        if (
            !isset(
            $data["name"],
            $data["description"],
            $data["gitlink"],
            $data["projectLanguages"],

            $_FILES["projectImg"]
        )
        ) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Niet alle velden zijn ingevuld",
                "received_fields" => array_keys($_POST),
                "received_files" => array_keys($_FILES)
            ]);
            exit;
        }

        $name = $data["name"];
        $description = $data["description"];
        $gitlink = $data["gitlink"];
        $projectlink = $data["projectLink"] ?? "";
        $projectLanguages = $data["projectLanguages"];

        $img = $_FILES["projectImg"];

        if ($img["error"] != UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode(["succes" => false, "message" => "no upload"]);
            exit;
        }

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

        $stmt = $conn->prepare(
            "INSERT INTO Projects
            (Name, Description, GitLink, ProjectLink, ProjectImg, ProjectLanguages)
            VALUES (?, ?, ?, ?, ?, ?)"
        );

        $stmt->bind_param(
            "ssssss",
            $name,
            $description,
            $gitlink,
            $projectlink,
            $projectImg,
            $projectLanguages
        );

        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "Project added"
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

    default:
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Unknown action"
        ]);
}
?>