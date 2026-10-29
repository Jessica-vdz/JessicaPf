<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

include "../index.php";

$categoryID = isset($_GET['categoryID']) ? $_GET['categoryID'] : null;

if ($categoryID) {
    $stmt = $conn->prepare("SELECT * FROM Books WHERE Category_ID = ?");
    $stmt->bind_param("i", $categoryID);
    $stmt->execute();

    $result = $stmt->get_result();
} else {
    $result = $conn->query("SELECT * FROM Books");
}

$books = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $books[] = $row;
    }

}

echo json_encode($books);
?>