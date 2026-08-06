# =============================================================================
# 12.12 Teacher Workspace Database Schema & Architecture
# =============================================================================

Version: 1.0

Module: Teacher Workspace

Section: Database Architecture

Status: Enterprise Design Specification

---

# Overview

The Teacher Workspace database architecture is designed using a fully normalized relational model with support for high scalability, multi-tenancy, auditability, and AI-driven analytics.

The database serves as the operational backbone of the Teacher Workspace and integrates seamlessly with Student360, Attendance, Assessments, Assignments, Communication, AI Intelligence, and Reporting modules.

The architecture follows

- Third Normal Form (3NF)
- Multi-Tenant Design
- Soft Deletes
- Event Sourcing
- Audit Logging
- Read Optimization
- Horizontal Scalability

---

# Architecture Principles

The schema is designed with the following principles

✓ No Data Duplication

✓ Referential Integrity

✓ Tenant Isolation

✓ Auditability

✓ Extensibility

✓ Performance Optimization

✓ AI Compatibility

✓ Analytics Ready

---

# High-Level Database Architecture

```text
                    schools
                        │
                        │
        ─────────────────────────────────────
                        │
                   teacher_profiles
                        │
      ┌─────────────────┼─────────────────┐
      │                 │                 │
teacher_classes   teacher_subjects   teacher_roles
      │                 │                 │
      └────────────┬────┴─────────────────┘
                   │
             Teacher Workspace
                   │
────────────────────────────────────────────────────────
Attendance
Assignments
Assessments
Gradebook
Lesson Plans
Student360
Communication
Reports
AI
────────────────────────────────────────────────────────
```

---

# Multi-Tenant Strategy

Every table contains

```sql
school_id
```

This guarantees complete tenant isolation.

Example

```sql
teacher_profiles

id

school_id

user_id

employee_code

department_id

designation_id
```

---

# Core Teacher Tables

## teacher_profiles

Stores professional information.

```text
id

school_id

user_id

employee_code

designation_id

department_id

joining_date

employment_status

experience

qualification

created_at

updated_at

deleted_at
```

---

## teacher_classes

Stores class assignments.

```text
id

school_id

teacher_id

class_id

section_id

academic_year_id

is_class_teacher
```

---

## teacher_subjects

Stores subject assignments.

```text
id

teacher_id

subject_id

class_id

section_id
```

---

## teacher_timetable

Stores timetable entries.

```text
id

teacher_id

weekday

period

room_id

subject_id

class_id

section_id

start_time

end_time
```

---

# Lesson Planning Tables

lesson_plans

lesson_plan_resources

lesson_plan_objectives

lesson_plan_competencies

lesson_plan_versions

lesson_templates

lesson_comments

---

# Attendance Tables

attendance_sessions

attendance_records

attendance_corrections

attendance_logs

attendance_statistics

attendance_rules

---

# Assignment Tables

assignments

assignment_files

assignment_resources

assignment_submissions

assignment_feedback

assignment_rubrics

assignment_statistics

assignment_versions

---

# Assessment Tables

assessments

assessment_types

assessment_schedule

assessment_results

marks

gradebooks

grading_rules

rubrics

rubric_scores

assessment_statistics

---

# Student360 Tables

student_profiles

student_behaviour

student_achievements

student_health

student_counselling

student_interventions

student_timelines

student_success_scores

competency_scores

student_ai_insights

---

# Communication Tables

messages

message_threads

message_attachments

announcements

notifications

meeting_requests

meeting_notes

communication_logs

---

# AI Tables

ai_requests

ai_responses

ai_usage_logs

ai_models

risk_predictions

learning_plans

teacher_ai_preferences

prompt_templates

---

# Reports Tables

report_templates

generated_reports

report_exports

analytics_cache

dashboard_widgets

dashboard_snapshots

---

# Audit Tables

audit_logs

activity_logs

security_logs

login_history

api_logs

system_events

---

# Entity Relationships

```text
Teacher

│

├──────── teacher_classes

│

├──────── teacher_subjects

│

├──────── timetable

│

├──────── lesson_plans

│

├──────── attendance

│

├──────── assignments

│

├──────── assessments

│

├──────── reports

│

├──────── communication

│

└──────── AI
```

---

# Student Relationships

