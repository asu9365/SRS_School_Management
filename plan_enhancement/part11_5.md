# 11.10 Fee Management & Digital Payments

---

# Overview

The Fee Management & Digital Payments module provides parents with a transparent, secure, and convenient platform for managing all school-related financial transactions.

Instead of manually collecting fees through cash counters or paper receipts, SchoolOS enables real-time fee tracking, online payments, installment plans, scholarship management, and digital receipts.

Every financial transaction is automatically linked to the student's profile, Parent Portal, Administration Portal, and Finance Dashboard.

The module integrates with:

- Student Information System
- Parent Portal
- Administration Portal
- Accounting Module
- Student360
- Notification Engine
- AI Intelligence Layer

---

# Objectives

The module aims to

- Digitize school fee collection.
- Improve payment transparency.
- Reduce administrative workload.
- Enable multiple payment methods.
- Generate instant receipts.
- Reduce overdue payments.
- Improve parent convenience.

---

# Fee Dashboard

Displays

- Outstanding Fees
- Paid Fees
- Upcoming Installments
- Scholarships
- Discounts
- Payment History
- Digital Receipts

---

# Fee Summary Card

Displays

| Item | Value |
|------|-------|
| Total Annual Fee | ₹52,000 |
| Paid | ₹39,000 |
| Outstanding | ₹13,000 |
| Next Due Date | 15 August 2026 |
| Installments Remaining | 1 |

Example

------------------------------------------------

Outstanding Fee

₹13,000

Next Due

15 August 2026

------------------------------------------------

---

# Fee Structure

Parents can view the complete fee breakdown.

Example

| Fee Head | Amount |
|-----------|---------|
| Tuition Fee | ₹30,000 |
| Admission Fee | ₹5,000 |
| Computer Fee | ₹3,500 |
| Laboratory Fee | ₹2,000 |
| Library Fee | ₹1,500 |
| Examination Fee | ₹2,000 |
| Sports Fee | ₹2,000 |
| Development Fee | ₹6,000 |

---

# Installment Management

Supports

- Monthly
- Quarterly
- Half-Yearly
- Annual

Example

| Installment | Due Date | Amount | Status |
|--------------|------------|-----------|----------|
| Installment 1 | 15 April | ₹13,000 | Paid |
| Installment 2 | 15 July | ₹13,000 | Paid |
| Installment 3 | 15 October | ₹13,000 | Pending |
| Installment 4 | 15 January | ₹13,000 | Upcoming |

---

# Online Payment

Supported payment methods

- UPI
- Debit Card
- Credit Card
- Net Banking
- Wallet
- NEFT / RTGS

Future

- Auto Debit
- EMI
- International Payments

---

# Payment Workflow

```text
Parent Opens Fee Dashboard

↓

Select Installment

↓

Choose Payment Method

↓

Payment Gateway

↓

Payment Successful

↓

Receipt Generated

↓

Notification Sent

↓

Finance Updated

↓

Student360 Updated
```

---

# Payment Gateway Integration

Recommended providers

- Razorpay
- PhonePe
- PayU
- Cashfree
- Stripe (International)

The system should support gateway switching through configuration without changing application code.

---

# Digital Receipts

Every successful payment generates

- Receipt Number
- Transaction ID
- Payment Date
- Payment Method
- Student Details
- QR Verification
- Digital Signature

Parents can

- Download PDF
- Print
- Email
- Share

---

# Payment History

Displays

| Date | Amount | Method | Status |
|---------|-----------|------------|----------|
| 15 Apr | ₹13,000 | UPI | Success |
| 15 Jul | ₹13,000 | Credit Card | Success |
| 20 Jul | ₹500 | Fine | Success |

Parents can search by

- Academic Session
- Transaction ID
- Date
- Payment Method

---

# Scholarships & Discounts

Displays

Scholarships

Sibling Discount

Staff Discount

Merit Scholarship

Government Scholarship

