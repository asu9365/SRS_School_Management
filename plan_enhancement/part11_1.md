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