```text
Student

│

├──────── attendance

├──────── assessments

├──────── assignments

├──────── competencies

├──────── behaviour

├──────── achievements

├──────── Student360

└──────── reports
```

---

# Database Normalization

Level

✓ 1NF

✓ 2NF

✓ 3NF

Future

BCNF

where appropriate.

---

# Foreign Keys

Examples

```sql
teacher_profiles.user_id

→ users.id
```

```sql
teacher_classes.class_id

→ classes.id
```

```sql
assessment_results.student_id

→ students.id
```

```sql
assignment_submissions.assignment_id

→ assignments.id
```

---

# Indexing Strategy

Primary Indexes

teacher_id

student_id

class_id

section_id

subject_id

school_id

---

Composite Indexes

```text
school_id + class_id

teacher_id + class_id

student_id + academic_year

assessment_id + student_id

assignment_id + student_id
```

---

# Full-Text Search

Enabled on

Lesson Plans

Messages

Announcements

Teacher Notes

Student Remarks

AI Responses

---

# Soft Deletes

Enabled for

teacher_profiles

lesson_plans

assignments

announcements

messages

reports

Files remain recoverable.

---

# Version Control

Versioning enabled for

Lesson Plans

Assignments

Question Papers

Rubrics

Generated Reports

AI Documents

---

# Partitioning Strategy

Large tables

attendance_records

messages

notifications

audit_logs

student_timelines

Partition by

Academic Year

↓

School

↓

Month

---

# Archiving Policy

Older than

5 Years

↓

Archive Database

↓

Read Only

↓

Cloud Storage

---

# Caching Strategy

Redis caches

Teacher Dashboard

Timetable

Attendance Summary

Analytics

Student360

Dashboard Widgets

Notification Counts

---

# Queue System

Background jobs

Report Generation

↓

Email

↓

SMS

↓

Notifications

↓

AI Processing

↓

PDF Generation

↓

Analytics

---

# Storage

Database

MySQL 8

Redis Cache

Object Storage

AWS S3

Local (Development)

---

# Performance Optimization

Read Replicas

↓

Query Optimization

↓

Redis

↓

Lazy Loading

↓

Eager Loading

↓

Database Indexes

↓

Background Workers

---

# Backup Strategy

Daily Incremental

↓

Weekly Full Backup

↓

Monthly Archive

↓

Encrypted Cloud Backup

---

# Security

Encrypted Columns

Salary

Government IDs

Medical Data

Personal Contact

Audit Logs

---

# Database Monitoring

Monitor

Connections

Queries

Deadlocks

Slow Queries

Replication

Storage

Index Usage

Cache Hit Ratio

---

# Estimated Scale

Supports

100 Schools

↓

5,000 Teachers

↓

100,000 Students

↓

10 Million Attendance Records

↓

50 Million Messages

↓

200 Million Audit Logs

Without schema changes.

---

# Database Conventions

Primary Keys

id

Foreign Keys

*_id

Booleans

is_*

Dates

*_at

Soft Delete

deleted_at

UUID

Optional

created_at

updated_at

timestamps

---

# Database Naming Standards

Tables

snake_case

Columns

snake_case

Indexes

idx_

Foreign Keys

fk_

Unique Keys

uk_

---

# Business Rules

- Every table is tenant-aware using `school_id`.
- All academic records are immutable after publication unless reopened by an authorized workflow.
- Foreign key constraints must enforce referential integrity.
- Audit logging is mandatory for all create, update, delete, and publish operations.
- Large reporting queries should use precomputed analytics tables or cached views where possible.
- Personally identifiable information (PII) must be encrypted at rest where applicable.
- Database migrations must be backward compatible for one major release cycle.

---

# Future Enhancements

- PostgreSQL Support
- Read/Write Database Splitting
- Event Store Database
- Data Warehouse
- OLAP Analytics
- Graph Database for Student Relationships
- AI Feature Store
- Real-Time Streaming Analytics
- Multi-Region Replication
- Lakehouse Architecture

---

# Next Section

## 12.13 Teacher Workspace RBAC & Security

The next section will include

- Complete Permission Matrix
- Role Hierarchy
- Authorization Policies
- Session Management
- MFA
- Audit Trails
- Data Privacy
- Security Architecture
- Compliance
- Incident Logging
- Zero Trust Principles



# =============================================================================
# 12.13 Teacher Workspace RBAC & Security
# =============================================================================

Version: 1.0

