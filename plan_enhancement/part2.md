# Part 2 — Functional Requirements, Non-Functional Requirements & Access Control

---

# Functional Requirements

Functional requirements define the features and capabilities that SchoolOS must provide to its users.

---

# FR-01 Authentication & Authorization

## Objective

Provide secure access to the platform using Role-Based Access Control (RBAC).

### Features

* User Registration (Admin-controlled)
* Secure Login
* Logout
* Password Reset
* Session Management
* Remember Me
* Multi-role Authentication
* Sanctum Token Authentication
* Role & Permission Management
* Account Locking after Failed Attempts
* Email Verification (Optional)

### Actors

* Student
* Parent
* Teacher
* Principal
* Admin
* Super Admin

---

# FR-02 Student Information System (SIS)

The platform shall maintain a centralized digital record for every student.

## Student Profile

* Admission Number
* Roll Number
* Personal Information
* Guardian Details
* Emergency Contact
* Medical Information
* Previous Academic History
* Blood Group
* Address
* Photograph
* Documents

### Operations

* Create Student
* Update Student
* Transfer Student
* Promote Student
* Archive Student
* Alumni Conversion

---

# FR-03 Academic Management

The system shall manage academic structure.

### Features

* Academic Sessions
* Terms
* Classes
* Sections
* Subjects
* Curriculum
* Teacher Allocation
* Timetable

---

# FR-04 Attendance Management

The system shall support attendance recording.

### Student Attendance

* Daily
* Half Day
* Late Entry
* Medical Leave
* Approved Leave
* Holiday

### Teacher Attendance

* Present
* Leave
* Late

### Reports

* Daily
* Weekly
* Monthly
* Annual
* Attendance Percentage
* Low Attendance Alerts

---

# FR-05 Assignment Management

Teachers shall create digital assignments.

Features

* Draft Assignment
* Publish Assignment
* File Attachments
* Due Date
* Student Submission
* Resubmission
* Grading
* Feedback
* Rubric Based Evaluation

Parents can monitor

* Completion Rate
* Pending Work
* Submission History

---

# FR-06 Assessment Management

Support all academic assessments.

Assessment Types

* Quiz
* Homework
* Assignment
* Practical
* Lab
* Project
* Unit Test
* Mid-Term
* Final Examination
* Viva
* Oral Assessment

Each assessment supports

* Maximum Marks
* Passing Marks
* Weightage
* Rubrics
* Competencies
* Subject Outcomes

---

# FR-07 Gradebook

Teachers can

* Enter Marks
* Bulk Upload Marks
* Moderate Marks
* Lock Marks
* Publish Results

Students

* View Results
* Download Report Card

Parents

* Monitor Progress

---

# FR-08 Homework Engine

Features

* Daily Homework
* Weekly Homework
* Attachments
* Subject Filtering
* Submission
* Teacher Feedback

---

# FR-09 Competency Tracking

Track learning outcomes.

Example

Mathematics

* Algebra
* Geometry
* Probability
* Statistics

English

* Grammar
* Writing
* Reading
* Speaking

Science

* Physics
* Chemistry
* Biology

Analytics

* Mastery Percentage
* Radar Chart
* Weak Areas
* Improvement Suggestions

---

# FR-10 Student 360

Every student shall have a comprehensive profile.

Includes

* Academics
* Attendance
* Assignments
* Competencies
* Portfolio
* Achievements
* Behaviour
* Meetings
* Documents
* Health Records
* AI Insights

---

# FR-11 Communication Hub

Communication Types

* Notices
* Circulars
* Classroom Updates
* Announcements
* Events
* Messaging
* Broadcasts

Supported Channels

* Email
* SMS
* Push Notification
* In-App Notification

---

# FR-12 Parent Engagement

Parents can

* View Attendance
* View Marks
* View Homework
* Receive Notices
* Schedule PTM
* Join Virtual Meetings
* Download Reports
* Pay Fees
* Chat with Teachers

---

# FR-13 Teacher Workspace

Teachers shall manage

* Attendance
* Homework
* Assessments
* Marks
* Lesson Plans
* Student Analytics
* Communication
* PTM

---

# FR-14 Principal Dashboard

Principal shall monitor

* School Attendance
* Teacher Performance
* Academic KPIs
* Class Comparison
* Student Success Index
* AI Risk Reports

---

# FR-15 Administration

Administration manages

* Admissions
* Fees
* Users
* Staff
* Timetable
* Transport
* Library
* Inventory
* Documents
* Reports

---

# FR-16 AI Intelligence

Artificial Intelligence provides