Financial Aid

Example

| Type | Amount |
|--------|----------|
| Merit Scholarship | ₹5,000 |
| Sibling Discount | ₹2,000 |

---

# Fine Management

The system automatically calculates

Late Fee

Penalty

Transport Fine

Library Fine

Example

```text
Late Fee

₹250

Applied after

7 Days
```

Administrators can configure

- Grace Period
- Penalty Rate
- Maximum Fine

---

# Refund Management

Parents can view

Refund Requests

Refund Status

Approved Refunds

Rejected Refunds

Refund History

Future

Online refund processing.

---

# Financial Analytics

Displays

Fee Paid %

Outstanding %

Scholarship %

Monthly Payment Trend

Payment Success Rate

Payment Method Distribution

---

# Payment Trend

```text
April

██████████

₹13,00,000

May

████████████

₹15,20,000

June

█████████

₹11,80,000
```

---

# Fee Alerts

Automatic reminders

Upcoming Due Date

Overdue Payment

Receipt Generated

Scholarship Approved

Fine Applied

Refund Processed

---

# AI Financial Assistant

Examples

> Next installment is due in five days.

---

> Paying before the due date will avoid late payment penalties.

---

> Your child is eligible for a merit scholarship review.

---

> Transport fee has increased due to route modification.

---

# Parent Actions

Parents can

- Pay Fees
- Download Receipt
- Download Invoice
- View Fee Structure
- Apply for Scholarship
- Raise Billing Query
- Request Refund

---

# Student360 Integration

Fee events update

Student Timeline

↓

Parent Dashboard

↓

Finance Dashboard

↓

Administration Portal

↓

Audit Logs

Timeline Example

```text
Fee Invoice Generated

↓

Payment Completed

↓

Receipt Downloaded

↓

Finance Updated
```

---

# API Endpoints

Fee Dashboard

```http
GET /api/parent/fees
```

Outstanding Fees

```http
GET /api/parent/fees/outstanding
```

Payment History

```http
GET /api/parent/payments
```

Pay Fee

```http
POST /api/parent/payments
```

Download Receipt

```http
GET /api/parent/payments/{id}/receipt
```

Scholarships

```http
GET /api/parent/scholarships
```

Refunds

```http
GET /api/parent/refunds
```

---

# Database Tables

fees

fee_heads

fee_installments

payments

payment_transactions

payment_receipts

scholarships

discounts

refunds

late_fees

finance_audit_logs

student_timelines

---

# Permissions

| Action | Parent |
|----------|----------|
| View Fee Details | ✓ |
| Pay Fees | ✓ |
| Download Receipt | ✓ |
| View Payment History | ✓ |
| Apply Scholarship | ✓ |
| Edit Fee Structure | ✗ |
| Approve Refund | ✗ |

---

# Business Rules

- Every payment generates a unique receipt.
- Payment records are immutable after confirmation.
- Online transactions require gateway verification.
- Fee reminders are sent automatically before due dates.
- Scholarships require administrative approval.
- Refunds follow school financial policies.

---

# Future Enhancements

- AutoPay / Standing Instructions
- EMI Payment Plans
- Dynamic Fee Calculator
- AI Financial Advisor
- Parent Expense Analytics
- Family Fee Dashboard
- GST Invoice Support
- International Currency Payments
- NFC Payment Support
- School Wallet

---

# 11.11 Reports & Downloads

## Overview

The Reports & Downloads module acts as the parent's digital document repository.

Parents can securely access and download every official academic, financial, attendance, and administrative document related to their child from a single location.

The next section will include

- Academic Reports
- Attendance Reports
- Fee Receipts
- Certificates
- Digital ID Card
- Transfer Certificate
- Bonafide Certificate
- AI Progress Reports
- PDF Generation
- QR Verification
- Digital Signatures



# 11.11 Reports & Downloads

---

# Overview