Module: Teacher Workspace

Section: Role-Based Access Control & Security

Status: Enterprise Security Specification

---

# Overview

The Teacher Workspace implements a comprehensive Role-Based Access Control (RBAC) framework combined with modern security practices to ensure that every user can access only the information and functionality appropriate to their role.

The security model follows the Principle of Least Privilege (PoLP), ensuring teachers can only view and modify data related to their assigned responsibilities.

Every operation performed within the Teacher Workspace is authenticated, authorized, audited, and monitored.

The module integrates with

- Authentication Service
- Identity Management
- Student360
- Audit Engine
- API Gateway
- Notification Service
- Security Monitoring
- Administration Portal

---

# Objectives

The RBAC module aims to

- Protect student data.
- Enforce least-privilege access.
- Prevent unauthorized actions.
- Maintain audit trails.
- Support regulatory compliance.
- Secure APIs.
- Enable secure collaboration.

---

# Security Architecture

```text
                User Login

                     │

           Authentication Layer

                     │

             Authorization Layer

                     │

         Role-Based Access Control

                     │

          Permission Verification

                     │

             Business Validation

                     │

             Database Operation

                     │

               Audit Logging
```

---

# Authentication

Supported Methods

- Email + Password
- Employee ID + Password
- OTP Verification
- Google Login (Future)
- Microsoft Login (Future)
- LDAP / Active Directory (Enterprise)
- SAML 2.0 SSO (Enterprise)
- OAuth2

---

# Multi-Factor Authentication (MFA)

Supports

Email OTP

SMS OTP

Authenticator App

Hardware Security Keys (Future)

Biometric Authentication (Mobile)

---

# Session Management

Features

Secure Session Tokens

Idle Session Timeout

Concurrent Session Detection

Device Management

Trusted Devices

Forced Logout

Session History

---

# Default Session Policy

| Setting | Value |
|----------|--------|
| Session Timeout | 30 Minutes |
| Remember Me | 30 Days |
| Concurrent Sessions | Configurable |
| Token Refresh | Automatic |

---

# Password Policy

Requirements

Minimum Length

12 Characters

Uppercase Required

✓

Lowercase Required

✓

Number Required

✓

Special Character Required

✓

Password Expiry

Optional (Configurable)

Password History

Last 5 Passwords

---

# Role Hierarchy

```text
Super Administrator

↓

Platform Administrator

↓

School Administrator

↓

Principal

↓

Vice Principal

↓

Department Head

↓

Teacher

↓

Counsellor

↓

Support Staff

↓

Parent

↓

Student
```

---

# Teacher Permission Matrix

| Module | View | Create | Update | Delete | Approve |
|----------|------|---------|---------|---------|----------|
| Dashboard | ✓ | ✗ | ✗ | ✗ | ✗ |
| Attendance | ✓ | ✓ | ✓* | ✗ | ✗ |
| Assignments | ✓ | ✓ | ✓ | ✓** | ✗ |
| Assessments | ✓ | ✓ | ✓ | ✗ | Policy |
| Gradebook | ✓ | ✓ | ✓ | ✗ | Policy |
| Student360 | ✓ | ✓ | ✓ | ✗ | ✗ |
| Behaviour | ✓ | ✓ | ✓ | ✗ | ✗ |
| Reports | ✓ | ✓ | ✗ | ✗ | ✗ |
| Messaging | ✓ | ✓ | ✓ | Soft Delete | ✗ |
| Lesson Plans | ✓ | ✓ | ✓ | ✓ | ✗ |

* Before lock

** Only before student submissions

---

# Data Access Policy

Teachers can access only

Assigned Classes

↓

Assigned Sections

↓

Assigned Subjects

↓

Assigned Students

↓

Authorized Reports

---

# Authorization Flow

```text
User Request

↓

Authentication

↓

Role Check

↓

Permission Check

↓

School Scope

↓

Class Scope

↓

Business Rule

↓

Database Access

↓

Audit Log
```

---

# Object-Level Permissions

Every record validates

School

↓

Academic Session

↓

Teacher Assignment

↓

Subject Assignment

↓

Student Assignment

---

# API Authorization

Each API verifies

Authentication

↓

Role

↓

Permission

↓

Tenant

↓

Resource Ownership

↓

Rate Limit

↓

Request Validity

---

# Data Privacy

Protected Information

