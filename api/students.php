<?php
// api/students.php
include('db.php');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $name = isset($_GET['name']) ? mysqli_real_escape_string($conn, trim($_GET['name'])) : '';

    if ($name !== '') {
        $query = "SELECT * FROM students WHERE Fname LIKE '%$name%' OR Lname LIKE '%$name%' ORDER BY class ASC";
    } else {
        $query = "SELECT * FROM students ORDER BY student_id DESC";
    }

    $result = mysqli_query($conn, $query);
    $students = [];

    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $students[] = $row;
        }
        echo json_encode(["success" => true, "data" => $students]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error searching students: " . mysqli_error($conn)]);
    }
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $Fname       = isset($data['Fname']) ? mysqli_real_escape_string($conn, trim($data['Fname'])) : '';
    $Mname       = isset($data['Mname']) ? mysqli_real_escape_string($conn, trim($data['Mname'])) : '';
    $Lname       = isset($data['Lname']) ? mysqli_real_escape_string($conn, trim($data['Lname'])) : '';
    $class       = isset($data['class']) ? mysqli_real_escape_string($conn, trim($data['class'])) : '';
    $rollno      = isset($data['rollno']) ? (int)$data['rollno'] : 0;
    $caste       = isset($data['caste']) ? mysqli_real_escape_string($conn, trim($data['caste'])) : '';
    $DOB         = isset($data['DOB']) ? trim($data['DOB']) : '';
    $blood       = isset($data['blood']) ? mysqli_real_escape_string($conn, trim($data['blood'])) : '';
    $Ftname      = isset($data['Ftname']) ? mysqli_real_escape_string($conn, trim($data['Ftname'])) : '';
    $Fcontact    = isset($data['Fcontact']) ? mysqli_real_escape_string($conn, trim($data['Fcontact'])) : '';
    $Foccupation = isset($data['Foccupation']) ? mysqli_real_escape_string($conn, trim($data['Foccupation'])) : '';
    $Mtname      = isset($data['Mtname']) ? mysqli_real_escape_string($conn, trim($data['Mtname'])) : '';
    $Mcontact    = isset($data['Mcontact']) ? mysqli_real_escape_string($conn, trim($data['Mcontact'])) : '';
    $Moccupation = isset($data['Moccupation']) ? mysqli_real_escape_string($conn, trim($data['Moccupation'])) : '';
    $Gurdian     = isset($data['Gurdian']) ? mysqli_real_escape_string($conn, trim($data['Gurdian'])) : '';
    $Gcontact    = isset($data['Gcontact']) ? mysqli_real_escape_string($conn, trim($data['Gcontact'])) : '';
    $address     = isset($data['address']) ? mysqli_real_escape_string($conn, trim($data['address'])) : '';
    $POaddress   = isset($data['POaddress']) ? mysqli_real_escape_string($conn, trim($data['POaddress'])) : '';
    $pin         = isset($data['pin']) ? mysqli_real_escape_string($conn, trim($data['pin'])) : '';
    $Dist        = isset($data['Dist']) ? mysqli_real_escape_string($conn, trim($data['Dist'])) : '';
    $State       = isset($data['State']) ? mysqli_real_escape_string($conn, trim($data['State'])) : '';

    if (empty($Fname) || empty($Lname) || empty($class) || $rollno <= 0 || empty($DOB) || empty($blood) || empty($address) || empty($pin) || empty($Dist) || empty($State)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "All mandatory fields (First Name, Last Name, Class, Roll No, DOB, Blood Group, Address, Pin, District, State) are required."]);
        exit();
    }

    $sql = "INSERT INTO students 
        (Fname, Mname, Lname, class, rollno, caste, DOB, blood, Ftname, Fcontact, Foccupation, Mtname, Mcontact, Moccupation, Gurdian, Gcontact, address, POaddress, pin, Dist, State)
        VALUES
        ('$Fname', '$Mname', '$Lname', '$class', $rollno, '$caste', '$DOB', '$blood', '$Ftname', '$Fcontact', '$Foccupation', '$Mtname', '$Mcontact', '$Moccupation', '$Gurdian', '$Gcontact', '$address', '$POaddress', '$pin', '$Dist', '$State')";

    if (mysqli_query($conn, $sql)) {
        $student_id = mysqli_insert_id($conn);
        $query = "SELECT * FROM students WHERE student_id = $student_id";
        $result = mysqli_query($conn, $query);
        $insertedStudent = mysqli_fetch_assoc($result);

        echo json_encode([
            "success" => true,
            "message" => "Student registered successfully!",
            "data" => $insertedStudent
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
