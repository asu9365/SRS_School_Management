# 12.5 Assessment & Gradebook Management

---

# Overview

The Assessment & Gradebook Management module is the academic evaluation engine of SchoolOS.

It enables teachers to create assessments, record marks, evaluate competencies, publish results, generate report cards, and continuously monitor academic progress.

Unlike traditional mark entry systems, SchoolOS integrates every assessment with Student360, Competency Tracking, AI Analytics, Parent Portal, Academic Reports, and Learning Outcomes.

Every assessment contributes toward a student's long-term academic profile rather than existing as an isolated examination.

The module integrates with

- Student360
- Assignment Module
- Competency Engine
- Parent Portal
- Principal Dashboard
- AI Intelligence
- Academic Analytics
- Report Card Engine

---

# Objectives

The Assessment Module aims to

- Digitize assessments.
- Reduce manual mark entry.
- Support competency-based evaluation.
- Automate grade calculation.
- Generate report cards.
- Improve assessment transparency.
- Provide AI-assisted academic insights.

---

# Assessment Dashboard

Displays

- Upcoming Assessments
- Draft Assessments
- Ongoing Assessments
- Marks Pending
- Published Results
- Student Performance
- AI Insights

---

# Dashboard Layout

```text
------------------------------------------------------

Assessment Dashboard

Upcoming Tests

Pending Marks

Gradebook

Competencies

Published Results

Quick Actions

------------------------------------------------------
```

---

# Supported Assessment Types

SchoolOS supports

- Quiz
- Oral Test
- Class Test
- Worksheet
- Assignment
- Practical
- Viva
- Lab Assessment
- Project
- Unit Test
- Mid-Term
- Final Examination
- Olympiad
- Diagnostic Assessment
- Competency Assessment

---

# Assessment Lifecycle

```text
Create Assessment

↓

Configure Marks

↓

Assign Classes

↓

Publish Schedule

↓

Conduct Assessment

↓

Enter Marks

↓

Moderation

↓

Publish Results

↓

Student360 Updated

↓

Parent Notification

```

---

# Assessment Creation

Teacher defines

Assessment Name

Subject

Class

Section

Assessment Type

Chapter

Maximum Marks

Passing Marks

Weightage

Assessment Date

Duration

Instructions

Learning Outcomes

Competencies

---

# Example Assessment

| Field | Value |
|---------|----------|
| Name | Unit Test 2 |
| Subject | Mathematics |
| Class | VIII-A |
| Max Marks | 50 |
| Passing | 20 |
| Weightage | 20% |

---

# Marks Entry

Supports

Manual Entry

Spreadsheet Upload

Tablet Entry

Bulk Entry

Offline Entry (Future)

---

# Marks Entry Screen

Example

| Roll | Name | Marks |
|------|------|--------|
| 01 | Rahul | 46 |
| 02 | Aman | 41 |
| 03 | Neha | 48 |

Teachers may

Save Draft

↓

Validate

↓

Publish

---

# Validation Rules

System validates

Maximum Marks

Negative Marks

Duplicate Records

Missing Students

Absent Students

Grace Marks

---

# Grade Calculation

Automatically calculates

Percentage

Grade

Grade Point

Rank

Pass/Fail

Weightage

Example

| Marks | Grade |
|---------|---------|
| 91-100 | A+ |
| 81-90 | A |
| 71-80 | B+ |
| 61-70 | B |
| 51-60 | C |
| 41-50 | D |
| Below 40 | F |

---

# GPA Calculation

Example

```text
Mathematics

10

Science

9

English

9

Computer

10

Average GPA

9.5
```

---

# Gradebook

Digital gradebook displays

All Assessments

↓

Assignment Marks

↓

Practical Marks

↓

Projects

↓

Attendance Weightage

↓

Final Grade

---

# Gradebook Layout

| Student | UT1 | UT2 | Mid | Final | GPA |
|----------|-----|-----|------|-------|------|
| Rahul | 42 | 46 | 88 | 91 | 9.4 |
| Aman | 39 | 41 | 82 | 84 | 8.8 |

---

# Assessment Rubrics

Teachers evaluate

Knowledge

Understanding

Application

Analysis

Presentation

Creativity

Participation

---

# Competency Mapping

Every assessment maps to

Learning Outcomes

↓

Course Outcomes

↓

Competencies

↓

Bloom Levels

↓

Student Success Index

---

# Bloom's Taxonomy

Supports

Remember

Understand

Apply

Analyze

Evaluate

Create

Teachers can assign each question to a Bloom level.

---

# Learning Outcome Tracking

Example

LO-1

Linear Equations

96%

LO-2

Problem Solving

91%

LO-3

Mathematical Reasoning

88%

---

# Competency Analytics

Displays

Mastered

↓

Developing