Medical Records

↓

Counselling Notes

↓

Personal Contact Information

↓

Government IDs

↓

Salary Information

↓

Disciplinary Records

Requires elevated permissions.

---

# Encryption

Encryption at Rest

AES-256

Encryption in Transit

TLS 1.3

Password Hashing

Argon2id

API Tokens

Encrypted

Sensitive Columns

Encrypted

---

# File Security

Uploaded files are

Virus Scanned

↓

Permission Checked

↓

Encrypted

↓

Version Controlled

↓

Audit Logged

---

# Audit Logging

Every action records

User ID

Role

Timestamp

IP Address

Device

Action

Entity

Record ID

Before Value

After Value

Status

---

# Audit Example

```text
User

Teacher-102

Action

Updated Attendance

Class

VIII-A

Student

SRHS-2026-101

Time

10:24 AM

Status

Success
```

---

# Security Monitoring

Continuously monitors

Failed Logins

↓

Permission Violations

↓

Suspicious API Calls

↓

Brute Force Attempts

↓

Session Hijacking

↓

Data Export Activity

↓

Privilege Escalation

---

# Incident Response

Workflow

```text
Security Event

↓

Detection

↓

Alert

↓

Investigation

↓

Containment

↓

Resolution

↓

Audit Report

```

---

# Data Loss Prevention (DLP)

Prevents

Bulk Student Export

↓

Unauthorized Downloads

↓

External Sharing

↓

Sensitive Data Leakage

↓

Mass Record Modification

---

# Rate Limiting

| Endpoint | Limit |
|------------|---------|
| Login | 10/min |
| Attendance | 60/min |
| Reports | 30/min |
| AI | 20/min |
| Search | 100/min |

---

# Device Management

Teachers can view

Active Devices

↓

Login History

↓

Browser

↓

Operating System

↓

Location (Approximate)

↓

Last Activity

---

# Notification Security

Security notifications

New Login

↓

Password Changed

↓

MFA Disabled

↓

Profile Updated

↓

New Device

↓

API Token Generated

---

# Compliance

Designed to support

FERPA (US)

GDPR (EU)

COPPA (US)

NEP 2020 (India)

School Data Protection Policies

ISO 27001 Best Practices

OWASP ASVS Guidelines

---

# Backup & Recovery

Security backups

Daily Incremental

↓

Weekly Full

↓

Encrypted Storage

↓

Recovery Validation

↓

Disaster Recovery Testing

---

# Security KPIs

Measures

Authentication Success Rate

Failed Login Attempts

Permission Violations

Audit Coverage

Encryption Coverage

Incident Resolution Time

MFA Adoption

API Abuse Detection

---

# API Endpoints

Current Session

```http
GET /api/v1/teacher/security/session
```

Active Devices

```http
GET /api/v1/teacher/security/devices
```

Login History

```http
GET /api/v1/teacher/security/logins
```

Change Password

```http
PUT /api/v1/teacher/security/password
```

Enable MFA

```http
POST /api/v1/teacher/security/mfa
```

Security Logs

```http
GET /api/v1/teacher/security/audit
```

---

# Database Tables

roles

permissions

role_permissions

user_roles

security_policies

login_history

active_sessions

trusted_devices

api_tokens

audit_logs

security_events

permission_cache

mfa_devices

password_history

---

# Business Rules

- Every request must be authenticated before authorization.
- Every authorization decision must be logged.
- Teachers cannot access data outside their assigned classes.
- Sensitive data requires additional permission validation.
- Audit logs are immutable.
- Security events trigger administrator alerts based on severity.
- Passwords are never stored in plain text.
- MFA is mandatory for privileged administrative accounts.

---

# Future Enhancements

- Zero Trust Architecture
- Risk-Based Authentication
- AI Fraud Detection
- Continuous Authentication
- Passwordless Login
- Hardware Security Keys (FIDO2)
- Behavioral Biometrics
- Data Classification Engine
- Security Dashboard
- SIEM Integration

---

# Next Section

## 12.14 Teacher Workspace KPIs & Operational Monitoring

The next section will include

- Teaching KPIs
- Student Success Metrics
- Classroom Health Indicators
- Productivity Monitoring
- SLA Monitoring
- Operational Dashboards
- AI Performance Metrics
- Executive KPIs
- Alert Thresholds
- Continuous Improvement Framework