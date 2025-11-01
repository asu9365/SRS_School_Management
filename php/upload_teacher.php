<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teacher Registration Preview | St. Robert's High School</title>
    <link rel="stylesheet" href="../style/upload_teacher.css">
</head>
<body>

    <!-- HEADER -->
    <header class="header">
        <div class="nav_bar">
            <div class="container1">
                <h2>St. Robert's High School, Jakhalabandha — Teacher Registration Preview</h2>
            </div>
        </div>
    </header>

<?php
include '../php/db.php'; // Use your DB connection

if(isset($_POST['submit'])) {
    // Sanitize POST data
    $Fname = mysqli_real_escape_string($conn, $_POST['Fname']);
    $Mname = mysqli_real_escape_string($conn, $_POST['Mname']);
    $Lname = mysqli_real_escape_string($conn, $_POST['Lname']);
    $caste = mysqli_real_escape_string($conn, $_POST['caste']);
    $DOB = $_POST['DOB'];
    $Phone = mysqli_real_escape_string($conn, $_POST['Phone']);
    $blood = mysqli_real_escape_string($conn, $_POST['blood']);
    $Ftname = mysqli_real_escape_string($conn, $_POST['Ftname']);
    $Fcontact = mysqli_real_escape_string($conn, $_POST['Fcontact']);
    $Mtname = mysqli_real_escape_string($conn, $_POST['Mtname']);
    $Mcontact = mysqli_real_escape_string($conn, $_POST['Mcontact']);
    $address = mysqli_real_escape_string($conn, $_POST['address']);
    $POaddress = mysqli_real_escape_string($conn, $_POST['POaddress']);
    $pin = mysqli_real_escape_string($conn, $_POST['pin']);
    $Dist = mysqli_real_escape_string($conn, $_POST['Dist']);
    $State = mysqli_real_escape_string($conn, $_POST['State']);
    $qualification = mysqli_real_escape_string($conn, $_POST['qualification']);
    $experience = mysqli_real_escape_string($conn, $_POST['experience']);
    $classAssign = (int)$_POST['classAssign'];

    // Insert into database
    $sql = "INSERT INTO teachers 
        (Fname, Mname, Lname, caste, DOB, Phone, blood, Ftname, Fcontact, Mtname, Mcontact, address, POaddress, pin, Dist, State, qualification, experience, classAssign)
        VALUES
        ('$Fname', '$Mname', '$Lname', '$caste', '$DOB', '$Phone', '$blood', '$Ftname', '$Fcontact', '$Mtname', '$Mcontact', '$address', '$POaddress', '$pin', '$Dist', '$State', '$qualification', '$experience', $classAssign)";

    if(mysqli_query($conn, $sql)) {
        $teacher_id = mysqli_insert_id($conn);

        // Fetch inserted record
        $query = "SELECT * FROM teachers WHERE id = $teacher_id";
        $result = mysqli_query($conn, $query);
        $row = mysqli_fetch_assoc($result);

        echo "<section class='result-section'>";
        echo "<h3>Teacher Registration Preview</h3>";

        // --- Personal Info ---
        echo "<div class='preview-section'><h4>Personal Info</h4><table>";
        echo "<tr><th>First Name</th><td>{$row['Fname']}</td></tr>";
        echo "<tr><th>Middle Name</th><td>{$row['Mname']}</td></tr>";
        echo "<tr><th>Last Name</th><td>{$row['Lname']}</td></tr>";
        echo "<tr><th>Caste</th><td>{$row['caste']}</td></tr>";
        echo "<tr><th>Date of Birth</th><td>{$row['DOB']}</td></tr>";
        echo "<tr><th>Phone</th><td>{$row['Phone']}</td></tr>";
        echo "<tr><th>Blood Group</th><td>{$row['blood']}</td></tr>";
        echo "</table></div>";

        // --- Parent Info ---
        echo "<div class='preview-section'><h4>Parent Info</h4><table>";
        echo "<tr><th>Father's Name</th><td>{$row['Ftname']}</td></tr>";
        echo "<tr><th>Father's Contact</th><td>{$row['Fcontact']}</td></tr>";
        echo "<tr><th>Mother's Name</th><td>{$row['Mtname']}</td></tr>";
        echo "<tr><th>Mother's Contact</th><td>{$row['Mcontact']}</td></tr>";
        echo "</table></div>";

        // --- Address Info ---
        echo "<div class='preview-section'><h4>Address Details</h4><table>";
        echo "<tr><th>Village/Town</th><td>{$row['address']}</td></tr>";
        echo "<tr><th>P.O</th><td>{$row['POaddress']}</td></tr>";
        echo "<tr><th>Pin Code</th><td>{$row['pin']}</td></tr>";
        echo "<tr><th>District</th><td>{$row['Dist']}</td></tr>";
        echo "<tr><th>State</th><td>{$row['State']}</td></tr>";
        echo "</table></div>";

        // --- Qualification & Experience ---
        echo "<div class='preview-section'><h4>Qualification & Experience</h4><table>";
        echo "<tr><th>Qualification</th><td>{$row['qualification']}</td></tr>";
        echo "<tr><th>Experience</th><td>{$row['experience']}</td></tr>";
        echo "</table></div>";

        // --- Class Assigned ---
        echo "<div class='preview-section'><h4>Class Assigned</h4><table>";
        echo "<tr><th>Class Number</th><td>{$row['classAssign']}</td></tr>";
        echo "</table></div>";

        echo "</section>";
    } else {
        echo "<p style='color:red; text-align:center;'>Error: ".mysqli_error($conn)."</p>";
    }
}
mysqli_close($conn);
?>

    <div class="mlink">
        <a class="link" href="form_teacher.html">⬅ Back to Teacher Registration</a>
    </div>

    <!-- FOOTER -->
    <footer class="footer">
        <p>&copy; 2025 St. Robert's High School | All Rights Reserved</p>
    </footer>

</body>
</html>