↓

Needs Support

↓

Critical

Example

| Competency | Status |
|------------|---------|
| Algebra | Mastered |
| Geometry | Mastered |
| Statistics | Developing |

---

# Moderation Workflow

```text
Teacher Completes Marks

↓

Department Review

↓

Principal Approval (Optional)

↓

Publish Results

↓

Parents Notified
```

---

# Result Publication

After publication

Student Portal

↓

Parent Portal

↓

Student360

↓

Reports

↓

Analytics

↓

Notifications

are automatically updated.

---

# AI Academic Assistant

Artificial Intelligence helps teachers by

Identifying weak students

Generating report comments

Finding learning gaps

Suggesting remedial classes

Predicting academic risks

Recommending enrichment activities

---

# AI Comment Example

> Rahul has demonstrated excellent conceptual understanding and consistent academic growth. Continued focus on mathematical reasoning will further strengthen overall performance.

---

# Performance Analytics

Displays

Average Marks

Highest Marks

Lowest Marks

Median

Pass Percentage

Grade Distribution

Competency Achievement

---

# Grade Distribution

```text
A+

██████████

A

████████

B+

█████

B

███

C

█
```

---

# Student Comparison

Teachers compare

Student

↓

Class Average

↓

Section Average

↓

School Average

↓

Previous Assessment

---

# Weak Student Detection

AI identifies

Low Marks

↓

Attendance Issues

↓

Assignment Delays

↓

Competency Gaps

↓

Risk Score

---

# Remedial Recommendations

Examples

Conduct Algebra Revision

Assign Practice Worksheet

Schedule PTM

Provide Individual Coaching

Assign Peer Mentor

---

# Student360 Integration

Assessment updates

Academic Timeline

↓

Gradebook

↓

Competencies

↓

Achievements

↓

Student Success Index

↓

Parent Portal

---

# Timeline Example

```text
Assessment Created

↓

Assessment Conducted

↓

Marks Entered

↓

Results Published

↓

Student360 Updated

↓

Parent Viewed Result

```

---

# Reports

Teachers may generate

Marks Register

Grade Sheet

Pass-Fail Report

Rank List

Competency Report

Bloom Analysis

Subject Analysis

Class Performance Report

Department Report

---

# API Endpoints

Assessment Dashboard

```http
GET /api/teacher/assessments
```

Create Assessment

```http
POST /api/teacher/assessments
```

Marks Entry

```http
POST /api/teacher/marks
```

Gradebook

```http
GET /api/teacher/gradebook
```

Publish Results

```http
POST /api/teacher/results/publish
```

Competencies

```http
GET /api/teacher/competencies
```

Academic Analytics

```http
GET /api/teacher/analytics
```

---

# Database Tables

assessments

assessment_types

assessment_schedule

assessment_results

marks

gradebooks

grading_scales

grading_rules

rubrics

rubric_scores

learning_outcomes

competencies

competency_scores

student_rankings

assessment_statistics

student_timelines

student_success_scores

---

# Permissions

| Action | Teacher |
|----------|----------|
| Create Assessment | ✓ |
| Enter Marks | ✓ |
| Edit Marks (Before Publish) | ✓ |
| Publish Results | Subject to Policy |
| View Analytics | ✓ |
| Delete Published Results | ✗ |
| Modify Grade Rules | ✗ |

---

# Business Rules

- Every assessment belongs to an academic session.
- Marks cannot exceed configured maximum marks.
- Published results become read-only unless reopened by an authorized administrator.
- Grade calculation follows the school's active grading policy.
- Every mark modification is recorded in the audit log.
- AI-generated comments are editable before publication.
- Student360 updates immediately after results are published.
- Parent notifications are triggered only after official publication.

---

# Future Enhancements

- AI Auto-Grading
- OCR Answer Sheet Evaluation
- Handwriting Recognition
- Computer Vision Practical Assessment
- Adaptive Testing
- Online Examination Platform
- Secure Browser Integration
- Question Difficulty Analytics
- AI Paper Moderation
- National Assessment Benchmarking

---

# 12.6 Student360 & Behaviour Management

## Overview

The Student360 & Behaviour Management module provides teachers with a comprehensive view of each student's academic, behavioral, attendance, competency, health, extracurricular, and social development.

Unlike traditional student profiles, Student360 serves as a living digital portfolio that evolves throughout the student's educational journey.

The next section will include:

- Student360 Dashboard
- Behaviour Tracking
- Achievement Portfolio
- Discipline Management
- Counselling Records
- Health Records
- Intervention Plans
- Student Timeline
- AI Risk Detection
- Student Success Index
- APIs
- Database Schema



# 12.6 Student360 & Behaviour Management

---

# Overview

The Student360 & Behaviour Management module is the heart of the SchoolOS ecosystem.

