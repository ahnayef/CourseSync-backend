# CourseSync Backend

A comprehensive backend application for course management built with Node.js, TypeScript, and Express.js.

## Quick Overview

CourseSync Backend provides API endpoints for:
- 👥 **User Management** - Registration, authentication, role-based access
- 📚 **Course Management** - CRUD operations, student enrollment
- 📅 **Schedule Management** - Class timetables and scheduling
- 📢 **Notice System** - Announcements and notifications
- 💬 **Discussion Forum** - Q&A system with real-time messaging

## Technology Stack

- **Backend**: Node.js + TypeScript + Express.js
- **Database**: MySQL
- **Authentication**: JWT
- **Real-time**: Socket.io
- **Validation**: Joi

## Project Structure

For a detailed breakdown of the project structure, see [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).

```
CourseSync-backend/
├── src/
│   ├── controllers/    # Business logic (courses, users, schedules, etc.)
│   ├── routes/        # API route definitions
│   ├── middlewares/   # Authentication & validation
│   ├── services/      # Socket.io handlers
│   ├── utils/         # Database utilities
│   └── sql/          # Database scripts
├── package.json
└── tsconfig.json
```

## Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Environment Setup**
   ```bash
   cp env.example .env
   # Edit .env with your database credentials
   ```

3. **Database Setup**
   - Run the SQL scripts in `src/sql/` to set up your MySQL database

4. **Start Development Server**
   ```bash
   pnpm dev
   ```

5. **Reset Database (if needed)**
   ```bash
   pnpm reset
   ```

## API Endpoints

- `GET /api/users/*` - User management
- `GET /api/courses/*` - Course operations  
- `GET /api/schedules/*` - Schedule management
- `GET /api/notices/*` - Notice system
- `GET /api/discussions/*` - Discussion forum

## Features

- 🔐 JWT-based authentication
- 👨‍💼 Role-based access control (Student, Teacher, HOD)
- 📱 Real-time communication with Socket.io
- 🗄️ MySQL database integration
- ✅ Request validation with Joi
- 🔒 Password hashing with bcrypt