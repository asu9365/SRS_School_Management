# SchoolOS Enterprise Blueprint

# Batch 1 — User Portals

**Version:** 3.0

**Document Type:** Functional Design Specification (FDS)

**Module Group:** User Experience Layer

**Project:** SchoolOS – Enterprise Digital School Ecosystem

**Technology Stack**

* React 19
* TypeScript
* Vite
* Laravel 12
* PHP 8.3
* MySQL 8
* Redis
* Laravel Reverb
* Sanctum
* AWS S3

---

# Document Information

| Property      | Value                   |
| ------------- | ----------------------- |
| Document Name | Batch-1_User_Portals.md |
| Version       | 3.0                     |
| Status        | Draft                   |
| Prepared For  | SchoolOS                |
| Category      | Enterprise Architecture |
| Last Updated  | July 2026               |

---

# Version History

| Version | Date                             | Description          |
| ------- | -------------------------------- | -------------------- |
| 1.0     | Initial Draft                    | Parent Portal Design |
| 2.0     | Added Teacher Workspace          |                      |
| 3.0     | Enterprise User Portal Blueprint |                      |

---

# Table of Contents

```text
11 Parent Portal
    11.1 Overview
    11.2 Objectives
    11.3 Architecture
    11.4 Parent Dashboard
    11.5 Child Dashboard
    11.6 Attendance
    11.7 Assignments
    11.8 Assessments
    11.9 Student360
    11.10 Fees
    11.11 Communication
    11.12 PTM
    11.13 Reports
    11.14 APIs
    11.15 Database
    11.16 Business Rules

12 Teacher Workspace

13 Principal Dashboard

14 Administration Portal
```

---

# Batch Overview

The **User Portal Layer** represents the primary interface between the SchoolOS platform and its users.

Unlike traditional School Management Systems, SchoolOS provides a **personalized digital workspace** for every stakeholder.

Each portal is designed around the daily responsibilities, workflows, permissions, and information needs of its respective users.

The portal layer is responsible for:

* Personalized dashboards
* Task management
* Academic monitoring
* Communication
* Collaboration
* Analytics
* Artificial Intelligence recommendations
* Reports
* Notifications

Every portal shares a common design language while exposing role-specific functionality through Role-Based Access Control (RBAC).

---

# Portal Architecture

```text
                   SchoolOS

                        │

    ┌───────────────────┼────────────────────┐

    │                   │                    │

 Student Portal    Parent Portal     Teacher Workspace

    │                   │                    │

    └──────────────┬────┴─────┬──────────────┘

                   │

          Principal Dashboard

                   │

          Administration Portal

                   │

            Super Admin Portal
```

Each portal consumes the same backend APIs while displaying different information based on the authenticated user's permissions.

---

# User Experience Principles

Every SchoolOS portal follows the same design philosophy.

## 1. Personalized Experience

Users should only see information relevant to them.

Examples

Student

* Homework
* Attendance
* Marks

Parent

* Child Progress
* Fees
* PTM

Teacher

* Classes
* Assignments
* Attendance

Principal

* School Analytics

---

## 2. Dashboard First

Every portal opens with a dashboard.

The dashboard answers:

> "What requires my attention today?"

---

## 3. Action Driven

Instead of merely displaying data, every page encourages action.

Example

Attendance below 75%

↓

Show Alert

↓

Notify Parent

↓

Schedule PTM

↓

Recommend Intervention

---

## 4. Mobile Friendly

Every portal must support

* Desktop
* Laptop
* Tablet
* Mobile

Future

Native React Native App

---

## 5. Accessibility

The platform follows WCAG accessibility principles.

Supports

* Keyboard Navigation
* Screen Readers
* High Contrast
* Font Scaling

---

# Portal Design Standards

Every portal follows a consistent layout.

```text
----------------------------------------------------

Header

----------------------------------------------------

Sidebar

Dashboard

Content

Widgets

Analytics

Tables

Charts

----------------------------------------------------

Footer

----------------------------------------------------
```

---

# Shared Components

Every portal uses reusable UI components.

Examples

Cards

Statistics Cards

Charts

Tables

Calendar

Notifications

Search

Filters

Pagination

Profile Menu

Quick Actions

AI Assistant Widget

---

# Shared Navigation

Each portal contains

Dashboard

↓

Notifications

↓

Messages

↓

Calendar

↓

Reports

↓

Settings

↓

Profile

↓

Help

↓

Logout

---

# Authentication Flow

```text
User Opens Portal

↓

Login

↓

Laravel Sanctum Authentication

↓

Permission Validation

↓

Role Detection

↓

Load Dashboard

↓

Load Widgets

↓

Load Notifications

↓

Display Portal
```

---

# Dashboard Philosophy

Every dashboard contains four categories of information.

## Summary Cards

Quick statistics

Example

Attendance

Assignments

Fees

Results

---

## Alerts

Important information

Examples

Homework Due Today

Attendance Warning

Fee Reminder

Upcoming Examination

PTM Tomorrow

---

## Analytics

Visual performance

Examples

Attendance Trend

Assignment Completion

Marks Trend

Competency Radar

---

## Quick Actions

Examples

