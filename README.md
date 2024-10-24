# Next.js & NestJS App

This project consists of a **Next.js** frontend and a **NestJS** backend using Prisma **Prisma** as the ORM, both running locally, with the **PostgreSQL** database running inside a Docker container.

## Prerequisites

Ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/) (for running the frontend and backend locally)

## Project Structure

```
root/
├── backend/                # NestJS application
│   ├── prisma/             # Prisma schema and migrations
│   ├── src/
│   └── .env
├── frontend/               # Next.js application
│   ├── pages/
│   └── .env.local
├── docker-compose.yml      # Docker Compose for the database
└── README.md               # This file
```

## Running the Database with Docker

We use Docker to manage the **PostgreSQL** database, while the frontend and backend will run locally.

### Steps to Run the Database

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
   ```

2. **Start the database with Docker:**

   To spin up the PostgreSQL database in a Docker container, run:

   ```bash
   docker-compose up -d
   ```

   This command will create a PostgreSQL container and run it in the background.

3. **Stop the database:**

   When you're done, you can stop and remove the database container with:

   ```bash
   docker-compose down
   ```

### Docker Compose Configuration (`docker-compose.yml`)

```yaml
version: '3.8'
services:
  db:
    image: postgres:13
    restart: always
    ports:
      - 5432:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    volumes:
      - postgres:/var/lib/postgresql/test_db
volumes:
  postgres:
```

### Database Access

- **Host**: `localhost`
- **Port**: `5432`
- **Username**: `postgres`
- **Password**: `password`
- **Database**: `mydb`

You can modify these credentials in `docker-compose.yml` if needed.

## Running the Backend (NestJS) Locally

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `backend` directory with the following contents:

   ```env
   DATABASE_URL=postgres://postgres:password@localhost:5432/mydb
   ```

4. **Run database migrations:**

   ```bash
   npx prisma migrate dev
   ```

5. **Run the backend:**

   ```bash
   npm run start:dev
   ```

   The NestJS backend will run at [http://localhost:4242](http://localhost:4242).

## Running the Frontend (Next.js) Locally

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the `frontend` directory with the following contents:

   ```env
   NEXT_PUBLIC_APP_API=http://localhost:4242
   ```

4. **Run the frontend:**

   ```bash
   npm run dev
   ```

   The Next.js frontend will run at [http://localhost:3000](http://localhost:3000).

## Summary of Running the App

- **Frontend** (Next.js) runs locally at [http://localhost:3000](http://localhost:3000).
- **Backend** (NestJS) runs locally at [http://localhost:4242](http://localhost:4242).
- **Database** (PostgreSQL) runs in Docker on port `5432` via Docker Compose.

## Troubleshooting

- **Database connection issues**: Ensure Docker is running, and the PostgreSQL container is up. Check the credentials in both `docker-compose.yml` and your `.env` files.
- **Port conflicts**: Ensure that ports `3000`, `4242`, and `5432` are not already in use. You can modify the ports in `docker-compose.yml`, `.env`, or `.env.local` if necessary.
