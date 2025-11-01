<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Registration Preview | St. Robert's High School</title>
    <link rel="stylesheet" href="../style/upload_student.css">
</head>
<body>

    <!-- HEADER -->
    <header class="header">
        <div class="nav_bar">
            <div class="container1">
                <h2>St. Robert's High School, Jakhalabandha — Student Registration Preview</h2>
            </div>
        </div>
    </header>

<?php
include '../php/db.php'; // ✅ Reuse your DB connection file

if(isset($_POST['submit'])) {
    // Sanitize and assign variables
    $Fname = mysqli_real_escape_string($conn, $_POST['Fname']);
    $Mname = mysqli_real_escape_string($conn, $_POST['Mname']);
    $Lname = mysqli_real_escape_string($conn, $_POST['Lname']);
    $class = mysqli_real_escape_string($conn, $_POST['class']);
    $rollno = (int)$_POST['rollno'];
    $caste = mysqli_real_escape_string($conn, $_POST['caste']);
    $DOB = $_POST['DOB'];
    $blood = mysqli_real_escape_string($conn, $_POST['blood']);
    $Ftname = mysqli_real_escape_string($conn, $_POST['Ftname']);
    $Fcontact = mysqli_real_escape_string($conn, $_POST['Fcontact']);
    $Foccupation = mysqli_real_escape_string($conn, $_POST['Foccupation']);
    $Mtname = mysqli_real_escape_string($conn, $_POST['Mtname']);
    $Mcontact = mysqli_real_escape_string($conn, $_POST['Mcontact']);
    $Moccupation = mysqli_real_escape_string($conn, $_POST['Moccupation']);
    $Gurdian = mysqli_real_escape_string($conn, $_POST['Gurdian']);
    $Gcontact = mysqli_real_escape_string($conn, $_POST['Gcontact']);
    $address = mysqli_real_escape_string($conn, $_POST['address']);
    $POaddress = mysqli_real_escape_string($conn, $_POST['POaddress']);
    $pin = mysqli_real_escape_string($conn, $_POST['pin']);
    $Dist = mysqli_real_escape_string($conn, $_POST['Dist']);
    $State = mysqli_real_escape_string($conn, $_POST['State']);

    // Insert into database
    $sql = "INSERT INTO students 
        (Fname, Mname, Lname, class, rollno, caste, DOB, blood, Ftname, Fcontact, Foccupation, Mtname, Mcontact, Moccupation, Gurdian, Gcontact, address, POaddress, pin, Dist, State)
        VALUES
        ('$Fname', '$Mname', '$Lname', '$class', $rollno, '$caste', '$DOB', '$blood', '$Ftname', '$Fcontact', '$Foccupation', '$Mtname', '$Mcontact', '$Moccupation', '$Gurdian', '$Gcontact', '$address', '$POaddress', '$pin', '$Dist', '$State')";

    if(mysqli_query($conn, $sql)) {
        $student_id = mysqli_insert_id($conn);

        // Fetch inserted record
        $query = "SELECT * FROM students WHERE student_id = $student_id";
        $result = mysqli_query($conn, $query);

        if(mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);

            echo "
            <section class='result-section'>
                <h3>Student Registration Preview</h3>
                <div class='table-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>Field</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>";
            
            foreach($row as $key => $value) {
                echo "
                            <tr>
                                <td>".htmlspecialchars($key)."</td>
                                <td>".htmlspecialchars($value)."</td>
                            </tr>";
            }

            echo "
                        </tbody>
                    </table>
                </div>
            </section>";
        }
    } else {
        echo "<p style='color:red; text-align:center;'>Error: ".mysqli_error($conn)."</p>";
    }
}
mysqli_close($conn);
?>

    <div class="mlink">
        <a class="link" href="../html/counter_desk.html">⬅ Back</a>
    </div>

    <!-- FOOTER -->
    <footer class="footer">
        <p>&copy; 2025 St. Robert's High School | All Rights Reserved</p>
    </footer>

</body>
</html>