Pay Fees

Download Report

Apply Leave

Message Teacher

Join PTM

---

# Cross Module Integration

Every portal communicates with multiple modules.

```text
Portal

│

├── Student Information System

├── Attendance

├── Assessment

├── Assignment

├── Student360

├── Communication

├── Notification

├── AI Engine

├── Reports

└── Analytics
```

---

# Data Flow

```text
User Login

↓

Authentication

↓

Permission Check

↓

API Gateway

↓

Business Services

↓

Database

↓

Analytics Engine

↓

Dashboard

↓

User Interaction
```

---

# Performance Requirements

Each portal should satisfy the following benchmarks.

| Component     | Target      |
| ------------- | ----------- |
| Login         | < 2 seconds |
| Dashboard     | < 1 second  |
| Reports       | < 5 seconds |
| Search        | < 500 ms    |
| Notifications | Real-time   |
| Charts        | < 2 seconds |

---

# Security Requirements

All portals implement:

* HTTPS
* Sanctum Authentication
* Role-Based Access Control
* Permission Policies
* CSRF Protection
* XSS Protection
* SQL Injection Protection
* Audit Logging
* Session Timeout
* Rate Limiting

---

# Modules Covered in this Batch

This document defines the complete specification for the following user portals.

| Part    | Module                |
| ------- | --------------------- |
| Part 11 | Parent Portal         |
| Part 12 | Teacher Workspace     |
| Part 13 | Principal Dashboard   |
| Part 14 | Administration Portal |

Each module includes:

* Business Requirements
* Objectives
* Functional Specification
* Workflows
* UI Pages
* Dashboard Design
* APIs
* Database Entities
* Permissions
* Business Rules
* Analytics
* AI Integration
* Future Enhancements

---

# Part 11 — Parent Portal

## 11.1 Overview

The Parent Portal is one of the most critical modules of SchoolOS. It bridges the communication gap between school and home by providing parents with real-time visibility into their child's academic performance, attendance, assignments, behavior, achievements, fees, and school communications.

Unlike conventional school portals that simply display report cards, the SchoolOS Parent Portal is designed as an **engagement platform**, enabling parents to actively participate in their child's educational journey.

The Parent Portal integrates with:

* Student Information System (SIS)
* Attendance Management
* Assessment & Examination System
* Assignment & Homework Management
* Student360 Platform
* Communication Hub
* Fee Management
* AI Intelligence Layer
* Notification Engine

---

## 11.2 Objectives

The Parent Portal aims to:

* Increase parental engagement in student learning.
* Provide real-time access to academic information.
* Improve communication with teachers and school administration.
* Offer transparent visibility into attendance, assessments, and assignments.
* Enable digital fee payments and document downloads.
* Support informed decision-making through analytics and AI-generated insights.
* Encourage collaborative intervention for student success.

---

## 11.3 Parent Portal Features (Summary)

The Parent Portal provides access to:

* Parent Dashboard
* Child Dashboard (single or multiple children)
* Student360 Overview
* Attendance Monitoring
* Homework & Assignment Tracking
* Assessment Results & Report Cards
* Competency Progress
* Fees & Payment History
* Notices & Circulars
* Messaging & Communication
* Parent-Teacher Meeting (PTM) Scheduling
* School Calendar
* Achievement Portfolio
* AI Insights & Recommendations
* Downloads (Certificates, Reports, Documents)
* Notifications & Alerts

---


# 11.4 Parent Dashboard

---

## Overview

The Parent Dashboard serves as the landing page immediately after authentication.

Its primary objective is to provide parents with a **single-screen overview** of everything related to their child, highlighting items that require immediate attention while offering quick access to detailed information.

Instead of navigating through multiple menus, parents should be able to answer the following questions within a few seconds:

* Is my child present today?
* Are there any pending assignments?
* Are examinations approaching?
* Has the teacher sent any new messages?
* Are there any fee dues?
* Has attendance dropped?
* Is there anything requiring my action today?

---

# Dashboard Objectives

The Parent Dashboard is designed to:

* Provide real-time student information.
* Highlight actionable items.
* Improve parental engagement.
* Increase transparency.
* Reduce communication delays.
* Offer predictive insights using AI.

---

# Dashboard Layout

```text
--------------------------------------------------------------
 Header

 Welcome Ashish!

 Notifications (4)      Messages (2)

--------------------------------------------------------------

Sidebar                 Main Dashboard

                        Student Card

                        Attendance Card

                        Assignment Card

                        Assessment Card

                        AI Insights

                        Calendar

                        Notices

                        Quick Actions

--------------------------------------------------------------

Footer
```

---

# Dashboard Components

The dashboard is composed of reusable widgets.

## Student Summary Card

Displays

* Student Photograph
* Name
* Admission Number
* Class
* Section
* Roll Number
* House
* Academic Session

Example

```text
-----------------------------------

John Doe

Class VIII-A

Roll 24

Attendance 94%

Success Index 88

-----------------------------------
```

---

## Attendance Widget

Displays

Today's Status

Present

Attendance Percentage

94%

Monthly Attendance

96%

Yearly Attendance

95%

Late Arrivals

2

Approved Leave

