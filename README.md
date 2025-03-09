```markdown
# Job Board Backend API (PostgreSQL)

A complete backend system for managing jobs and applications with REST and GraphQL APIs,
built with Express.js, PostgreSQL, and TypeScript.

## Features

- **REST API** 
- **GraphQL API** with queries and mutations
- **PostgreSQL** database integration
- **TypeScript** type safety
- **Zod** validation schemas
- MVC architecture pattern
- Comprehensive error handling
- Environment configuration

## Technologies

- Node.js 
- Express.js
- TypeScript
- PostgreSQL
- Zod
- Apollo Server (GraphQL)
- Postman (Testing)

```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/job-board-backend.git
   cd job-board-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create `.env` file in root directory:
   ```env
   DB_USER=job_user
   DB_PASSWORD=job_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=job_board
   PORT=4000
   ```

## PostgreSQL Setup

### For macOS Users

1. **Install PostgreSQL**
   ```bash
   brew install postgresql
   ```

2. **Start Service**
   ```bash
   brew services start postgresql
   ```

3. **Create Database and User**
   ```bash
   psql postgres
   CREATE DATABASE job_board;
   CREATE USER job_user WITH PASSWORD 'job_password';
   GRANT ALL PRIVILEGES ON DATABASE job_board TO job_user;
   \q
   ```

### For Windows Users

1. Download installer from [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
2. Complete installation with default options
3. Open PowerShell:
   ```powershell
   psql -U postgres -c "CREATE DATABASE job_board;"
   psql -U postgres -c "CREATE USER job_user WITH PASSWORD 'job_password';"
   psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE job_board TO job_user;"
   ```

## Database Migrations

Run this command to create tables:

```bash
psql -U job_user -d job_board -a -f migrations/001_init_tables.sql
```

**SQL Script Content:**
```sql
CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    applicant_name VARCHAR(255) NOT NULL,
    applicant_email VARCHAR(255) NOT NULL,
    cover_letter TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ON applications (job_id);
```

## Running the Server

**Development mode:**
```bash
npm run start:dev
```

**Production build:**
```bash
npm run build
npm run start:prod
```

## Testing with Postman

1. Import the Postman collection from `/postman` directory
- Download the [Postman Job Board collection](./postman/job-board-backend.postman_collection.json) and import it into Postman.
- Download the [Postman Job Board Environment](./postman/job-board.postman_environment.json) and import it into Postman.
2. Or Manually Set up environment variables 
   after importing job board collection:
   - `jb-local-url`: `http://localhost:4000/api/v1`


## REST API Documentation

### Base URL
`http://localhost:4000/api/v1`

### Jobs Endpoints

#### Create Job
**POST** `/jobs`  
Request Body:
```json
{
  "title": "Senior Developer",
  "description": "Node.js backend development position",
  "company": "Tech Corp",
  "location": "Remote"
}
```

Success Response (201):
```json
{
    "success": true,
    "statusCode": 201,
    "message": "Job created successfully",
    "data": {
        "id": 1,
        "title": "Senior Developer",
        "description": "Node.js backend development position",
        "company": "Tech Corp",
        "location": "Remote",
        "created_at": "2025-03-08T23:10:59.118Z"
    }
}
```

#### Get All Jobs
**GET** `/jobs`  
Success Response (200):
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Jobs retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "Senior Developer",
      "company": "Tech Corp",
      "location": "Remote"
    }
  ]
}
```

#### Get A Single Job
**GET** `/jobs/:id`  
Success Response (200):
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Job Found!",
  "data": 
    {
      "id": 1,
      "title": "Senior Developer",
      "company": "Tech Corp",
      "location": "Remote"
    }
  
}
```

### Applications Endpoints

#### Submit Application
**POST** `/applications`  
Request Body:
```json
{
  "job_id": 1,
  "applicant_name": "John Doe",
  "applicant_email": "john@example.com",
  "cover_letter": "I have 5 years experience..."
}
```

Success Response (201):
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Application submitted successfully",
  "data": {
    "id": 1,
    "applicant_name": "John Doe",
    "applicant_email": "john@example.com",
    "cover_letter": "I have 5 years experience...",
    "submitted_at": "2023-10-05T12:34:56.789Z"
  }
}
```

#### Get All Applications for a Specific Job
**GET** `/applications/:job_id`  
Success Response (200):
```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "applicant_name": "John Doe",
      "applicant_email": "john@example.com",
      "cover_letter": "I have 5 years experience...",
      "submitted_at": "2023-10-05T12:34:56.789Z"
    }
  ]
}
```

## GraphQL API Documentation

Access Playground: Open `http://localhost:4000/graphql` in Google Chrome 
or any modern browser to test your GraphQL queries. 🚀