Unlike conventional School Management Systems that only store academic marks and attendance, Student360 creates a **comprehensive digital profile** of every student by combining academic performance, attendance, competencies, behaviour, health, achievements, activities, communication history, interventions, and AI-generated insights into a single unified view.

This enables teachers to understand the complete learning journey of each student and provide personalized support.

Student360 integrates with

- Attendance Management
- Assessment Engine
- Gradebook
- Assignment Management
- Parent Portal
- Principal Dashboard
- Counselling Module
- Health Records
- Achievement Management
- AI Intelligence Layer

---

# Objectives

The Student360 module aims to

- Maintain a complete student profile.
- Support holistic student development.
- Track academic and behavioural growth.
- Enable competency-based monitoring.
- Record interventions.
- Improve collaboration between teachers and parents.
- Power AI-driven recommendations.
- Measure long-term student success.

---

# Student360 Dashboard

Displays

- Student Profile
- Academic Performance
- Attendance
- Behaviour
- Competencies
- Achievements
- Activities
- Health
- Parent Engagement
- AI Insights
- Student Timeline

---

# Dashboard Layout

```text
-------------------------------------------------------

Student Profile

Academic Overview

Attendance

Behaviour

Competencies

Achievements

Health

Timeline

AI Insights

-------------------------------------------------------
```

---

# Student Profile

Displays

- Student Photograph
- Full Name
- Admission Number
- Roll Number
- Class
- Section
- House
- Blood Group
- Parent Information
- Emergency Contact

Example

| Field | Value |
|---------|---------|
| Name | Rahul Sharma |
| Admission No | SRHS-2026-102 |
| Class | VIII-A |
| Roll | 18 |
| House | Blue |

---

# Academic Snapshot

Displays

Overall Percentage

GPA

Current Grade

Class Rank

Recent Assessments

Assignment Completion

Competency Score

Student Success Index

---

# Academic Performance

Example

| Subject | Marks | Grade |
|----------|---------|---------|
| Mathematics | 94 | A+ |
| Science | 91 | A+ |
| English | 87 | A |
| Computer | 98 | A+ |

---

# Attendance Snapshot

Displays

Attendance %

Present Days

Late Arrivals

Leave Days

Attendance Trend

Attendance Risk

Example

```text
Attendance

95%

Present

182 Days

Late

2

Risk

Low
```

---

# Behaviour Dashboard

Teachers may record

Positive Behaviour

Discipline Issues

Leadership

Participation

Teamwork

Classroom Conduct

Respect

Responsibility

---

# Behaviour Categories

Positive

- Leadership
- Teamwork
- Helping Others
- Creativity
- Discipline
- Responsibility

Negative

- Late Homework
- Classroom Misconduct
- Bullying
- Absenteeism
- Disrespect
- Rule Violation

---

# Behaviour Entry

Teachers may record

Date

Behaviour Type

Category

Severity

Description

Action Taken

Follow-up Required

---

# Behaviour Levels

🟢 Excellent

🟢 Good

🟡 Observation

🟠 Concern

🔴 Critical

---

# Positive Reinforcement

Teachers may award

Stars

Badges

Certificates

Merit Points

House Points

Achievement Tokens

---

# Achievement Portfolio

Displays

Academic Awards

Sports

Music

Dance

Art

Olympiads

Coding

Debates

Competitions

Leadership

---

# Example Achievement

```text
District Science Fair

Gold Medal

Issued

12 July 2026
```

---

# Co-Curricular Activities

Tracks participation in

Sports

Music

Dance

Drama

Debate

NCC

Scouts

Coding Club

Robotics

Art Club

Eco Club

---

# Competency Dashboard

Displays competency mastery.

Example

Mathematics

Algebra

94%

Geometry

89%

Statistics

86%

English

Reading

96%

Writing

84%

Grammar

91%

---

# Competency Status

| Score | Status |
|---------|----------|
| 90-100 | Mastered |
| 75-89 | Proficient |
| 60-74 | Developing |
| Below 60 | Needs Support |

---

# Student Timeline

Every significant event becomes part of the student's permanent timeline.

Example

```text
Admission

↓

First Attendance

↓

Science Fair

↓

Homework Submitted

↓

Assessment Published

↓

PTM Conducted

↓

Behaviour Award

↓

Promotion
```

---

# Health Records

Displays

Blood Group

Medical Conditions

Allergies

Vaccination

Medical Leave

Emergency Contact

Vision

Hearing

Medical Notes

Access controlled.

---

# Counselling Records

Authorized staff may record

Counselling Date

Reason

Observations

Recommendations

Follow-up

Confidential Notes

Role-based visibility only.

---

# Intervention Plans

Teachers create structured intervention plans.

Example

Goal

Improve Algebra