The Reports & Downloads module serves as the centralized digital document repository for parents. Every official academic, administrative, financial, attendance, and student-related document generated by SchoolOS is securely stored and made available through this module.

Instead of collecting printed documents from the school office, parents can instantly access authenticated digital copies from anywhere.

Every generated report includes:

- QR Code Verification
- Digital Signature
- Report Version
- Timestamp
- Audit Reference

This module integrates with:

- Student Information System
- Student360 Platform
- Assessment System
- Attendance Module
- Fee Management
- Administration Portal
- Document Management System

---

# Objectives

The module aims to

- Centralize all student documents.
- Eliminate paper dependency.
- Enable instant downloads.
- Ensure document authenticity.
- Support digital verification.
- Improve parent convenience.
- Maintain document history.

---

# Reports Dashboard

Displays

- Academic Reports
- Attendance Reports
- Examination Reports
- Assignment Reports
- Fee Receipts
- Student Certificates
- Administrative Documents
- AI Progress Reports

---

# Dashboard Layout

```text
-----------------------------------------------------

Reports & Downloads

-----------------------------------------------------

Academic Reports

Attendance Reports

Assessment Reports

Fee Receipts

Certificates

Documents

Downloads

-----------------------------------------------------
```

---

# Academic Reports

Parents may download

- Report Cards
- Progress Reports
- Academic Transcript
- Subject Analysis
- Competency Reports
- Student Success Report
- AI Academic Summary

Example

| Report | Status |
|----------|----------|
| Mid-Term Report | Available |
| Final Report | Available |
| Competency Report | Available |

---

# Attendance Reports

Available Reports

- Daily Attendance
- Weekly Attendance
- Monthly Attendance
- Yearly Attendance
- Leave History
- Attendance Certificate

Download Formats

- PDF
- Excel
- CSV

---

# Assessment Reports

Parents can download

- Marks Statement
- Grade Sheet
- Examination Analysis
- Class Ranking
- Subject Analysis
- Performance Comparison

---

# Assignment Reports

Displays

Assignment Completion

Submission History

Teacher Feedback

Assignment Analytics

Competency Contribution

Example

```text
Assignment Completion

96%

Average Score

91%

Late Submission

1
```

---

# Student360 Reports

Includes

Student Timeline

Behaviour Report

Achievement Report

Competency Growth

Student Success Index

Parent Engagement

Intervention History

AI Insights

---

# Achievement Portfolio

Parents may download

Academic Certificates

Sports Certificates

Competition Certificates

Olympiad Certificates

Music Certificates

Art Certificates

Coding Competition Awards

---

# Fee Reports

Available Documents

Fee Receipt

Payment History

Annual Fee Statement

Tax Receipt

Scholarship Statement

Refund Summary

Outstanding Balance Report

---

# Administrative Documents

Parents may access

Bonafide Certificate

Transfer Certificate

Migration Certificate

Character Certificate

Leaving Certificate

Admission Letter

Identity Card

Bus Pass

Medical Records (Authorized)

---

# Digital Student ID

Displays

Student Photograph

Admission Number

QR Code

Blood Group

Emergency Contact

Academic Session

Bus Route (Optional)

Library Membership

Future

NFC Enabled Digital ID

---

# Certificate Verification

Every document contains

QR Code

↓

Digital Signature

↓

Verification Number

↓

Issue Timestamp

↓

School Seal

Parents can verify authenticity online.

---

# Report Generation Workflow

```text
Parent Requests Report

↓

Permission Validation

↓

Generate PDF

↓

Apply Digital Signature

↓

Generate QR Code

↓

Store Document

↓

Download Available
```

---

# Export Formats

Supported

PDF

Excel

CSV

Image

Future

OpenDocument (ODF)

---

# Report Filters

Parents can filter reports by

Academic Session

↓

Term

↓

Subject

↓

Report Type

↓

Date

↓

Category

---

# Search

Parents may search by

Document Name

↓

Academic Session

↓

