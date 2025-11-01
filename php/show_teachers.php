<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teacher Directory | St. Robert's High School</title>
    <link rel="stylesheet" href="../style/show_teachers.css">
</head>
<body>

    <!-- HEADER -->
    <header class="header">
        <div class="nav_bar">
            <div class="container1">
                <h2>Teachers — St. Robert's High School, Jakhalabandha</h2>
            </div>
        </div>
    </header>

    <?php
    include '../php/db.php'; // ✅ Reuse your DB connection file (recommended)

    $query = "SELECT CONCAT(Fname, ' ', Mname, ' ', Lname) AS Name, classAssign, Phone FROM teachers";
    $result = mysqli_query($conn, $query);

    echo "
    <section class='search-section'>
        <form action='Search_teacher.php' method='post' class='search-form'>
            <input type='text' name='name' id='name' placeholder='Enter Teacher Name' required>
            <input id='Search' type='submit' name='Search' value='Search'>
        </form>
    </section>";

    if (mysqli_num_rows($result) > 0) {
        echo "
        <section class='result-section'>
            <h3>Teacher Directory</h3>
            <div class='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Teacher Name</th>
                            <th>Class Assigned</th>
                            <th>Contact Number</th>
                        </tr>
                    </thead>
                    <tbody>";
        
        while ($row = mysqli_fetch_assoc($result)) {
            echo "
            <tr>
                <td>{$row['Name']}</td>
                <td>{$row['classAssign']}</td>
                <td>{$row['Phone']}</td>
            </tr>";
        }

        echo "
                    </tbody>
                </table>
            </div>
        </section>";
    } else {
        echo "
        <section class='no-results'>
            <h3>No Teachers Found!</h3>
            <p>The teacher list is currently empty. Please add new teacher records.</p>
        </section>";
    }
    ?>

    <div class="mlink">
        <a class="link" href="../html/counter_desk.html">⬅ Back to Counter Desk</a>
    </div>

    <footer class="footer">
        <p>&copy; 2025 St. Robert's High School | All Rights Reserved</p>
    </footer>

</body>
</html>
