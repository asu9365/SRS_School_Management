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