3

Quick Actions

* Apply Leave
* View Calendar

---

## Attendance Trend

Visual representation

```text
Jan ████████████ 98%

Feb ██████████ 94%

Mar █████████ 91%

Apr ███████████ 96%
```

---

## Assignment Widget

Displays

Pending Assignments

Completed Assignments

Late Submissions

Upcoming Deadlines

Example

```text
Pending

Mathematics

Due Tomorrow

--------------------------------

Science Project

Due Friday

--------------------------------
```

---

## Assessment Widget

Displays

Recent Results

Upcoming Exams

Average Marks

Class Rank

Performance Trend

Example

```text
Mathematics

88%

Science

92%

English

84%

Overall

88.5%
```

---

## Student360 Widget

Displays

Student Success Index

Attendance Score

Competency Score

Behaviour Score

Achievement Score

Example

```text
Success Index

88 / 100

Outstanding
```

---

## AI Insight Widget

Artificial Intelligence automatically summarizes student progress.

Example

> Mathematics performance has improved significantly over the last month.

---

Example

> Attendance has dropped below the class average.

---

Example

> Science assignments are consistently submitted before deadlines.

---

Recommended Actions

* Encourage reading practice.
* Schedule PTM.
* Review Mathematics homework.
* Congratulate recent achievements.

---

## Fee Widget

Displays

Outstanding Fees

Due Date

Previous Payments

Receipt Downloads

Quick Actions

Pay Now

Download Receipt

Payment History

Example

```text
Outstanding

₹3,500

Due

15 July
```

---

## Notice Widget

Displays latest notices.

Examples

Holiday Notice

Sports Day

Annual Function

Fee Reminder

PTM Schedule

Parents can

Read

Download

Bookmark

Share

---

## Messages Widget

Displays

Unread Messages

Teacher Replies

Administration Messages

Quick Reply

---

## Calendar Widget

Displays

Upcoming Exams

PTM

Sports Day

Holiday

Assignment Deadlines

Events

---

## Achievement Widget

Shows

Certificates

Awards

Competitions

Sports

Olympiads

Latest Achievement

```text
Science Fair Winner

District Level

Gold Medal
```

---

# Quick Actions

Parents can directly access

Apply Leave

↓

Pay Fees

↓

Download Report Card

↓

Message Teacher

↓

Schedule PTM

↓

View Student360

↓

Download Certificate

↓

Update Contact Details

---

# Multiple Children Support

One parent account may manage multiple children.

Example

```text
Ashish Sharma

Children

• Rahul Sharma

Class VIII

Attendance 96%

--------------------

• Priya Sharma

Class IV

Attendance 98%
```

Switching between children should update every dashboard widget automatically.

---

# Smart Alerts

The system highlights high-priority items.

Examples

🔴 Attendance below 75%

🟡 Homework due tomorrow

🟢 Fee paid successfully

🔴 Examination starts next week

🟡 PTM tomorrow

🔴 Teacher requested meeting

Alerts are color-coded based on priority.

---

# Parent Engagement Score

The portal tracks parental participation.

Factors

* PTM Attendance
* Homework Monitoring
* Notice Read Rate
* Teacher Communication
* Event Participation

Example

```text
Parent Engagement

92%

Excellent
```

---

# Dashboard Personalization

Parents can customize

* Widget Order
* Theme
* Language
* Notification Preferences
* Default Child
* Dashboard Layout

Future

Drag-and-drop widgets.

---

# Dashboard Refresh Strategy

Real-time Components

* Notifications
* Messages
* Attendance
* PTM Updates

Cached Components

* Charts
* Reports
* Academic Analytics

---

# User Journey

```text
Parent Login

↓

Dashboard

↓

Attendance Alert

↓

View Attendance

↓

Message Teacher

↓

Schedule PTM

↓

Receive Confirmation

↓

Timeline Updated
```

---

# API Endpoints

Dashboard

```http
GET /api/parent/dashboard
```

Attendance Summary

```http
GET /api/parent/attendance-summary
```

Assignment Summary

```http
GET /api/parent/assignment-summary
```

Assessment Summary

```http
GET /api/parent/assessment-summary
```

Student360 Summary

```http
GET /api/parent/student360-summary
```

Fee Summary

```http
GET /api/parent/fees-summary
```

---

# Database Entities Used

```text
students

attendance_records

assignments

assignment_submissions

assessments

marks

student_success_scores

notifications

messages

fees

calendar_events

achievements
```

---

# Permissions

| Action                | Permission |
| --------------------- | ---------- |
| View Child Dashboard  | ✓          |
| View Attendance       | ✓          |
| View Assignments      | ✓          |
| View Reports          | ✓          |
| View Student360       | ✓          |
| Pay Fees              | ✓          |
| Message Teacher       | ✓          |
| Schedule PTM          | ✓          |
| Edit Academic Records | ✗          |
| Edit Attendance       | ✗          |

---

# Business Rules

* Parents can only access students linked to their account.
* Academic data is read-only.
* Financial transactions require authentication.
* Attendance updates are reflected immediately.
* Dashboard widgets are personalized.
* All actions are recorded in the audit log.

---

# Future Enhancements

