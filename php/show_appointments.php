<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointments | St. Robert's High School</title>
    <link rel="stylesheet" href="../style/show_appointments.css">
</head>
<body>

    <!-- HEADER -->
    <header class="header">
        <div class="nav_bar">
            <div class="container1">
                <h2>Appointments — St. Robert's High School, Jakhalabandha</h2>
            </div>
        </div>
    </header>

<?php
    include 'db.php'; // ✅ Using your connection file

    // Fetch appointments (latest first)
    $query = "SELECT * FROM appointments ORDER BY id DESC";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        echo "
        <section class='result-section'>
            <h3>Recent Appointments</h3>
            <div class='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Class</th>
                            <th>Guardian Name</th>
                            <th>Phone Number</th>
                            <th>Booking Date</th>
                            <th>Booking Time</th>
                        </tr>
                    </thead>
                    <tbody>
        ";

        while ($row = mysqli_fetch_assoc($result)) {
            // ✅ Safely handle and format datetime
            $datetime = strtotime($row['created_at']);
            $date = date("d M Y", $datetime);  // Example: 11 Oct 2025
            $time = date("h:i A", $datetime);  // Example: 09:25 PM

            echo "
                <tr>
                    <td>" . htmlspecialchars($row['SName']) . "</td>
                    <td>" . htmlspecialchars($row['Class']) . "</td>
                    <td>" . htmlspecialchars($row['GName']) . "</td>
                    <td>" . htmlspecialchars($row['number']) . "</td>
                    <td>$date</td>
                    <td>$time</td>
                </tr>
            ";
        }

        echo "
                    </tbody>
                </table>
            </div>
        </section>
        ";
    } else {
        echo "
        <section class='no-results'>
            <h3>No Appointments Found</h3>
            <p>There are currently no pending or booked appointments.</p>
        </section>
        ";
    }

    mysqli_close($conn);
?>

    <div class='mlink'>
        <a class='link' href='../html/counter_desk.html'>⬅ Back to Counter Desk</a>
    </div>

    <footer class='footer'>
        <p>&copy; 2025 St. Robert's High School | All Rights Reserved</p>
    </footer>

</body>
</html>
