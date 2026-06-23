-- Create Database
CREATE DATABASE IF NOT EXISTS `school_management`;
USE `school_management`;

-- 1. Table structure for login_credentials
DROP TABLE IF EXISTS `login_credentials`;
CREATE TABLE `login_credentials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL,
  `userid` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('Admin', 'Teacher', 'Student', 'Clerk', 'Principal') NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Table structure for students
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `student_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Fname` VARCHAR(50) NOT NULL,
  `Mname` VARCHAR(50) DEFAULT NULL,
  `Lname` VARCHAR(50) NOT NULL,
  `class` VARCHAR(50) NOT NULL,
  `rollno` INT NOT NULL,
  `caste` VARCHAR(50) DEFAULT NULL,
  `DOB` DATE NOT NULL,
  `blood` VARCHAR(10) NOT NULL,
  `Ftname` VARCHAR(100) DEFAULT NULL,
  `Fcontact` VARCHAR(20) DEFAULT NULL,
  `Foccupation` VARCHAR(100) DEFAULT NULL,
  `Mtname` VARCHAR(100) DEFAULT NULL,
  `Mcontact` VARCHAR(20) DEFAULT NULL,
  `Moccupation` VARCHAR(100) DEFAULT NULL,
  `Gurdian` VARCHAR(100) DEFAULT NULL,
  `Gcontact` VARCHAR(20) DEFAULT NULL,
  `address` VARCHAR(255) NOT NULL,
  `POaddress` VARCHAR(100) DEFAULT NULL,
  `pin` VARCHAR(20) NOT NULL,
  `Dist` VARCHAR(100) NOT NULL,
  `State` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Table structure for teachers
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `Fname` VARCHAR(50) NOT NULL,
  `Mname` VARCHAR(50) DEFAULT NULL,
  `Lname` VARCHAR(50) NOT NULL,
  `caste` VARCHAR(50) DEFAULT NULL,
  `DOB` DATE NOT NULL,
  `Phone` VARCHAR(20) NOT NULL,
  `blood` VARCHAR(10) NOT NULL,
  `Ftname` VARCHAR(100) DEFAULT NULL,
  `Fcontact` VARCHAR(20) DEFAULT NULL,
  `Mtname` VARCHAR(100) DEFAULT NULL,
  `Mcontact` VARCHAR(20) DEFAULT NULL,
  `address` VARCHAR(255) DEFAULT NULL,
  `POaddress` VARCHAR(100) DEFAULT NULL,
  `pin` VARCHAR(20) DEFAULT NULL,
  `Dist` VARCHAR(100) DEFAULT NULL,
  `State` VARCHAR(100) DEFAULT NULL,
  `qualification` TEXT DEFAULT NULL,
  `experience` TEXT DEFAULT NULL,
  `classAssign` INT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Table structure for appointments
DROP TABLE IF EXISTS `appointments`;
CREATE TABLE `appointments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `SName` VARCHAR(100) NOT NULL,
  `Class` INT NOT NULL,
  `GName` VARCHAR(100) NOT NULL,
  `number` VARCHAR(20) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- SEED DATA
-- --------------------------------------------------------

-- Seed login_credentials
INSERT INTO `login_credentials` (`username`, `userid`, `password`, `role`) VALUES
('admin', '100', 'admin123', 'Admin'),
('clerk', '101', 'clerk123', 'Clerk'),
('principal', '102', 'principal123', 'Principal'),
('teacher', '103', 'teacher123', 'Teacher'),
('student', '104', 'student123', 'Student');

-- Seed students
INSERT INTO `students` (`Fname`, `Mname`, `Lname`, `class`, `rollno`, `caste`, `DOB`, `blood`, `Ftname`, `Fcontact`, `Foccupation`, `Mtname`, `Mcontact`, `Moccupation`, `address`, `POaddress`, `pin`, `Dist`, `State`) VALUES
('Ankita', NULL, 'Chetry', '5th Grade', 12, 'Gorkha', '2015-05-14', 'O+', 'Ram Chetry', '9876543210', 'Service', 'Rita Chetry', '9876543211', 'Homemaker', 'Jakhalabandha', 'Jakhalabandha', '782136', 'Nagaon', 'Assam'),
('Nashir', NULL, 'Ansari', '6th Grade', 4, 'General', '2014-08-20', 'A+', 'Kalam Ansari', '8765432109', 'Business', 'Saira Ansari', '8765432108', 'Homemaker', 'Rongaloo', 'Rongaloo', '782136', 'Nagaon', 'Assam');

-- Seed teachers
INSERT INTO `teachers` (`Fname`, `Mname`, `Lname`, `caste`, `DOB`, `Phone`, `blood`, `Ftname`, `Fcontact`, `Mtname`, `Mcontact`, `address`, `POaddress`, `pin`, `Dist`, `State`, `qualification`, `experience`, `classAssign`) VALUES
('Manohar', 'Kumar', 'Sharma', 'General', '1990-10-12', '6789685478', 'B+', 'Jitendra Sharma', '9988776655', 'Saraswati Sharma', '9988776644', 'Jakhalabandha', 'Jakhalabandha', '782136', 'Nagaon', 'Assam', 'B.Ed, M.Sc in Mathematics', '7 Years teaching mathematics', 5),
('Umesh', NULL, 'Sangma', 'ST', '1992-04-15', '7002345678', 'O+', 'Late P. Sangma', '9080706050', 'Mimi Sangma', '9080706040', 'Jakhalabandha', 'Jakhalabandha', '782136', 'Nagaon', 'Assam', 'B.Ed, B.Sc in Physics', '7 Years teaching science', 6);

-- Seed appointments
INSERT INTO `appointments` (`SName`, `Class`, `GName`, `number`) VALUES
('Ankita Chetry', 5, 'Ram Chetry', '9876543210'),
('Nashir Ansari', 6, 'Kalam Ansari', '8765432109');
