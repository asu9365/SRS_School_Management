<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search Student | St. Robert’s High School</title>
    <link rel="stylesheet" href="../style/search_student.css">
</head>
<body>

<header class="header">
    <div class="nav_bar">
        <h2>Search Student — St. Robert's High School</h2>
    </div>
</header>
<!-- 
<section class="search-section">
    <form action="" method="GET">
        <input type="text" name="name" placeholder="Enter Student Name..." required>
        <button type="submit">Search</button>
    </form>
</section> -->

<?php
include 'db.php'; // ✅ your database connection file

if (isset($_POST['name'])) {
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $query = "SELECT * FROM students WHERE Fname LIKE '%$name%' OR Lname LIKE '%$name%' ORDER BY class ASC";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) > 0) {
        echo "
        <section class='result-section'>
            <h3>Search Results</h3>
            <div class='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Roll No</th>
                            <th>Class</th>
                            <th>Full Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
        ";

        while ($row = mysqli_fetch_assoc($result)) {
            $fullName = htmlspecialchars($row['Fname'] . ' ' . $row['Mname'] . ' ' . $row['Lname']);
            echo "
            <tr>
                <td>{$row['rollno']}</td>
                <td>{$row['class']}</td>
                <td>$fullName</td>
                <td><button class='view-btn' onclick='showDetails(" . json_encode($row) . ")'>View Details</button></td>
            </tr>
            ";
        }

        echo "
                    </tbody>
                </table>
            </div>
        </section>";
    } else {
        echo "<p class='no-result'>No students found with that name.</p>";
    }

    mysqli_close($conn);
}
?>

<!-- Popup Modal -->
<div id="popup" class="popup">
    <div class="popup-content">
        <span class="close-btn" onclick="closePopup()">&times;</span>
        <h3>Student Details</h3>
        <div id="studentDetails"></div>
    </div>
</div>

<script>
function showDetails(student) {
    const popup = document.getElementById('popup');
    const details = document.getElementById('studentDetails');

    details.innerHTML = `
        <p><strong>Name:</strong> ${student.Fname} ${student.Mname || ''} ${student.Lname}</p>
        <p><strong>Class:</strong> ${student.class}</p>
        <p><strong>Roll No:</strong> ${student.rollno}</p>
        <p><strong>Caste:</strong> ${student.caste || 'N/A'}</p>
        <p><strong>DOB:</strong> ${student.DOB}</p>
        <p><strong>Blood Group:</strong> ${student.blood}</p>
        <p><strong>Father's Name:</strong> ${student.Ftname}</p>
        <p><strong>Mother's Name:</strong> ${student.Mtname}</p>
        <p><strong>Guardian:</strong> ${student.Gurdian || 'N/A'}</p>
        <p><strong>Address:</strong> ${student.address}, ${student.POaddress || ''}, ${student.Dist}, ${student.State}</p>
        <p><strong>Contact No:</strong> ${student.Fcontact || student.Mcontact || student.Gcontact || 'N/A'}</p>
    `;
    popup.style.display = "flex";
}

function closePopup() {
    document.getElementById('popup').style.display = "none";
}

// Close when clicking outside popup
window.onclick = function(e) {
    const popup = document.getElementById('popup');
    if (e.target == popup) popup.style.display = "none";
};
</script>

</body>
</html>