* Risk Prediction
* Attendance Prediction
* Performance Forecast
* AI Report Comments
* PTM Summaries
* Personalized Recommendations
* Behaviour Insights
* Parent Alerts

---

# FR-17 Multi-Tenant SaaS

Super Admin can

* Create Schools
* Suspend Schools
* Manage Subscriptions
* Configure Branding
* Provision Admin Accounts
* View Platform Analytics

---

# Non-Functional Requirements

## Performance

* Page load < 2 seconds
* API response < 300 ms
* Dashboard < 1 second
* Reports < 5 seconds

---

## Scalability

Support

* 100+ Schools
* 50,000+ Students
* 5,000+ Teachers
* Millions of Records

---

## Availability

Target Uptime

99.9%

---

## Reliability

* Daily Backups
* Disaster Recovery
* Audit Logs
* Version History

---

## Security

* HTTPS Everywhere
* Laravel Sanctum
* RBAC
* CSRF Protection
* XSS Protection
* SQL Injection Protection
* Rate Limiting
* Audit Logging
* Password Hashing
* Encryption at Rest

---

## Usability

Responsive

Desktop

Tablet

Mobile

Dark Mode

Accessibility Support

---

## Maintainability

* Modular Code
* SOLID Principles
* Repository Pattern
* Service Layer
* Event Driven Design

---

## Extensibility

Every module must support

* API Extensions
* Plugin Architecture
* Future Mobile Apps

---

# User Roles

| Role              | Description                  |
| ----------------- | ---------------------------- |
| Super Admin       | Platform Owner               |
| School Admin      | School Administrator         |
| Principal         | School Head                  |
| Vice Principal    | Optional                     |
| Teacher           | Academic Staff               |
| Class Teacher     | Teacher with Class Ownership |
| Accountant        | Fee Management               |
| Librarian         | Library Management           |
| Transport Manager | Vehicle Management           |
| Counselor         | Student Wellness             |
| Parent            | Guardian Portal              |
| Student           | Student Portal               |

---

# RBAC Permission Matrix

| Module          | Student   | Parent     | Teacher    | Principal | Admin    | Super Admin |
| --------------- | --------- | ---------- | ---------- | --------- | -------- | ----------- |
| Dashboard       | ✓         | ✓          | ✓          | ✓         | ✓        | ✓           |
| Attendance      | View      | View       | Manage     | View      | Manage   | All         |
| Marks           | View      | View       | Manage     | View      | Manage   | All         |
| Homework        | Submit    | View       | Manage     | View      | Manage   | All         |
| Student Records | View Self | View Child | View Class | View All  | Manage   | All         |
| Reports         | View      | View       | Generate   | Generate  | Generate | All         |
| Messaging       | ✓         | ✓          | ✓          | ✓         | ✓        | ✓           |
| PTM             | Join      | Join       | Manage     | View      | Manage   | All         |
| Fees            | View      | Pay        | -          | View      | Manage   | All         |
| Users           | -         | -          | -          | View      | Manage   | All         |
| Schools         | -         | -          | -          | -         | -        | Manage      |

---

# Business Rules

## Student

* One student belongs to one school.
* One student belongs to one active class per academic session.
* A student may have multiple guardians.

## Parent

* A parent may be linked to multiple students.
* Parents cannot edit academic records.

## Teacher

* Teachers can only modify data for assigned classes and subjects.
* Published marks cannot be edited without administrative approval.

## Attendance

* Attendance can only be recorded once per day.
* Attendance becomes locked after a configurable deadline.

## Assessments

* Marks cannot exceed maximum marks.
* Results cannot be published until approved.

## Communication

* Only authorized users may issue school-wide notices.
* Classroom updates are visible only to the relevant class.

## AI

* AI recommendations are advisory and require human review before official action.

---

# Feature Dependency Map

```text
Authentication
        │
        ▼
Student Information System
        │
        ├────────► Attendance
        ├────────► Homework
        ├────────► Assessments
        ├────────► Student 360
        ├────────► Communication
        ├────────► Analytics
        └────────► AI Intelligence

Administration
        │
        ├────────► Users
        ├────────► Timetable
        ├────────► Fees
        ├────────► Transport
        └────────► Reports

Multi-Tenant SaaS
        │
        └────────► School Provisioning & Platform Management
```

---

## Deliverables of Part 2

* Comprehensive Functional Requirements
* Non-Functional Requirements
* User Role Definitions
* RBAC Permission Matrix
* Core Business Rules
* Feature Dependency Map

These requirements form the functional contract for the entire SchoolOS platform and serve as the basis for architecture, database design, API development, and testing.