Responsible

Teacher

Parent

Student

Duration

4 Weeks

Review Date

15 August

Status

In Progress

---

# Parent Engagement

Displays

Homework Monitoring

PTM Attendance

Messages

Notice Read Rate

Meeting Participation

Support Score

---

# Student Success Index

The Student Success Index combines

Academic Performance

Attendance

Assignments

Behaviour

Activities

Parent Engagement

Competencies

Example

| Component | Weight |
|------------|----------|
| Academics | 50% |
| Attendance | 20% |
| Assignments | 10% |
| Activities | 10% |
| Behaviour | 5% |
| Parent Engagement | 5% |

Overall Score

92

Outstanding

---

# AI Student Insights

Artificial Intelligence analyzes

Academic Growth

Behaviour Trends

Attendance

Learning Style

Competency Growth

Parent Engagement

Risk Factors

Achievements

---

# AI Examples

> Rahul consistently performs above the class average in analytical subjects.

---

> Attendance has improved by 8% over the last two months.

---

> English writing competency requires additional reinforcement.

---

> Student demonstrates strong leadership qualities during collaborative activities.

---

# Risk Detection

AI identifies

Academic Risk

Behaviour Risk

Attendance Risk

Mental Wellness Indicators (Future)

Dropout Risk

Performance Decline

Risk Levels

🟢 Low

🟡 Moderate

🟠 High

🔴 Critical

---

# Teacher Recommendations

Suggested actions

✔ Schedule PTM

✔ Assign remedial Mathematics

✔ Encourage debate participation

✔ Recognize leadership

✔ Monitor attendance

✔ Refer to counsellor

---

# Student360 Analytics

Displays

Academic Trend

Behaviour Trend

Attendance Trend

Achievement Growth

Competency Growth

Parent Engagement

Student Success Trend

---

# Student Comparison

Teachers may compare

Current Performance

↓

Previous Terms

↓

Class Average

↓

Section Average

↓

School Average

---

# Student360 Reports

Generate

Student Profile

Behaviour Report

Competency Report

Achievement Report

Health Summary

Intervention History

Parent Engagement

Student Success Report

Timeline Report

---

# Student360 Workflow

```text
Teacher Observation

↓

Student360 Updated

↓

AI Analysis

↓

Parent Notified (if applicable)

↓

Intervention Suggested

↓

Review Meeting

↓

Progress Updated
```

---

# API Endpoints

Student360 Dashboard

```http
GET /api/teacher/student360/{student}
```

Behaviour

```http
POST /api/teacher/student360/{student}/behaviour
```

Achievements

```http
POST /api/teacher/student360/{student}/achievement
```

Interventions

```http
POST /api/teacher/student360/{student}/intervention
```

Timeline

```http
GET /api/teacher/student360/{student}/timeline
```

AI Insights

```http
GET /api/teacher/student360/{student}/ai
```

Student Success Index

```http
GET /api/teacher/student360/{student}/success-index
```

---

# Database Tables

students

student_profiles

student_behaviour

behaviour_categories

student_achievements

student_activities

student_health

student_counselling

student_interventions

student_timelines

competencies

competency_scores

student_success_scores

parent_engagement

student_ai_insights

risk_predictions

---

# Permissions

| Action | Teacher |
|----------|----------|
| View Student360 | ✓ (Assigned Students) |
| Add Behaviour Record | ✓ |
| Add Achievement | ✓ |
| Create Intervention | ✓ |
| View Health Summary | Authorized |
| View Counselling Notes | Authorized |
| Delete Timeline Events | ✗ |

---

# Business Rules

- Every significant student event is recorded in the Student Timeline.
- Student360 updates automatically after attendance, assessments, assignments, or achievements.
- Behaviour entries are immutable after approval unless edited by authorized personnel.
- Counselling records are confidential and protected by role-based access.
- Student Success Index recalculates automatically whenever contributing data changes.
- AI recommendations never modify official records automatically.
- Every intervention plan has an owner, review date, and status.

---

# Future Enhancements

- AI Student Twin (Digital Learning Profile)
- Emotional Wellbeing Monitoring
- Learning Style Detection
- Career Aptitude Analysis
- University Readiness Index
- Early Dropout Prediction
- NEP 2020 Competency Dashboard
- National Benchmark Comparison
- Personalized Learning Path
- AI Student Coach

---

# 12.7 Communication & Parent Collaboration

## Overview

The Communication & Parent Collaboration module enables teachers to securely communicate with parents, students, counselors, administrators, and principals through a unified communication platform.

The next section will include:

- Messaging Hub
- Classroom Announcements
- Notices
- Parent Communication
- PTM Scheduling
- AI Message Assistant
- Communication Analytics
- Activity Feed
- Notification Engine
- APIs
- Database Design


