# Part 5 — Student Information System (SIS)

---

# 5.1 Overview

The Student Information System (SIS) is the heart of SchoolOS. It manages the complete lifecycle of every student, from admission to graduation and alumni status.

Every student has a unique digital identity that connects academic records, attendance, assessments, communication, health information, behavior, achievements, and parent relationships.

The SIS serves as the single source of truth for all student-related information.

---

# 5.2 Objectives

The Student Information System aims to:

* Digitize the complete admission process.
* Maintain a centralized student database.
* Manage student promotions and transfers.
* Store academic and personal information.
* Track the student's educational journey.
* Support analytics and AI recommendations.
* Provide secure access to authorized users.

---

# 5.3 Student Lifecycle

```text
Admission Enquiry
        │
Application Submission
        │
Document Verification
        │
Admission Approval
        │
Student ID Generation
        │
Class & Section Allocation
        │
Parent Linking
        │
Academic Journey
        │
Promotion / Transfer
        │
Graduation
        │
Alumni
```

---

# 5.4 Student Profile

Every student has a unified profile.

## Personal Information

* Admission Number
* Student ID
* Roll Number
* Full Name
* Photograph
* Gender
* Date of Birth
* Blood Group
* Nationality
* Aadhaar Number (Optional)
* Religion (Configurable)
* Category (General/OBC/SC/ST etc.)
* Mother Tongue

---

## Contact Information

* Permanent Address
* Current Address
* City
* State
* PIN Code
* Email
* Mobile Number

---

## Academic Information

* Academic Session
* Admission Date
* Class
* Section
* Roll Number
* House
* Stream (Higher Secondary)
* Elective Subjects

---

## Parent & Guardian Information

Each student may have multiple guardians.

Examples

* Father
* Mother
* Legal Guardian
* Local Guardian

For each guardian:

* Name
* Relationship
* Occupation
* Employer
* Annual Income (Optional)
* Phone Number
* Email
* Address
* Emergency Contact
* Preferred Communication Method

---

## Medical Information

* Blood Group
* Allergies
* Chronic Illness
* Disabilities
* Current Medications
* Vaccination Records
* Medical Notes
* Emergency Instructions
* Doctor Contact

---

## Identity Documents

* Birth Certificate
* Aadhaar
* Passport (Optional)
* Transfer Certificate
* Migration Certificate
* Previous Marksheet
* Caste Certificate
* Income Certificate
* Disability Certificate
* Photograph

---

# 5.5 Admission Workflow

### Step 1

Admission enquiry is created.

↓

### Step 2

Application form submitted.

↓

### Step 3

Documents uploaded.

↓

### Step 4

Admission committee verification.

↓

### Step 5

Application approved/rejected.

↓

### Step 6

Student record created.

↓

### Step 7

Student ID generated.

↓

### Step 8

Class allocated.

↓

### Step 9

Guardian linked.

↓

### Step 10

Login credentials generated.

---

# 5.6 Student Status

Every student must have a current status.

Available statuses:

* Applicant
* Pending Verification
* Approved
* Active
* On Leave
* Suspended
* Transferred
* Graduated
* Alumni
* Withdrawn
* Expelled
* Archived

---

# 5.7 Student ID Generation

Example Format

```text
SRHS-2026-000245
```

Where

* SRHS = School Code
* 2026 = Admission Year
* 000245 = Auto Increment

Student IDs are immutable.

---

# 5.8 Roll Number Generation

Generated every academic session.

Example

```text
VIII-A-023
```

Roll numbers may change after promotion, unlike Student IDs.

---

# 5.9 Promotion Workflow

```text
Academic Year Ends

↓

Result Finalized

↓

Promotion Committee

↓

Promote Student

↓

Assign New Class

↓

Generate Roll Number

↓

Archive Previous Academic Record

↓

Activate New Session
```

---

# 5.10 Transfer Workflow

Internal Transfer

* Class Change
* Section Change

External Transfer

* Generate Transfer Certificate
* Archive Academic Records
* Export Student Data

---

# 5.11 Student Timeline

Every important event is recorded.

Examples

Admission

↓

Attendance Recorded

↓

Homework Submitted

↓

Assessment Published

↓

Certificate Awarded

↓

Parent Meeting

↓

Behaviour Observation

↓

Promotion

↓

Graduation