### Queries

#### Get All Jobs with Applications
```graphql
query {
  jobs {
    id
    title
    description
    applications {
      applicant_name
      submitted_at
    }
  }
}
```

Response:
```json
{
  "data": {
    "jobs": [
      {
        "id": "1",
        "title": "Senior Developer",
        "description": "Node.js position",
        "applications": [
          {
            "applicant_name": "John Doe",
            "submitted_at": "2023-10-05T12:34:56.789Z"
          }
        ]
      }
    ]
  }
}
```

#### Get Single Job by ID
```graphql
query {
  job(id: 1) {
    id
    title
    description
    company
    applications {
      applicant_name
      submitted_at
    }
  }
}
```

Response:
```json
{
  "data": {
    "job": {
      "id": "1",
      "title": "Senior Developer",
      "description": "Node.js position",
      "company": "Tech Corp",
      "applications": [
        {
          "applicant_name": "John Doe",
          "submitted_at": "2023-10-05T12:45:00.000Z"
        }
      ]
    }
  }
}
```


#### Get All Applications for a Specific Job
```graphql
query {
  applications(job_id: 1) {
    id
    applicant_name
    applicant_email
    submitted_at
  }
}
```

Response:
```json
{
  "data": {
    "applications": [
      {
        "id": "1",
        "applicant_name": "John Doe",
        "applicant_email": "john@example.com",
        "submitted_at": "2023-10-05T12:45:00.000Z"
      }
    ]
  }
}
```

### Mutations

#### Create Job
```graphql
mutation {
  createJob(input: {
    title: "Frontend Developer",
    description: "React specialist",
    company: "Web Corp",
    location: "Hybrid"
  }) {
    id
    title
    company
  }
}
```

Response:
```json
{
  "data": {
    "createJob": {
      "id": "2",
      "title": "Frontend Developer",
      "company": "Web Corp"
    }
  }
}
```

#### Create Application
```graphql
mutation {
  createApplication(input: {
    job_id: 1,
    applicant_name: "Alice Smith",
    applicant_email: "alice@example.com",
    cover_letter: "Experienced developer..."
  }) {
    id
    applicant_name
  }
}
```

Response:
```json
{
  "data": {
    "createApplication": {
      "id": "2",
      "applicant_name": "Alice Smith"
    }
  }
}
```

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation Error",
  "error": [
     {
        "path": "body.company",
        "message": "Expected string, received number"
    }
  ]
}
```
```json
{
    "success": false,
    "statusCode": 400,
    "message": "Validation Error",
    "data": null,
    "error": [
        {
            "path": "body.company",
             "message": "Company name must be at least 2 characters long"
        }
    ]
}
```
```json
{
    "success": false,
    "statusCode": 400,
    "message": "Validation Error",
    "data": null,
    "error": [
        {
            "path": "body.job_id",
            "message": "Job ID is required"
        }
    ]
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "statusCode": 404,
  "message": "Job not found"
}
```
```json
{
    "success": false,
    "statusCode": 404,
    "message": "No job record found for the provided Job ID!",
    "data": null
}
```

### Server Error (500)
```json
{
  "success": false,
  "statusCode": 500,
  "message": "Internal Server Error"
}
```

## Scripts

```json
{
  "start:prod": "node ./dist/server.js",
  "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "lint": "eslint 'src/**/*.ts'",
  "lint:fix": "npx eslint src --fix",
  "prettier": "prettier --ignore-path .gitignore --write \"**/*.+(js|ts|json)\"",
  "prettier:fix": "npx prettier --write src",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

## Troubleshooting

**PostgreSQL Connection Issues:**
```bash
# Verify PostgreSQL service status
brew services list  # macOS
pg_ctl status       # Windows

# Test database connection
psql -U job_user -d job_board -c "SELECT 1;"
```

**Migration Errors:**
```bash
# Reset database (CAUTION: Deletes all data)
psql -U postgres -c "DROP DATABASE job_board; CREATE DATABASE job_board;"
```

