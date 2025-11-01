<?php
include '../php/db.php'; // ✅ Your database connection file

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data safely
    $SName = mysqli_real_escape_string($conn, $_POST['SName']);
    $Class = (int)$_POST['Class'];
    $GName = mysqli_real_escape_string($conn, $_POST['GName']);
    $number = mysqli_real_escape_string($conn, $_POST['number']);

    // Insert query
    $sql = "INSERT INTO appointments (SName, Class, GName, number)
            VALUES ('$SName', $Class, '$GName', '$number')";

    if (mysqli_query($conn, $sql)) {
        // Show success message and redirect
        echo "
        <!DOCTYPE html>
        <html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <meta http-equiv='refresh' content='3;url=../html/office_hours.html'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Appointment Successful</title>
            <link rel='stylesheet' href='../style/appointment.css'>
        </head>
        <body>
            <div class='success-container'>
                <div class='success-card'>
                    <h2>✅ Appointment Booked Successfully!</h2>
                    <p>Thank you, <strong>$SName</strong>. Your appointment has been recorded.</p>
                    <p>You will be redirected to <a href='../html/office_hours.html'>Office Hours</a> in a few seconds...</p>
                </div>
            </div>
        </body>
        </html>
        ";
    } else {
        echo "<p style='color:red; text-align:center;'>Error: " . mysqli_error($conn) . "</p>";
    }
}

mysqli_close($conn);
?>