This timeline powers the Student 360 module.

---

# 5.12 Student Search

Search By

* Name
* Admission Number
* Student ID
* Roll Number
* Parent Name
* Mobile Number
* Class
* Section
* House
* Status

Supports:

* Filters
* Sorting
* Pagination
* Global Search

---

# 5.13 Student Dashboard

Displays

* Attendance Summary
* Academic Performance
* Homework
* Assignments
* Upcoming Exams
* Notices
* Achievements
* Competency Progress
* Behaviour Summary
* Student Success Index

---

# 5.14 Student Documents

Supported Files

* PDF
* JPG
* PNG
* DOCX

Document Categories

* Identity
* Academic
* Medical
* Financial
* Certificates
* Miscellaneous

Features

* Version History
* Download
* Replace
* Expiry Tracking
* Secure Access

---

# 5.15 Database Entities

Core Tables

```text
students
student_profiles
student_contacts
student_addresses
student_medical
student_documents
student_statuses
student_promotions
student_transfers
student_houses
student_guardians
guardian_student
student_timeline
student_notes
student_tags
student_custom_fields
```

---

# 5.16 Relationships

```text
Student

├── Profile

├── Address

├── Medical

├── Guardians

├── Documents

├── Attendance

├── Homework

├── Assessments

├── Behaviour

├── Achievements

├── Student360

├── AI Insights

└── Timeline
```

---

# 5.17 API Endpoints

## Student Management

```http
GET    /api/students

POST   /api/students

GET    /api/students/{id}

PUT    /api/students/{id}

DELETE /api/students/{id}
```

---

## Admission

```http
POST /api/admissions

GET /api/admissions

PUT /api/admissions/{id}/approve

PUT /api/admissions/{id}/reject
```

---

## Promotion

```http
POST /api/students/promote

POST /api/students/bulk-promote
```

---

## Transfer

```http
POST /api/students/transfer
```

---

## Documents

```http
POST /api/students/{id}/documents

DELETE /api/students/{id}/documents/{doc}
```

---

# 5.18 UI Pages

Administrator

* Student List
* Admission Dashboard
* Student Details
* Promotion
* Transfer
* Documents
* Timeline

Teacher

* Class Students
* Student Profile
* Behaviour Notes

Parent

* Child Profile
* Documents
* Academic Summary

Student

* My Profile
* Documents
* Academic History

---

# 5.19 Permissions

| Action                 | Student | Parent  | Teacher | Admin | Principal |
| ---------------------- | ------- | ------- | ------- | ----- | --------- |
| View Own Profile       | ✓       | -       | -       | ✓     | ✓         |
| View Child Profile     | -       | ✓       | -       | ✓     | ✓         |
| View Assigned Students | -       | -       | ✓       | ✓     | ✓         |
| Create Student         | -       | -       | -       | ✓     | ✓         |
| Edit Student           | -       | -       | Limited | ✓     | ✓         |
| Delete Student         | -       | -       | -       | ✓     | ✓         |
| Promote Student        | -       | -       | -       | ✓     | ✓         |
| Transfer Student       | -       | -       | -       | ✓     | ✓         |
| Upload Documents       | Limited | Limited | ✓       | ✓     | ✓         |

---

# 5.20 Business Rules

* Student ID is permanent and never changes.
* Roll Number may change each academic session.
* One active enrollment per student per academic session.
* A student can have multiple guardians.
* A guardian can be linked to multiple students.
* Deleted student records are soft-deleted.
* Promotion archives previous academic records.
* Students cannot be permanently deleted if linked to financial or academic records.

---

# 5.21 Future Enhancements

* Digital ID Card (QR Code)
* RFID Integration
* Biometric Attendance Mapping
* GPS Transport Tracking
* Health Monitoring Integration
* Digital Locker
* National Student Registry Integration
* Alumni Portal
* AI Profile Summary
* Blockchain-based Academic Certificates

---

# Deliverables

The Student Information System provides:

* Complete Admission Management
* Unified Student Profile
* Guardian Management
* Medical & Document Records
* Promotion & Transfer Workflows
* Student Timeline
* Search & Filtering
* Secure APIs
* Role-Based Access
* Foundation for Student360, Attendance, Assessments, Analytics, and AI

The SIS is the backbone of SchoolOS. Every other functional module references the student record created and managed within this subsystem.
