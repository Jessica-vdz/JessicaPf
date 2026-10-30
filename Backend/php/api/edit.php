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

        $projectImg = "/php/api/projects/" . $fileName;

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

    case "book":
        $id = $data["id"];
        
        $title = $data["title"];
        $author = $data["author"];
        $description = $data["description"];
        $category_ID = $data["category_ID"];

        $stmt = $conn->prepare("UPDATE Books SET Title =?, Author =?, Description = ?, Category_ID = ? WHERE Books_ID = ?");
        $stmt->bind_param("sssii", $title, $author, $description, $category_ID, $id);

        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "boeken geupdate"
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "iets ging mis "
            ]);
        }
        break;

    case "me":
        $id = $data["id"];
        $name = $data["Name"];
        $location = $data["Location"];
        $info = $data["Info"];
        $github = $data["GitHub"];
        $linkedin = $data["Linkedin"];
        $email = $data["email"];

        $stmt = $conn->prepare("UPDATE Me SET Name = ?, Location = ?, Info = ?, Github = ?, Linkedin = ?, Email = ? WHERE Me_ID =?");
        $stmt->bind_param("ssssssi", $name, $location, $info, $github, $linkedin, $email, $id);

        if ($stmt->execute()) {
            echo json_encode([
                "success" => true,
                "message" => "Me changed"
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "wrong!"
            ]);
        }
        break;
}
?>