# Part 6 — Attendance Management System

---

# 6.1 Overview

The Attendance Management System (AMS) is a core component of SchoolOS that records, manages, analyzes, and reports the attendance of students and staff.

Unlike traditional attendance registers, SchoolOS Attendance is designed as an intelligent attendance platform that integrates with:

* Student Information System (SIS)
* Teacher Portal
* Parent Portal
* Student Portal
* Student 360
* AI Risk Prediction
* Timetable
* Notifications
* Reports & Analytics

The system supports manual attendance today while remaining ready for QR Code, RFID, NFC, biometric devices, and facial recognition in future releases.

---

# 6.2 Objectives

The Attendance Management System aims to:

* Digitize attendance recording.
* Eliminate manual attendance registers.
* Notify parents immediately about absences.
* Generate attendance analytics.
* Improve transparency.
* Detect attendance-related academic risks.
* Support government and institutional reporting.

---

# 6.3 Attendance Types

## Student Attendance

Supported statuses:

* Present (P)
* Absent (A)
* Late (L)
* Half Day (HD)
* Medical Leave (ML)
* Approved Leave (AL)
* On Duty (OD)
* Holiday (H)
* Weekend (W)

---

## Teacher Attendance

Supported statuses:

* Present
* Absent
* Leave
* Half Day
* Official Duty
* Training
* Holiday

---

## Staff Attendance

Supports both teaching and non-teaching staff.

---

# 6.4 Attendance Recording Methods

## Manual Attendance

Teacher marks attendance through the class attendance page.

---

## QR Code Attendance (Future)

Students scan a QR code generated for each class period.

---

## RFID Attendance (Future)

Attendance automatically captured when students enter the campus.

---

## Biometric Attendance (Future)

Fingerprint or biometric devices synchronize with SchoolOS.

---

## Facial Recognition (Future)

AI-based classroom attendance using cameras.

---

# 6.5 Daily Attendance Workflow

```text
Teacher Login
      │
Select Class
      │
Select Section
      │
Choose Date
      │
System Loads Student List
      │
Teacher Marks Attendance
      │
Validation
      │
Attendance Saved
      │
Notifications Sent
      │
Student360 Updated
      │
Analytics Updated
```

---

# 6.6 Attendance Rules

Attendance can only be marked once per class per day.

Teachers may edit attendance only before the configured cutoff time.

After the cutoff:

* Attendance becomes locked.
* Only Admin or Principal may unlock it.

---

# 6.7 Leave Management

Students may apply for leave through:

* Student Portal
* Parent Portal

Workflow

```text
Leave Application
      │
Teacher Review
      │
Approve / Reject
      │
Attendance Updated
      │
Parent Notification
```

---

Leave Types

* Sick Leave
* Casual Leave
* Emergency Leave
* Sports Leave
* Competition Leave
* Official Leave

---

# 6.8 Attendance Dashboard

## Student Dashboard

Displays:

* Today's Status
* Monthly Attendance
* Attendance Percentage
* Leave Balance
* Attendance Calendar
* AI Attendance Score

---

## Parent Dashboard

Displays:

* Child Attendance
* Daily Status
* Monthly Trend
* Late Arrivals
* Leave History
* Attendance Warnings

---

## Teacher Dashboard

Displays:

* Pending Attendance
* Today's Classes
* Low Attendance Students
* Leave Requests
* Attendance Completion Rate

---

## Principal Dashboard

Displays:

* School Attendance
* Class-wise Attendance
* Teacher Attendance
* Daily Summary
* Monthly Trends
* High-Risk Students

---

# 6.9 Attendance Analytics

System automatically generates:

## Daily Reports

* Present Count
* Absent Count
* Leave Count

---

## Monthly Reports

* Attendance Percentage
* Absent Days
* Late Arrivals

---

## Annual Reports

* Total Working Days
* Total Present
* Total Leave
* Attendance Percentage

---

## Class Analytics

* Highest Attendance
* Lowest Attendance
* Average Attendance
* Attendance Distribution

---

# 6.10 Attendance Alerts

Automatic alerts generated when:

* Student absent today
* Three consecutive absences
* Attendance below 90%
* Attendance below 80%
* Attendance below 75%
* Excessive late arrivals

Alerts are sent to:

* Parent
* Class Teacher
* Principal (if required)

---

# 6.11 Attendance Calendar

Every student has a visual calendar.

Legend

🟢 Present

🔴 Absent

🟡 Leave

🟠 Late