Certificate Number

↓

Student Name

↓

Issue Date

---

# AI Progress Report

Artificial Intelligence generates comprehensive reports.

Example

> Rahul has shown continuous improvement in Mathematics and Computer Science while maintaining excellent attendance. English writing competency remains the primary improvement area.

---

# Download History

Displays

Document

↓

Download Date

↓

Device

↓

IP Address

↓

Version

Example

| Document | Downloaded |
|------------|--------------|
| Report Card | 12 Jul 2026 |
| Fee Receipt | 14 Jul 2026 |
| Attendance Report | 18 Jul 2026 |

---

# Favorite Documents

Parents may bookmark

Frequently Downloaded Reports

Certificates

Fee Receipts

Student ID

Academic Transcript

---

# Offline Availability

Future Enhancement

Recently downloaded documents remain available offline within the mobile application.

---

# Notification Integration

Parents receive notifications when

Report Published

↓

Certificate Issued

↓

Receipt Generated

↓

Document Updated

↓

Transfer Certificate Ready

↓

Scholarship Approved

---

# Student360 Integration

Every generated report updates

Student Timeline

↓

Document Repository

↓

Audit Logs

↓

Parent Dashboard

---

# Timeline Example

```text
Report Card Published

↓

Parent Downloaded

↓

Certificate Issued

↓

Student360 Updated
```

---

# Reports Analytics

Displays

Most Downloaded Reports

Monthly Downloads

Document Categories

Parent Activity

Certificate Issuance

Academic Report Views

---

# API Endpoints

Reports

```http
GET /api/parent/reports
```

Academic Reports

```http
GET /api/parent/reports/academic
```

Attendance Reports

```http
GET /api/parent/reports/attendance
```

Certificates

```http
GET /api/parent/certificates
```

Fee Documents

```http
GET /api/parent/reports/finance
```

Student ID

```http
GET /api/parent/student-id
```

Download Document

```http
GET /api/parent/documents/{id}/download
```

Verify Document

```http
GET /api/documents/verify/{verification_code}
```

---

# Database Tables

documents

document_categories

document_versions

document_downloads

report_cards

academic_reports

attendance_reports

fee_receipts

student_certificates

student_identity_cards

digital_signatures

verification_codes

student_timelines

audit_logs

---

# Permissions

| Action | Parent |
|----------|----------|
| View Reports | ✓ |
| Download Reports | ✓ |
| Verify Documents | ✓ |
| Share Report | ✓ |
| Delete Documents | ✗ |
| Edit Documents | ✗ |

---

# Business Rules

- Every report has a unique document ID.
- Documents are version controlled.
- QR verification is mandatory for official reports.
- Download activity is recorded in audit logs.
- Historical reports cannot be modified.
- Deleted reports remain archived according to school retention policy.

---

# Future Enhancements

- Blockchain Document Verification
- Digital Locker Integration
- DigiLocker Integration
- AI Report Narration
- Multilingual Report Cards
- Interactive Digital Report Cards
- Electronic Signature Workflow
- Secure Document Sharing
- One-Click University Applications
- Cloud Archive

---

# 11.12 Parent Portal External Integrations

## Overview

The Parent Portal integrates with both internal SchoolOS modules and external third-party services to provide a seamless digital experience.

Internal Integrations

- Student360
- Attendance
- Assessments
- Assignments
- Communication
- Fee Management
- Notifications
- AI Intelligence

External Integrations

- Payment Gateways (Razorpay, PhonePe, Stripe)
- SMS Providers
- Email Services
- Google Calendar
- Microsoft Outlook
- Google Meet
- Microsoft Teams
- DigiLocker (Future)
- WhatsApp Business (Future)
- Aadhaar/eKYC (Optional)
- National Academic Repositories (Future)

The next section (**11.13**) will conclude the Parent Portal with:

