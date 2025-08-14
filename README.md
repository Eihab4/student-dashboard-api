# Student Dashboard API

## Overview

The Student Dashboard API is a robust backend service built with NestJS to support a student learning platform. This API provides essential functionality for student dashboards, including user authentication, quiz management, and announcements. The project is designed with modularity, scalability, and maintainability in mind, following best practices for modern web application development.

## Project Structure

The project follows a modular architecture that leverages NestJS's powerful module system:

```
├── src/
│   ├── announcements/       # Handles student announcements
│   ├── auth/                # Authentication and authorization
│   ├── common/              # Shared DTOs and utilities
│   ├── database/            # Database connection configuration
│   ├── quizzes/             # Quiz management functionality
│   ├── users/               # User management
│   ├── app.module.ts        # Main application module
│   └── main.ts              # Application entry point
```

### Key Components

#### Modules

- **Auth Module**: Handles user authentication, JWT token generation, and route protection
- **Users Module**: Manages user data and operations
- **Quizzes Module**: Provides quiz creation, retrieval, and scoring functionality
- **Announcements Module**: Manages system-wide and targeted announcements
- **Database Module**: Configures MongoDB connection using Mongoose

#### Data Models

The application uses Mongoose schemas to define data models:

- **User**: Stores student information, authentication details, and relationships to quizzes
- **Quiz**: Contains quiz content, questions, answers, and scoring information
- **Announcement**: Manages notifications and important updates for students

## Why This Architecture Is Awesome

### Modular Design

The modular architecture makes the codebase highly maintainable and extensible. Each feature is encapsulated in its own module with clear responsibilities, making it easy to:

- Add new features without affecting existing functionality
- Test components in isolation
- Understand the codebase quickly, even for new developers

### Dependency Injection

NestJS's powerful dependency injection system enables:

- Loose coupling between components
- Easier unit testing through mock dependencies
- Clean separation of concerns

### TypeScript Integration

The project leverages TypeScript for:

- Strong typing and compile-time error checking
- Enhanced code documentation through interfaces and types
- Better IDE support with autocompletion and refactoring tools

### MongoDB with Mongoose

The choice of MongoDB with Mongoose provides:

- Flexible schema design that can evolve with application needs
- Powerful querying capabilities
- Simple document relationships that match the domain model

### Docker Integration

The project includes Docker and Docker Compose configuration for:

- Consistent development environments
- Easy deployment across different platforms
- Simple management of dependent services (MongoDB, Mongo Express)

## Code Harmony and Readability

This project prioritizes code quality and readability through:

- **Consistent Naming Conventions**: Clear, descriptive names for files, classes, and variables
- **Clean Code Principles**: Small, focused functions and classes with single responsibilities
- **Comprehensive DTOs**: Clear data transfer objects for API requests and responses
- **Separation of Concerns**: Controllers handle HTTP requests, services contain business logic, and schemas define data models

## Version Control Strategy

For version control, this project uses GitHub Workflow as it's particularly effective for smaller projects:

- **Feature Branches**: Development of new features in isolated branches
- **Pull Requests**: Code review process before merging to main branch
- **Continuous Integration**: Automated testing on pull requests
- **Simple Workflow**: Less overhead compared to more complex Git workflows, making it ideal for small to medium-sized projects

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- Docker and Docker Compose (for containerized development)
- MongoDB (if running without Docker)

### Installation

1. Clone the repository

```bash
$ git clone https://github.com/Eihab4/student-dashboard-api.git
$ cd student-dashboard-api
```

2. Install dependencies

```bash
$ npm install
```

3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGO_URI=mongodb://username:password@localhost:27017/student-dashboard
MONGO_USER=username
MONGO_PASS=password
MONGO_DB=student-dashboard
JWT_SECRET=your_jwt_secret
```

### Running the Application

#### Using Docker

```bash
$ docker-compose up
```

This will start the NestJS application, MongoDB, and Mongo Express.

#### Without Docker

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