* AI Voice Assistant
* WhatsApp Notifications
* Digital Parent ID
* Offline Dashboard
* Family Dashboard
* Smart Home Screen
* AI Chatbot
* Voice Commands
* Multi-language Support
* Mobile Widgets

---

# 11.5 Child Dashboard

## Overview

While the Parent Dashboard provides a high-level overview, the **Child Dashboard** offers a comprehensive, student-specific view for each linked child.

It consolidates academic, attendance, assignment, behavioral, and extracurricular information into a single profile, allowing parents to monitor individual progress and identify areas requiring support.

The Child Dashboard serves as the parent's primary window into the **Student360** ecosystem and will be explored in detail in the next section.

# 11.5 Child Dashboard

---

## Overview

The **Child Dashboard** provides parents with a detailed, student-centric view of their child's complete educational journey.

While the Parent Dashboard provides high-level summaries across one or more children, the Child Dashboard focuses exclusively on an individual student, integrating data from every major SchoolOS subsystem.

The Child Dashboard acts as the **Parent's window into Student360**, allowing parents to understand not only academic performance but also behavioral growth, attendance trends, extracurricular participation, competencies, achievements, and AI-generated recommendations.

Unlike conventional report card systems that present isolated marks, this dashboard presents a continuous, holistic view of student development.

---

# Objectives

The Child Dashboard aims to:

* Provide a unified profile for each child.
* Present academic, behavioral, and extracurricular information in one place.
* Enable early identification of learning challenges.
* Encourage active parental involvement.
* Offer personalized recommendations powered by AI.
* Support collaborative intervention between parents and teachers.

---

# Dashboard Layout

```text
---------------------------------------------------------------

Child Profile

---------------------------------------------------------------

Student Information

Attendance

Assignments

Assessments

Competencies

Achievements

Behaviour

Student360

AI Insights

Downloads

---------------------------------------------------------------
```

---

# Student Profile Card

Displays the student's basic information.

Fields

* Photograph
* Full Name
* Admission Number
* Student ID
* Class
* Section
* Roll Number
* House
* Academic Session
* Date of Birth
* Blood Group

Example

```text
------------------------------------------------

John Doe

Class VIII-A

Roll Number 18

Admission No. SRHS2026031

House : Blue

------------------------------------------------
```

---

# Academic Summary

Displays

Current GPA

Overall Percentage

Class Rank

Subject Average

Promotion Status

Academic Trend

Example

| Metric        | Value    |
| ------------- | -------- |
| GPA           | 8.9      |
| Percentage    | 89%      |
| Rank          | 6        |
| Promotion     | Eligible |
| Success Index | 91       |

---

# Subject Performance

Displays performance in every subject.

| Subject        | Marks | Grade | Trend |
| -------------- | ----- | ----- | ----- |
| Mathematics    | 91    | A+    | ↑     |
| Science        | 89    | A     | ↑     |
| English        | 85    | A     | →     |
| Social Science | 82    | B+    | ↑     |
| Computer       | 97    | A+    | ↑     |

Trend Indicators

↑ Improving

→ Stable

↓ Declining

---

# Attendance Overview

Displays

Today's Attendance

Monthly Attendance

Yearly Attendance

Consecutive Present Days

Late Arrivals

Leave History

Example

```text
Attendance

Today

Present

Overall

95%

Monthly

97%

Late Arrivals

1

Leaves

3
```

---

# Attendance Calendar

Visual calendar

```text
Mon Tue Wed Thu Fri

P

P

A

P

P

P

ML

P

P

P

L

P
```

Legend

P

Present

A

Absent

L

Late

ML

Medical Leave

HD

Half Day

---

# Assignment Tracker

Displays

Pending Assignments

Completed Assignments

Late Submissions

Average Assignment Score

Example

```text
Mathematics

Due Tomorrow

-------------------

Science Project

Submitted

-------------------

English Essay

Graded

92%
```

---

# Assessment Summary

Displays

Recent Examinations

Average Marks

Highest Marks

Lowest Marks

Upcoming Assessments

Example

```text
Recent Result

Mathematics

91

Science

89

English

84

Overall

88%
```

---

# Competency Dashboard

The Child Dashboard provides competency tracking beyond marks.

Example

Mathematics

* Algebra

96%

* Geometry

89%

* Statistics

81%

English

* Reading

95%

* Writing

82%

* Grammar

88%

Computer Science

* Programming

97%

* Problem Solving

91%

---

# Competency Radar Chart

```text
Programming

▲

Reading ◄────┼────► Mathematics

▼

Writing
```

Weak competencies are automatically highlighted.

---

# Behaviour Summary

Displays

Positive Behaviour

Teacher Observations

Discipline Records

Leadership Activities

Participation

Examples

Positive

* Helped classmates

* Excellent teamwork

* Leadership during Science Exhibition

Behaviour Concern

* Homework delayed twice

---

# Achievement Portfolio

Displays

Academic

Sports

Music

Art

Olympiads

Coding Competitions

Science Fair

Certificates

Example

```text
Achievements

District Science Fair

Gold Medal

State Chess Championship

Runner Up

Coding Competition

Winner
```

