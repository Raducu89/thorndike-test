# Thorndike Test Project

## Description
A one day project writen in Slim(backend) and React(frontend) for my girlfriend who study psihology.
This project aims to replicate a Thorndike test.

## Project Structure

### Backend
The backend is built with Slim Framework and follows Domain-Driven Design (DDD) principles.

- `app/`: Configuration files and routes.
- `public/`: Public resources and entry point for Slim.
- `src/`: Source code organized by application layers.
- `composer.json`: Composer configuration file.

### Frontend
The frontend is built with React and is configured to communicate with the backend using environment variables.

- `public/`: Public resources and `index.html`.
- `src/`: Source code for the React application.

## Requirements
- PHP > 8
- nvm v18.20.1

## Setup and Running

### Backend

1. **Install Dependencies:**
   ```sh
   cd backend
   composer install
   
2. **Configure `.env`:**
    Create a .env file in the backend directory based on .env.example.

4. **Start Server:**
   ```sh
   php -S localhost:8080 -t public

### Frontend

1. **Install Dependencies:**
   ```sh
   cd frontend
   npm install
   
2. **Configure `.env`:**
    Create a .env file in the frontend directory:
    ```sh
    REACT_APP_API_BASE_URL=http://localhost:8080

3. **Start React App::**
   ```sh
   npm start
    
## Usage
Access the frontend application at http://localhost:3000.
Backend APIs are available at http://localhost:8080/api.

## Contribution
Contributions are welcome. Please open a pull request or an issue for any bugs or improvements.

