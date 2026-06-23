<?php
// api/appointment.php
include('db.php');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Fetch all appointments
    $query = "SELECT * FROM appointments ORDER BY id DESC";
    $result = mysqli_query($conn, $query);

    $appointments = [];
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $appointments[] = $row;
        }
        echo json_encode(["success" => true, "data" => $appointments]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error fetching appointments: " . mysqli_error($conn)]);
    }
} elseif ($method === 'POST') {
    // Create new appointment
    $data = json_decode(file_get_contents("php://input"), true);

    $SName  = isset($data['SName']) ? mysqli_real_escape_string($conn, trim($data['SName'])) : '';
    $Class  = isset($data['Class']) ? (int)$data['Class'] : 0;
    $GName  = isset($data['GName']) ? mysqli_real_escape_string($conn, trim($data['GName'])) : '';
    $number = isset($data['number']) ? mysqli_real_escape_string($conn, trim($data['number'])) : '';

    if (empty($SName) || $Class <= 0 || empty($GName) || empty($number)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "All fields (Student Name, Class, Guardian Name, Phone) are required."]);
        exit();
    }

    $sql = "INSERT INTO appointments (SName, Class, GName, number)
            VALUES ('$SName', $Class, '$GName', '$number')";

    if (mysqli_query($conn, $sql)) {
        $appointment_id = mysqli_insert_id($conn);
        echo json_encode([
            "success" => true,
            "message" => "Appointment booked successfully!",
            "id" => $appointment_id
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . mysqli_error($conn)]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed."]);
}

$conn->close();
?>