---

# Student Timeline

Every important event appears chronologically.

Example

```text
Admission

↓

First Attendance

↓

Science Fair

↓

Mathematics Olympiad

↓

Homework Completed

↓

PTM Conducted

↓

Annual Examination

↓

Promotion
```

Parents can filter timeline by:

Academic

Behaviour

Attendance

Activities

Communication

Achievements

Health

---

# Student360 Snapshot

Displays

Success Index

Attendance Score

Academic Score

Behaviour Score

Competency Score

Activity Score

Example

```text
Student Success Index

91

Outstanding
```

---

# AI Recommendations

Artificial Intelligence continuously analyses student data.

Example

> Attendance has improved significantly over the last month.

---

Example

> Reading competency is excellent. Encourage participation in debate competitions.

---

Example

> Science scores are declining despite regular attendance. Consider additional revision sessions.

---

Suggested Parent Actions

* Encourage reading

* Schedule PTM

* Review homework daily

* Discuss examination preparation

* Enroll in Mathematics enrichment class

---

# Parent Interventions

Parents can create personal follow-up tasks.

Examples

□ Review Mathematics homework every evening

□ Practice reading for 20 minutes daily

□ Attend PTM

□ Discuss Science project

□ Encourage sports participation

---

# Downloads

Parents may download

Report Cards

Certificates

Attendance Report

Assignment Reports

Fee Receipts

Medical Records

Transfer Certificate (Authorized)

---

# Child Dashboard APIs

Student Profile

```http
GET /api/parent/child/{id}
```

Academic Summary

```http
GET /api/parent/child/{id}/academics
```

Attendance

```http
GET /api/parent/child/{id}/attendance
```

Assignments

```http
GET /api/parent/child/{id}/assignments
```

Assessments

```http
GET /api/parent/child/{id}/assessments
```

Competencies

```http
GET /api/parent/child/{id}/competencies
```

Achievements

```http
GET /api/parent/child/{id}/achievements
```

Timeline

```http
GET /api/parent/child/{id}/timeline
```

Student360

```http
GET /api/parent/child/{id}/student360
```

---

# Database Entities

```text
students

student_profiles

attendance_records

assignments

assignment_submissions

assessment_results

competency_scores

student_behaviour

student_achievements

student_timelines

student_success_scores

student_ai_insights
```

---

# Permissions

| Action               | Parent |
| -------------------- | ------ |
| View Child Profile   | ✓      |
| View Attendance      | ✓      |
| View Assignments     | ✓      |
| View Assessments     | ✓      |
| View Student360      | ✓      |
| View Certificates    | ✓      |
| Download Reports     | ✓      |
| Modify Academic Data | ✗      |
| Edit Attendance      | ✗      |

---

# Business Rules

* Parents can only access linked children.
* Academic information is read-only.
* Downloads are permission-controlled.
* AI recommendations are advisory.
* Student Timeline entries cannot be modified by parents.
* Behaviour records are visible but cannot be edited.

---

# Future Enhancements

* Live Academic Progress Feed
* AI Parent Coach
* Voice Summary of Student Progress
* Family Learning Dashboard
* Digital Learning Goals
* Scholarship Recommendations
* Career Interest Assessment
* Wellness Monitoring
* Digital Achievement Wallet

---

# 11.6 Attendance Module (Parent View)

## Overview

The Attendance module within the Parent Portal provides detailed attendance tracking, leave management, analytics, and attendance-related alerts.

Unlike the dashboard widget, this dedicated module enables parents to explore attendance history, trends, leave applications, and AI-generated attendance insights in depth.

In the next section, we will design the complete Attendance module, including:

* Daily attendance records
* Attendance analytics
* Leave application workflow
* Attendance calendar
* Parent notifications
* Attendance reports
* Attendance APIs
* Business rules
* AI attendance prediction
* Integration with Student360

# 11.6 Attendance Module (Parent View)

---

## Overview

The Attendance Module allows parents to monitor their child's attendance in real-time while providing meaningful insights into attendance patterns, punctuality, leave records, and attendance-related academic risks.

Rather than simply displaying attendance percentages, this module provides contextual analytics, trend visualizations, and AI-generated recommendations to help parents proactively support consistent attendance.

This module integrates with:

- Student Information System (SIS)
- Attendance Management System
- Student360
- AI Intelligence Layer
- Notification Engine
- Parent Dashboard

---

# Objectives

The Attendance Module aims to:

- Provide real-time attendance visibility.
- Increase transparency between school and parents.
- Simplify leave applications.
- Detect attendance risks early.
- Support academic success through consistent attendance.
- Notify parents immediately regarding absences.

---

# Module Dashboard

Displays

- Today's Attendance
- Overall Attendance
- Monthly Attendance
- Yearly Attendance
- Attendance Trend
- Leave Summary
- Late Arrivals
- Attendance Alerts

---

# Attendance Summary Card

Displays

| Item | Value |
|------|-------|
| Today's Status | Present |
| Overall Attendance | 95% |
| Monthly Attendance | 97% |
| Yearly Attendance | 94% |
| Consecutive Present Days | 18 |
| Late Arrivals | 2 |
| Approved Leave | 4 |

