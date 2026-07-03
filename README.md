# FieldOps Backend API

FieldOps is a real-time, event-driven Field Service Management (FSM) platform that streamlines interactions between Customers, Dispatchers, and Field Technicians. The platform enables efficient service request handling, real-time job tracking, live communication, automated notifications, and AI-powered technician recommendations.

The frontend is designed to integrate seamlessly with a Next.js and Tailwind CSS application, while this repository focuses on the backend infrastructure, APIs, and database architecture.

---

# System Architecture

```text
                     [ Client / Frontend (Next.js + Tailwind) ]
                                   │           ▲
                       HTTPS REST  │           │  WebSockets
                        & Multipart│           │  Real-Time Messaging
                        Requests   ▼           ▼
                     ┌───────────────────────────────────────┐
                     │            Express API Layer          │
                     │   TypeScript • Helmet • Cookies      │
                     └──────────────────┬────────────────────┘
                                        │
              ┌─────────────────────────┼────────────────────────┐
              ▼                         ▼                        ▼
    ┌──────────────────┐      ┌──────────────────┐    ┌────────────────────┐
    │   PostgreSQL     │      │      Redis       │    │      AWS SDK       │
    │  Sequelize ORM   │      │   OTP Storage    │    │   SES & S3 APIs    │
    └──────────────────┘      └──────────────────┘    └────────────────────┘
```

---

# Technology Stack

## Backend Framework

* Node.js
* Express.js 5
* TypeScript

## Build and Package Management

* SWC (`@swc/core`) for fast transpilation
* pnpm for package management

## Database and ORM

* PostgreSQL
* Sequelize ORM
* UUID-based primary keys
* Transactional migrations and seeders

## Real-Time Communication

* Socket.IO
* Dedicated job-based chat rooms
* Live messaging between dispatchers and technicians

## Caching and Temporary Storage

* Redis
* OTP management with expiration support

## Cloud Services

### AWS S3

* Attachment storage
* Completion image uploads
* Pre-signed URL generation

### AWS SES

* Email verification
* Job assignment notifications
* Job completion receipts

## Security

* JWT Authentication
* HttpOnly Cookies
* bcrypt Password Hashing
* Helmet Security Middleware
* Zod Request Validation

## AI Integration

* OpenAI-powered recommendation engine
* Technician recommendations
* Intelligent workflow assistance
* Dynamic workload profiling

---

# Entity Overview

## Users

Stores:

* User profiles
* Authentication data
* Role information
* Password version history

**Roles**

* Customer
* Technician
* Dispatcher
* Default

## Address

Stores customer service locations and address details associated with users.

## Service Requests

Contains:

* Service descriptions
* Priority levels
* Attachments
* Customer issues

**Priority Levels**

* High
* Medium
* Low

## Jobs

Represents technician assignments and job progress.

**Job Statuses**

* Assigned
* En Route
* In Progress
* Completed

## Job Messages

Maintains chat history between dispatchers and field technicians for each job.

---

# Authentication

All protected endpoints require:

```http
Authorization: Bearer <token>
```

Request validation is performed using Zod schemas.

---

# API Endpoints

## Authentication (`/auth`)

### Request OTP

```http
POST /auth/request-otp
```

Generates a secure six-digit OTP and stores it in Redis.

### Verify Email

```http
POST /auth/verify-email
```

Validates the OTP stored in Redis.

### Register User

```http
POST /auth/register-with-otp
```

Creates a new user account and returns:

* Access Token
* Refresh Token

### Login

```http
POST /auth/login
```

Authenticates the user and creates secure sessions.

---

## Address APIs

### Add Address

```http
POST /address/add
```

Creates a new customer address.

### View Addresses

```http
GET /address/view
```

Returns all addresses associated with the authenticated customer.

---

## Service Request APIs

### Create Service Request

```http
POST /service-requests/add
```

Accepts multipart form data and uploads attachments to AWS S3.

### View Service Requests

```http
GET /service-requests/view
```

Returns all service requests created by the authenticated customer.

---

## Job APIs

### Assign Technician

```http
POST /jobs/assign
```

Assigns a technician to a service request.

### Update Job Status

```http
PATCH /jobs/:id/status
```

Updates job progress.

### Complete Job

```http
PATCH /jobs/:id/complete
```

Uploads completion data and triggers email notifications.

---

## Job Messaging APIs

### Get Messages

```http
GET /job-message/:id/message
```

Returns the complete chat history of a job.

---

# Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8080

DB_NAME=fieldops_db
DB_USERNAME=postgres
DB_PASSWORD=your_secure_password

AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=fieldops-assets-bucket

OPENAI_API_KEY=your_openai_api_key
```

---

# Getting Started

## Install Dependencies

```bash
pnpm install
```

## Run Database Migrations

```bash
pnpm sequelize db:migrate
```

## Seed Database

```bash
pnpm sequelize db:seed:all
```

## Start Development Server

```bash
pnpm dev
```

The server will start on:

```text
http://localhost:8080
```

---

# Features

* Event-driven architecture
* Real-time messaging with Socket.IO
* PostgreSQL with Sequelize ORM
* Redis-backed OTP verification
* AWS S3 file storage
* AWS SES email workflows
* JWT authentication and authorization
* Type-safe TypeScript codebase
* OpenAI-powered recommendation engine
* Production-ready backend infrastructure
