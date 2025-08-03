# CourseSync Backend - Project Structure

## Overview
CourseSync is a backend application for course management built with Node.js, TypeScript, and Express.js. It provides API endpoints for managing courses, users, schedules, notices, and discussion forums with real-time communication capabilities.

## Technology Stack
- **Runtime**: Node.js with TypeScript
- **Web Framework**: Express.js
- **Database**: MySQL (with mysql2 driver)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Real-time Communication**: Socket.io
- **Validation**: Joi
- **Development**: nodemon, ts-node, tsx

## Project Tree Structure

```
CourseSync-backend/
├── src/                           # Main source directory
│   ├── constants/                 # Application constants
│   │   └── db.constants.ts        # Database configuration constants
│   ├── controllers/               # Business logic controllers
│   │   ├── courses/               # Course management controllers
│   │   │   ├── addStudent.ts      # Add student to course
│   │   │   ├── create.ts          # Create new course
│   │   │   ├── delete.ts          # Delete course
│   │   │   ├── get.ts             # Get user's courses
│   │   │   ├── getAll.ts          # Get all courses
│   │   │   ├── getOne.ts          # Get specific course details
│   │   │   ├── getPeople.ts       # Get course participants
│   │   │   ├── hodGet.ts          # HOD-specific course operations
│   │   │   ├── removeStudent.ts   # Remove student from course
│   │   │   └── update.ts          # Update course information
│   │   ├── discussion/            # Discussion/Q&A system controllers
│   │   │   ├── deleteQuestion.ts  # Delete discussion question
│   │   │   ├── getAnswers.ts      # Get answers for a question
│   │   │   ├── getOneQue.ts       # Get specific question details
│   │   │   ├── getQuestions.ts    # Get all questions
│   │   │   └── message.ts         # Handle discussion messages
│   │   ├── notices/               # Notice/announcement controllers
│   │   │   ├── create.ts          # Create new notice
│   │   │   ├── delete.ts          # Delete notice
│   │   │   └── get.ts             # Get notices
│   │   ├── schedules/             # Schedule management controllers
│   │   │   ├── create.ts          # Create new schedule
│   │   │   ├── delete.ts          # Delete schedule
│   │   │   ├── get.ts             # Get schedules
│   │   │   ├── hodGet.ts          # HOD-specific schedule operations
│   │   │   └── update.ts          # Update schedule
│   │   └── user/                  # User management controllers
│   │       ├── addHOD.ts          # Add Head of Department
│   │       ├── delete.ts          # Delete user
│   │       ├── getAllHODs.ts      # Get all HODs
│   │       ├── getOne.ts          # Get specific user
│   │       ├── getTeachers.ts     # Get all teachers
│   │       ├── hodGet.ts          # HOD-specific user operations
│   │       ├── login.ts           # User authentication
│   │       ├── resetPass.ts       # Password reset
│   │       ├── resgister.ts       # User registration
│   │       ├── toggleBan.ts       # Ban/unban user
│   │       ├── updateHOD.ts       # Update HOD information
│   │       └── updateRole.ts      # Update user role
│   ├── middlewares/               # Express middleware
│   │   └── authMiddleware.ts      # JWT authentication middleware
│   ├── routes/                    # API route definitions
│   │   ├── courses.router.ts      # Course-related routes
│   │   ├── disscussion.router.ts  # Discussion-related routes
│   │   ├── notices.router.ts      # Notice-related routes
│   │   ├── routes.ts              # Main router configuration
│   │   ├── schedules.router.ts    # Schedule-related routes
│   │   └── user.router.ts         # User-related routes
│   ├── scripts/                   # Utility scripts
│   │   └── reset.ts               # Database reset script
│   ├── services/                  # Application services
│   │   └── socketHandler.ts       # Socket.io event handlers
│   ├── sql/                       # Database scripts
│   │   ├── create.sql             # Database creation script
│   │   └── drop.sql               # Database drop script
│   ├── utils/                     # Utility functions
│   │   └── db.util.ts             # Database utility functions
│   └── index.ts                   # Application entry point
├── .gitignore                     # Git ignore rules
├── README.md                      # Project documentation
├── env.example                    # Environment variables template
├── nodemon.json                   # Nodemon configuration
├── package.json                   # NPM package configuration
├── pnpm-lock.yaml                 # PNPM lock file
└── tsconfig.json                  # TypeScript configuration
```

## Directory Descriptions

### `/src/controllers/`
Contains the business logic for different features of the application. Each subdirectory represents a major feature:

- **courses/**: Handles course creation, enrollment, management, and HOD operations
- **discussion/**: Manages Q&A system, questions, answers, and messaging
- **notices/**: Handles announcements and notice management
- **schedules/**: Manages class schedules and timetables
- **user/**: Handles authentication, user management, roles, and permissions

### `/src/routes/`
Defines API endpoints and maps them to their respective controllers. Each router file corresponds to a feature area.

### `/src/middlewares/`
Contains Express.js middleware functions, primarily for authentication and request validation.

### `/src/services/`
Houses application services, including real-time communication handlers using Socket.io.

### `/src/utils/`
Utility functions and helper modules, including database connection and query utilities.

### `/src/constants/`
Application-wide constants and configuration values.

### `/src/sql/`
Database schema and management scripts for setting up and tearing down the MySQL database.

### `/src/scripts/`
Utility scripts for development and maintenance tasks.

## Key Features

1. **User Management**: Registration, authentication, role-based access control
2. **Course Management**: CRUD operations for courses, student enrollment
3. **Schedule Management**: Class timetable and schedule management
4. **Notice System**: Announcements and notifications
5. **Discussion Forum**: Q&A system with real-time messaging
6. **Real-time Communication**: Socket.io integration for live updates
7. **Role-based Access**: Different permissions for students, teachers, and HODs

## Getting Started

1. Install dependencies: `pnpm install`
2. Set up environment variables using `env.example`
3. Run database setup scripts in `/src/sql/`
4. Start development server: `pnpm dev`
5. Reset database if needed: `pnpm reset`

## API Structure

The application follows RESTful API conventions with endpoints organized by feature:
- `/api/users/*` - User management
- `/api/courses/*` - Course operations
- `/api/schedules/*` - Schedule management
- `/api/notices/*` - Notice system
- `/api/discussions/*` - Discussion forum