Example

------------------------------------------------

Today's Status

✅ Present

Overall Attendance

95%

Consecutive Present Days

18

------------------------------------------------

---

# Attendance Calendar

Parents can browse attendance month-wise.

Example

```text
July 2026

Mon Tue Wed Thu Fri Sat Sun

P   P   P   A   P   H   H

P   P   ML  P   P   H   H

P   L   P   P   P   H   H
```

Legend

| Symbol | Meaning |
|---------|----------|
| P | Present |
| A | Absent |
| L | Late |
| ML | Medical Leave |
| AL | Approved Leave |
| HD | Half Day |
| H | Holiday |

---

# Daily Attendance Details

Selecting a date displays

Date

Attendance Status

Time In

Time Out

Recorded By

Remarks

Example

| Field | Value |
|---------|---------|
| Date | 12 July 2026 |
| Status | Present |
| Time In | 08:02 AM |
| Time Out | 02:45 PM |
| Teacher | Mrs. Sharma |
| Remarks | Present throughout the day |

---

# Attendance Trend

Monthly trend visualization

```text
Jan ███████████ 98%

Feb ██████████ 95%

Mar █████████ 92%

Apr ███████████ 97%

May ██████████ 94%

Jun ███████████ 96%
```

Parents can compare

- Monthly attendance
- Term attendance
- Previous year
- Class average

---

# Attendance Heat Map

The system visualizes attendance quality.

Example

```text
Week 1

🟢🟢🟢🟢🟢

Week 2

🟢🟢🟡🟢🟢

Week 3

🟢🔴🟢🟢🟢
```

Legend

🟢 Excellent

🟡 Warning

🔴 Poor

---

# Leave Management

Parents may submit leave requests digitally.

Supported Leave Types

- Sick Leave
- Medical Leave
- Emergency Leave
- Family Function
- Sports Participation
- Educational Tour
- Official Competition

---

# Leave Application Workflow

```text
Parent Opens Portal

↓

Select Child

↓

Apply Leave

↓

Choose Dates

↓

Upload Documents (Optional)

↓

Submit Request

↓

Teacher Review

↓

Approve / Reject

↓

Parent Notification

↓

Attendance Updated
```

---

# Leave Application Form

Fields

Student

Leave Type

Start Date

End Date

Reason

Supporting Document

Emergency Contact

Submit

---

# Leave History

Displays

| Date | Leave Type | Status |
|------|-------------|---------|
| 02 Jul | Medical | Approved |
| 18 Jun | Casual | Approved |
| 05 Jun | Sick | Rejected |

Parents may filter by

- Status
- Month
- Academic Session
- Leave Type

---

# Attendance Alerts

Automatic alerts generated for

Attendance below 90%

Attendance below 80%

Attendance below 75%

Three consecutive absences

Five late arrivals

Long leave duration

Example

🔴 Attendance has dropped below 75%.

Immediate parent-teacher discussion is recommended.

---

# Parent Notifications

Parents receive instant notifications for

Student marked absent

Late arrival

Leave approved

Leave rejected

Attendance corrected

Attendance warning

---

# Attendance Reports

Parents can generate

Daily Report

Weekly Report

Monthly Report

Yearly Report

Leave Report

Attendance Certificate

Download Formats

- PDF
- Excel
- CSV

---

# AI Attendance Analysis

Artificial Intelligence continuously evaluates attendance behaviour.

Examples

> Attendance has improved by 8% compared to the previous month.

---

> Monday absenteeism is significantly higher than other weekdays.

---

> Attendance is currently below the class average.

---

> Reduced attendance is beginning to affect Mathematics performance.

---

# Attendance Prediction

AI estimates future attendance risks.

Example

Current Attendance

95%

Predicted End-of-Term Attendance

93%

Risk Level

Low

---

# Parent Recommendations

System recommendations

✔ Encourage punctuality.

✔ Schedule doctor's appointment if illness persists.

✔ Meet class teacher.

✔ Review attendance before examinations.

✔ Avoid unnecessary leave during assessment weeks.

---

# Student360 Integration

Attendance automatically updates

- Student Timeline
- Student Success Index
- AI Risk Score
- Parent Dashboard
- Principal Analytics

Example Timeline

```text
12 Jul

Present

↓

15 Jul

Medical Leave

↓

18 Jul

Present

↓

20 Jul

Attendance Warning
```

---

# Attendance Analytics

The Parent Portal displays

Overall Attendance %

Monthly Attendance %

Class Average

School Average

Attendance Ranking

Attendance Stability

Attendance Heatmap

Attendance Distribution

---

# API Endpoints

Attendance Summary

```http
GET /api/parent/attendance
```

Attendance Calendar

```http
GET /api/parent/attendance/calendar
```

Attendance Reports

```http
GET /api/parent/attendance/report
```

Leave Requests

```http
POST /api/parent/leave
```

Leave History

```http
GET /api/parent/leave/history
```

Attendance Analytics

```http
GET /api/parent/attendance/analytics
```

---

# Database Tables

attendance_records

attendance_sessions

leave_requests

leave_types

attendance_notifications

attendance_statistics

student_timelines