- Complete Database Schema
- Entity Relationships
- RBAC Matrix
- Business Rules
- KPIs
- Future Roadmap
- Parent Portal Deliverables
- Module Conclusion

This will complete **Part 11 – Parent Portal** before we begin **Part 12 – Teacher Workspace**.



# 11.13 Parent Portal Database Schema

---

# Overview

The Parent Portal is not an isolated module. It serves as an aggregation layer that consumes data from nearly every SchoolOS subsystem while maintaining very few independent tables.

The Parent Portal primarily operates through secured APIs and role-based access control, ensuring that parents have read-only access to authorized student information while retaining interaction capabilities such as messaging, fee payments, PTM requests, and leave applications.

---

# Database Architecture

```text
                    Parent
                       │
                       │
               parent_students
                       │
                       ▼
                   Students
      ┌────────────┬─────────────┬────────────┐
      │            │             │            │
 Attendance   Assessments   Assignments   Student360
      │            │             │            │
      └────────────┴──────┬──────┴────────────┘
                           │
                     Parent Portal APIs
                           │
               Dashboard / Reports / AI
```

---

# Core Tables

## Parent Module

```sql
parents
```

Stores parent profile.

Fields

- id
- school_id
- user_id
- father_name
- mother_name
- guardian_name
- occupation
- annual_income
- address
- emergency_contact
- created_at
- updated_at

---

## Parent Student Mapping

```sql
parent_students
```

Purpose

Maps parents with one or multiple students.

Fields

- id
- parent_id
- student_id
- relationship
- is_primary
- created_at

Supports

✓ Father

✓ Mother

✓ Guardian

✓ Foster Parent

---

## Parent Engagement

```sql
parent_engagement
```

Stores engagement metrics.

Fields

- id
- student_id
- parent_id
- ptm_score
- communication_score
- homework_score
- notice_score
- engagement_index
- calculated_at

---

## Parent Leave Requests

```sql
leave_requests
```

Fields

- id
- student_id
- parent_id
- leave_type
- start_date
- end_date
- reason
- attachment
- status
- approved_by
- approved_at

---

## Parent Meetings

```sql
meetings
```

Fields

- id
- student_id
- parent_id
- teacher_id
- meeting_type
- scheduled_at
- status
- meeting_link
- notes

---

## Parent Messages

```sql
message_threads
messages
message_attachments
```

Stores complete communication history.

---

## Parent Notifications

```sql
notifications
notification_logs
```

Stores

- delivery
- read status
- click tracking
- notification channels

---

# Related Tables

The Parent Portal consumes data from

attendance_records

assessment_results

report_cards

assignments

assignment_submissions

competency_scores

student_success_scores

student_behaviour

student_achievements

student_timelines

payments

payment_receipts

documents

---

# Entity Relationships

```text
Parent
   │
   ├────────────┐
   │            │
ParentStudent   ParentEngagement
   │
Student
   │
   ├── Attendance
   ├── Assessments
   ├── Assignments
   ├── Behaviour
   ├── Student360
   ├── Documents
   ├── Payments
   └── Notifications
```

---

# Indexing Strategy

Indexes

parent_id

student_id

school_id

user_id

meeting_date

status

notification_status

payment_status

---

# Database Optimization

Recommended

Composite Indexes

(parent_id, student_id)

(student_id, academic_session)

(parent_id, notification_status)

Partition

attendance_records

notifications

student_timelines

---

# Estimated Table Sizes

| Table | Estimated Records |
|---------|------------------|
| parents | 20,000 |
| parent_students | 35,000 |
| messages | 3 Million |
| notifications | 12 Million |
| leave_requests | 80,000 |
| meetings | 150,000 |

---

# 11.14 RBAC (Role-Based Access Control)

---

# Parent Permissions