🔵 Holiday

---

# 6.12 Integration with Student360

Attendance contributes to:

* Student Success Index
* Risk Prediction
* Student Timeline
* Parent Reports
* Academic Analytics

Timeline Example

```text
12 Jul

Present

↓

13 Jul

Absent

↓

14 Jul

Medical Leave

↓

15 Jul

Present
```

---

# 6.13 AI Attendance Insights

Artificial Intelligence detects:

* Frequent absences
* Attendance decline
* Examination absentee risk
* Performance correlation
* Chronic absenteeism
* Predicted dropout risk

Example

> Attendance has dropped from 96% to 81% over the last two months. Academic performance may decline if the trend continues.

---

# 6.14 Attendance Reports

Reports available:

* Student Attendance Report
* Class Attendance Report
* Teacher Attendance Report
* School Attendance Report
* Defaulter Report
* Monthly Summary
* Annual Summary

Export formats:

* PDF
* Excel
* CSV

---

# 6.15 Database Design

Core Tables

```text
attendance_sessions
attendance_records
attendance_statuses
attendance_logs
attendance_settings
leave_requests
leave_types
leave_approvals
teacher_attendance
staff_attendance
attendance_notifications
attendance_statistics
```

Relationships

```text
Student
     │
Attendance Record
     │
Attendance Session
     │
Teacher
     │
Academic Session
```

---

# 6.16 API Endpoints

## Attendance

```http
GET    /api/attendance

POST   /api/attendance

PUT    /api/attendance/{id}

DELETE /api/attendance/{id}
```

---

## Leave

```http
POST /api/leaves

GET /api/leaves

PUT /api/leaves/{id}/approve

PUT /api/leaves/{id}/reject
```

---

## Reports

```http
GET /api/attendance/reports/student

GET /api/attendance/reports/class

GET /api/attendance/reports/school
```

---

# 6.17 User Interface

Administrator

* Attendance Dashboard
* Attendance Reports
* Attendance Settings
* Leave Approval
* Analytics

Teacher

* Take Attendance
* Edit Attendance
* Leave Approval
* Attendance History

Student

* Attendance Calendar
* Leave Application
* Attendance Summary

Parent

* Child Attendance
* Attendance Analytics
* Leave Status
* Notifications

Principal

* School Attendance Dashboard
* Class Comparison
* Attendance Trends
* Defaulter Monitoring

---

# 6.18 Permissions

| Action                | Student | Parent  | Teacher | Principal | Admin |
| --------------------- | ------- | ------- | ------- | --------- | ----- |
| View Own Attendance   | ✓       | -       | -       | ✓         | ✓     |
| View Child Attendance | -       | ✓       | -       | ✓         | ✓     |
| Mark Attendance       | -       | -       | ✓       | ✓         | ✓     |
| Edit Attendance       | -       | -       | Limited | ✓         | ✓     |
| Approve Leave         | -       | -       | ✓       | ✓         | ✓     |
| View Reports          | -       | Limited | ✓       | ✓         | ✓     |
| Configure Attendance  | -       | -       | -       | -         | ✓     |

---

# 6.19 Business Rules

* Attendance can only be recorded once per class and period.
* Future attendance cannot be entered.
* Holidays are auto-generated from the academic calendar.
* Leave approval automatically updates attendance records.
* Attendance modifications are logged in the audit trail.
* Attendance contributes to the Student Success Index.
* AI uses attendance data for risk prediction.

---

# 6.20 KPIs

The Attendance System tracks:

* Daily Attendance %
* Monthly Attendance %
* Yearly Attendance %
* Teacher Attendance %
* Chronic Absenteeism Rate
* Late Arrival Rate
* Leave Approval Rate
* Attendance Compliance
* Student Attendance Ranking

---

# 6.21 Future Enhancements

* QR Code Attendance
* RFID Integration
* NFC Smart Cards
* Facial Recognition
* Fingerprint Scanner Integration
* GPS Bus Attendance
* Classroom IoT Devices
* Smart Attendance Kiosk
* Geofenced Mobile Attendance
* AI Face Verification

---

# Deliverables

The Attendance Management System provides:

* Digital attendance recording
* Leave management
* Parent notifications
* Attendance analytics
* AI-powered attendance insights
* Student360 integration
* Comprehensive reporting
* Secure APIs
* Audit logging
* Future-ready architecture for biometric and smart attendance systems

This module forms one of the primary data sources for Student Success Analytics and enables proactive intervention for attendance-related academic risks.