student_success_scores

---

# Permissions

| Action | Parent |
|----------|----------|
| View Attendance | ✓ |
| Download Report | ✓ |
| Apply Leave | ✓ |
| Cancel Leave | Before Approval |
| Edit Attendance | ✗ |
| Approve Leave | ✗ |

---

# Business Rules

- Parents cannot modify attendance records.
- Leave applications require teacher approval.
- Attendance updates immediately after teacher submission.
- Attendance contributes to the Student Success Index.
- AI attendance recommendations are advisory.
- Attendance history is permanently maintained.

---

# Future Enhancements

- GPS-based Attendance Tracking
- Bus Boarding Attendance
- RFID Integration
- Facial Recognition Status
- Smart Attendance Alerts
- Attendance Chatbot
- Offline Attendance Synchronization

---

# 11.7 Homework & Assignment Module

## Overview

The Homework & Assignment Module enables parents to monitor daily homework, assignment progress, submission status, teacher feedback, grades, and learning consistency.

Unlike traditional diary-based homework tracking, SchoolOS provides complete transparency into every assignment throughout its lifecycle—from publication to submission, evaluation, and competency tracking.

This module integrates with:

- Assignment Management System
- Assessment Engine
- Student360
- Communication Hub
- AI Intelligence
- Notification Engine

In the next section, we will cover:

- Homework Dashboard
- Assignment Timeline
- Submission Status
- Teacher Feedback
- Learning Analytics
- AI Study Recommendations
- Homework Calendar
- Parent Interventions
- Assignment APIs
- Business Rules


# 11.7 Homework & Assignment Module

---

## Overview

The Homework & Assignment Module enables parents to monitor their child's daily academic workload, assignment progress, homework completion, teacher feedback, grades, and learning consistency.

Unlike traditional school diaries, SchoolOS provides complete transparency throughout the assignment lifecycle—from creation to evaluation—allowing parents to actively support their child's learning.

The module integrates with:

- Assignment Management System
- Assessment Engine
- Student360 Platform
- Communication Hub
- AI Intelligence
- Notification Engine

---

# Objectives

The Homework & Assignment Module aims to:

- Improve homework completion.
- Increase parental awareness.
- Reduce missed assignments.
- Monitor submission quality.
- Encourage timely submission.
- Support continuous learning.
- Provide AI-assisted learning recommendations.

---

# Module Dashboard

Displays

- Pending Homework
- Pending Assignments
- Submitted Assignments
- Overdue Tasks
- Average Assignment Score
- Teacher Feedback
- Weekly Learning Progress

---

# Homework Summary Card

Displays

| Item | Value |
|------|-------|
| Homework Assigned Today | 4 |
| Completed | 3 |
| Pending | 1 |
| Overdue | 0 |
| Completion Rate | 96% |

Example

------------------------------------------------

Today's Homework

Completed

3 / 4

Completion Rate

96%

------------------------------------------------

---

# Assignment Summary Card

Displays

- Total Assignments
- Submitted
- Under Review
- Evaluated
- Late Submission
- Average Marks

Example

| Category | Value |
|----------|-------|
| Total Assignments | 18 |
| Submitted | 17 |
| Pending | 1 |
| Average Score | 91% |

---

# Homework List

Parents can view homework grouped by date.

Example

```text
15 July

✓ Mathematics
Complete Exercise 7A

✓ English
Read Chapter 8

⚠ Science
Complete Lab Observation

✓ Computer
Practice Loops
```

Each homework displays

- Subject
- Teacher
- Description
- Due Date
- Completion Status
- Attachments

---

# Assignment Timeline

Each assignment has its own timeline.

Example

```text
Assignment Published

↓

Student Viewed

↓

Submission Uploaded

↓

Teacher Review

↓

Marks Awarded

↓

Feedback Published

↓

Student360 Updated
```

---

# Assignment Details

Selecting an assignment displays

- Assignment Title
- Subject
- Teacher
- Learning Objectives
- Description
- Due Date
- Maximum Marks
- Competencies
- Attachments

Submission Information

- Submission Date
- Submission Time
- Submission Version
- File Attached
- Teacher Feedback

---

# Submission Status

Possible statuses

- Draft
- Pending
- Submitted
- Under Review
- Graded
- Returned
- Resubmission Required
- Late Submission

Example

| Assignment | Status |
|------------|---------|
| Science Project | Under Review |
| Mathematics Worksheet | Graded |
| English Essay | Submitted |

---

# Homework Calendar

Displays homework across the month.

Example

```text
Mon Tue Wed Thu Fri

📚

📚📚

📝

📚

📝

📚

📚

📝
```

Legend

📚 Homework

📝 Assignment

⭐ Project

---

# Due Date Tracker

Upcoming deadlines

Example

```text
Tomorrow

Mathematics Worksheet

--------------------

Friday

Science Project

--------------------

Next Monday

English Essay
```

The system automatically highlights overdue work.

---

# Teacher Feedback

Parents can view teacher comments.

Example

> Excellent presentation and neat handwriting.

---

> Needs more practice in solving word problems.

---

> Good improvement compared to the previous assignment.

Feedback Types

