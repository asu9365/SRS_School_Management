<?php
// api/teachers.php
include('db.php');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $name = isset($_GET['name']) ? mysqli_real_escape_string($conn, trim($_GET['name'])) : '';

    if ($name !== '') {
        $query = "SELECT *, CONCAT(Fname, ' ', Mname, ' ', Lname) AS Name FROM teachers WHERE Fname LIKE '%$name%' OR Lname LIKE '%$name%' ORDER BY id DESC";
    } else {
        $query = "SELECT *, CONCAT(Fname, ' ', Mname, ' ', Lname) AS Name FROM teachers ORDER BY id DESC";
    }

    $result = mysqli_query($conn, $query);
    $teachers = [];

    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $teachers[] = $row;
        }
        echo json_encode(["success" => true, "data" => $teachers]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error searching teachers: " . mysqli_error($conn)]);
    }
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $Fname         = isset($data['Fname']) ? mysqli_real_escape_string($conn, trim($data['Fname'])) : '';
    $Mname         = isset($data['Mname']) ? mysqli_real_escape_string($conn, trim($data['Mname'])) : '';
    $Lname         = isset($data['Lname']) ? mysqli_real_escape_string($conn, trim($data['Lname'])) : '';
    $caste         = isset($data['caste']) ? mysqli_real_escape_string($conn, trim($data['caste'])) : '';
    $DOB           = isset($data['DOB']) ? trim($data['DOB']) : '';
    $Phone         = isset($data['Phone']) ? mysqli_real_escape_string($conn, trim($data['Phone'])) : '';
    $blood         = isset($data['blood']) ? mysqli_real_escape_string($conn, trim($data['blood'])) : '';
    $Ftname        = isset($data['Ftname']) ? mysqli_real_escape_string($conn, trim($data['Ftname'])) : '';
    $Fcontact      = isset($data['Fcontact']) ? mysqli_real_escape_string($conn, trim($data['Fcontact'])) : '';
    $Mtname        = isset($data['Mtname']) ? mysqli_real_escape_string($conn, trim($data['Mtname'])) : '';
    $Mcontact      = isset($data['Mcontact']) ? mysqli_real_escape_string($conn, trim($data['Mcontact'])) : '';
    $address       = isset($data['address']) ? mysqli_real_escape_string($conn, trim($data['address'])) : '';
    $POaddress     = isset($data['POaddress']) ? mysqli_real_escape_string($conn, trim($data['POaddress'])) : '';
    $pin           = isset($data['pin']) ? mysqli_real_escape_string($conn, trim($data['pin'])) : '';
    $Dist          = isset($data['Dist']) ? mysqli_real_escape_string($conn, trim($data['Dist'])) : '';
    $State         = isset($data['State']) ? mysqli_real_escape_string($conn, trim($data['State'])) : '';
    $qualification = isset($data['qualification']) ? mysqli_real_escape_string($conn, trim($data['qualification'])) : '';
    $experience    = isset($data['experience']) ? mysqli_real_escape_string($conn, trim($data['experience'])) : '';
    $classAssign   = isset($data['classAssign']) ? (int)$data['classAssign'] : 0;

    if (empty($Fname) || empty($Lname) || empty($Phone) || empty($DOB) || empty($blood)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "First Name, Last Name, Phone, DOB, and Blood Group are required."]);
        exit();
    }

    $sql = "INSERT INTO teachers 
        (Fname, Mname, Lname, caste, DOB, Phone, blood, Ftname, Fcontact, Mtname, Mcontact, address, POaddress, pin, Dist, State, qualification, experience, classAssign)
        VALUES
        ('$Fname', '$Mname', '$Lname', '$caste', '$DOB', '$Phone', '$blood', '$Ftname', '$Fcontact', '$Mtname', '$Mcontact', '$address', '$POaddress', '$pin', '$Dist', '$State', '$qualification', '$experience', $classAssign)";

    if (mysqli_query($conn, $sql)) {
        $teacher_id = mysqli_insert_id($conn);
        $query = "SELECT * FROM teachers WHERE id = $teacher_id";
        $result = mysqli_query($conn, $query);
        $insertedTeacher = mysqli_fetch_assoc($result);

        echo json_encode([
            "success" => true,
            "message" => "Teacher registered successfully!",
            "data" => $insertedTeacher
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
