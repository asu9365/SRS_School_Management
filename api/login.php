<?php
// api/login.php
include('db.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $username = isset($data['username']) ? trim($data['username']) : '';
    $userid   = isset($data['userid']) ? trim($data['userid']) : (isset($data['ID']) ? trim($data['ID']) : '');
    $password = isset($data['password']) ? trim($data['password']) : '';

    if (empty($username) || empty($userid) || empty($password)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Username, ID and password are required."]);
        exit();
    }

    // Prepare secure SQL statement
    $stmt = $conn->prepare("SELECT role, password FROM login_credentials WHERE username = ? AND userid = ?");
    $stmt->bind_param("ss", $username, $userid);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Check password
        if ($password === $row['password']) {
            echo json_encode([
                "success" => true,
                "role" => $row['role'],
                "username" => $username,
                "userid" => $userid
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "Invalid password!"]);
        }
    } else {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Invalid username or ID!"]);
    }

    $stmt->close();
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed."]);
}

$conn->close();
?>
