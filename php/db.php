<?php
$servername = "localhost";   // XAMPP default
$username = "root";          // Default MySQL user
$password = "";              // Default has no password
$database = "school_management";     // Your database name
$port = 3307; 
// Create connection
$conn = new mysqli($servername, $username, $password, $database, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// echo "✅ Connected successfully";
?>

<!-- 

$servername = "sql302.infinityfree.com";
$username = "if0_40311218";
$password = "3Er8RLVC9MSo";
$database = "if0_40311218_school_management"; 

-->