| Module | View | Create | Update | Delete |
|----------|------|---------|---------|---------|
| Dashboard | ✓ | ✗ | ✗ | ✗ |
| Attendance | ✓ | Leave Only | ✗ | ✗ |
| Homework | ✓ | ✗ | ✗ | ✗ |
| Assignments | ✓ | ✗ | ✗ | ✗ |
| Assessments | ✓ | ✗ | ✗ | ✗ |
| Student360 | ✓ | ✗ | ✗ | ✗ |
| Reports | ✓ | ✗ | ✗ | ✗ |
| Fees | ✓ | Payment | ✗ | ✗ |
| Messages | ✓ | ✓ | ✓ | ✗ |
| PTM | ✓ | Request | Reschedule | Cancel |
| Notifications | ✓ | ✗ | Mark Read | ✗ |

---

# Security Policies

Parents

Can only access

Their own children.

Cannot

Edit marks.

Cannot

Modify attendance.

Cannot

View unrelated students.

Cannot

Modify academic records.

---

# Authentication

Supported

Laravel Sanctum

JWT (Future)

OAuth

Google Login (Future)

Microsoft Login (Future)

OTP Verification

Two-Factor Authentication (Future)

---

# Session Management

Automatic Logout

30 Minutes Inactivity

Refresh Token

Remember Device

Login History

Active Sessions

---

# Audit Logging

Every action recorded.

Examples

Login

Download Report

Fee Payment

Leave Request

PTM Booking

Message Sent

Notification Read

---

# 11.15 Parent Portal KPIs

---

The system continuously measures

Parent Login Frequency

Homework Monitoring Rate

Notice Read Rate

PTM Attendance

Average Response Time

Parent Satisfaction

Communication Rate

Fee Payment Timeliness

Assignment Monitoring

Attendance Review Frequency

---

# KPI Dashboard

Example

| KPI | Value |
|------|--------|
| Parent Engagement | 93% |
| PTM Attendance | 96% |
| Homework Monitoring | 91% |
| Notice Read Rate | 98% |
| Fee Payment On Time | 94% |

---

# AI KPIs

Artificial Intelligence evaluates

Parent Involvement

Academic Support

Homework Supervision

Communication Quality

Attendance Awareness

Intervention Success

---

# Future Roadmap

Phase 1

✓ Parent Dashboard

✓ Attendance

✓ Assessments

✓ Homework

✓ Fees

---

Phase 2

✓ Student360

✓ AI Insights

✓ PTM

✓ Reports

---

Phase 3

- AI Parent Coach
- Voice Assistant
- Family Dashboard
- AI Homework Helper
- Personalized Learning Plans

---

Phase 4

- WhatsApp Integration
- DigiLocker
- Blockchain Certificates
- Digital Wallet
- Smart Parent Analytics

---

# Parent Portal Deliverables

The Parent Portal provides

✓ Comprehensive Child Dashboard

✓ Attendance Monitoring

✓ Homework Tracking

✓ Assignment Analytics

✓ Examination Reports

✓ Student360 Access

✓ Competency Tracking

✓ Achievement Portfolio

✓ AI Academic Insights

✓ Parent–Teacher Messaging

✓ PTM Scheduling

✓ Online Fee Payments

✓ Reports & Downloads

✓ Secure Document Repository

✓ AI Recommendations

✓ Real-Time Notifications

✓ Parent Engagement Analytics

✓ Complete Student Timeline

---

# Module Summary

The Parent Portal transforms parents from passive observers into active participants in their child's educational journey.

Rather than simply displaying academic records, it provides a holistic, intelligent, and collaborative platform where parents, teachers, and school administrators work together to improve student success.

The Parent Portal is tightly integrated with Student360, AI Intelligence, Communication Hub, Attendance, Assessments, Assignments, Finance, and Analytics, making it one of the core pillars of the SchoolOS ecosystem.

---

# End of Part 11

**Status:** ✅ Complete

Approximate Documentation Size

- ~65 pages
- ~12,000+ words
- 60+ UI Components
- 40+ API Endpoints
- 20+ Database Tables Referenced
- Complete Enterprise Functional Specification