- Written
- Rubric Based
- Competency Based

Future

- Audio Feedback
- Video Feedback

---

# Marks & Evaluation

Displays

- Marks Obtained
- Maximum Marks
- Grade
- Percentile
- Class Average

Example

| Subject | Marks |
|---------|-------|
| Mathematics | 18 / 20 |
| Science | 19 / 20 |
| English | 17 / 20 |

---

# Competency Mapping

Every assignment contributes toward competency tracking.

Example

Mathematics

Algebra

92%

Geometry

87%

Problem Solving

95%

English

Grammar

89%

Writing

82%

Reading

94%

---

# Learning Progress

Parents can monitor

Weekly Progress

Monthly Progress

Subject-wise Progress

Assignment Completion Rate

Learning Consistency

---

# Weekly Learning Report

Example

```text
Week Summary

Homework Assigned

18

Completed

17

Late

1

Average Score

91%
```

---

# Subject Performance

Displays

| Subject | Completion | Average Score |
|----------|------------|---------------|
| Mathematics | 100% | 94% |
| Science | 95% | 91% |
| English | 92% | 88% |
| Computer | 100% | 97% |

---

# Learning Analytics

Analytics include

- Homework Completion Trend
- Subject-wise Performance
- Submission Behaviour
- Late Submission Frequency
- Teacher Evaluation Trend
- Competency Improvement

---

# AI Study Coach

Artificial Intelligence analyses homework behaviour.

Examples

> Mathematics homework is consistently completed before deadlines.

---

> Science assignments are often submitted at the last minute.

---

> English writing competency has improved by 12%.

---

> Student performs significantly better in project-based learning than written homework.

---

# AI Recommendations

Examples

✔ Allocate 20 minutes daily for English writing practice.

✔ Encourage earlier submission of Science assignments.

✔ Continue current Mathematics study routine.

✔ Review teacher feedback before the next assignment.

✔ Practice programming exercises twice a week.

---

# Parent Actions

Parents can

- Download Assignment
- View Submission
- View Teacher Feedback
- Print Homework
- Set Reminder
- Add Personal Notes
- Contact Teacher

---

# Homework Notifications

Automatic notifications

Homework Assigned

Assignment Due Tomorrow

Submission Successful

Teacher Published Feedback

Assignment Graded

Homework Overdue

New Resources Uploaded

---

# Student360 Integration

Homework updates

- Student Timeline
- Academic Score
- Competency Score
- Student Success Index
- AI Learning Model

Example Timeline

```text
Homework Assigned

↓

Homework Submitted

↓

Teacher Feedback

↓

Marks Published

↓

Competency Updated
```

---

# Parent Intervention Suggestions

The system suggests actions.

Examples

- Review homework daily.
- Encourage revision before submission.
- Discuss teacher feedback.
- Help organize study schedule.
- Meet teacher if completion falls below 80%.

---

# Reports

Parents can generate

Homework Report

Assignment Report

Submission History

Teacher Feedback Report

Competency Report

Learning Progress Report

Download Formats

- PDF
- Excel

---

# API Endpoints

Homework Dashboard

```http
GET /api/parent/homework
```

Assignments

```http
GET /api/parent/assignments
```

Assignment Details

```http
GET /api/parent/assignments/{id}
```

Teacher Feedback

```http
GET /api/parent/assignments/{id}/feedback
```

Learning Analytics

```http
GET /api/parent/learning-analytics
```

Homework Reports

```http
GET /api/parent/homework/report
```

---

# Database Tables

assignments

assignment_submissions

assignment_feedback

assignment_files

assignment_statistics

competency_scores

student_success_scores

student_timelines

---

# Permissions

| Action | Parent |
|----------|----------|
| View Homework | ✓ |
| View Assignments | ✓ |
| Download Assignment | ✓ |
| View Feedback | ✓ |
| Download Reports | ✓ |
| Edit Assignment | ✗ |
| Submit Assignment | ✗ |

---

# Business Rules

- Parents have read-only access.
- Teacher feedback becomes visible only after publication.
- Assignment grades automatically update Student360.
- Every submission contributes to learning analytics.
- AI recommendations are advisory.
- Deleted assignments remain archived for audit purposes.

---

# Future Enhancements

- AI Homework Assistant
- Adaptive Homework Recommendations
- Parent Study Planner
- Homework Gamification
- Digital Reward Badges
- Collaborative Family Study Mode
- Google Classroom Integration
- Microsoft Teams Integration
- Voice Homework Instructions
- AI Homework Difficulty Analysis

---

# 11.8 Assessment & Examination Module

## Overview

The Assessment & Examination Module provides parents with complete visibility into their child's academic performance across quizzes, class tests, projects, practicals, unit tests, mid-term examinations, and final examinations.

Unlike traditional report card systems that only display marks, SchoolOS enables parents to explore performance trends, competency mastery, class comparisons, AI-generated academic insights, and detailed report cards.

The next section will include:

- Examination Dashboard
- Report Cards
- Marks Analysis
- Subject Performance
- Competency Reports
- Class Ranking
- Academic Growth Trends
- AI Academic Insights
- Report Downloads
- Assessment APIs
- Business Rules

