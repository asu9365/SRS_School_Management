<?php
// connect.php

// Include database connection file
include('db.php');  

// Retrieve form inputs
$username = trim($_POST['username']);
$userid   = trim($_POST['ID']);
$password = trim($_POST['password']);

// Prepare secure SQL statement
$stmt = $conn->prepare("SELECT role, password FROM login_credentials WHERE username = ? AND userid = ?");
$stmt->bind_param("ss", $username, $userid);
$stmt->execute();
$result = $stmt->get_result();

// Check if user exists
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    // Compare password (plain text version — can be upgraded to hashed version)
    if ($password === $row['password']) {
        $role = $row['role'];

        // Redirect user based on their role
        switch ($role) {
            case 'Admin':
                header("Location: ../html/admin_dashboard.html");
                break;
            case 'Teacher':
                header("Location: ../html/teacher_dashboard.html");
                break;
            case 'Student':
                header("Location: ../html/student_dashboard.html");
                break;
            case 'Clerk':
                header("Location: ../html/counter_desk.html");
                break;
            case 'Principal':
                header("Location: ../html/principal_dashboard.html");
                break;
            default:
                echo "<script>alert('Unknown role. Please contact admin.'); window.location.href='login.html';</script>";
        }
        exit();
    } else {
        echo "<script>alert('Invalid password!'); window.location.href='login.html';</script>";
    }
} else {
    echo "<script>alert('Invalid username or ID!'); window.location.href='login.html';</script>";
}

// Close connections
$stmt->close();
$conn->close();
?>
