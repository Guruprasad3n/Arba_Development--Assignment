# Arba Development


## Introduction
This is an Ecommerce app. user can add the products and categories It provides a user-friendly interface for creating, managing, and categorizing products based on their status.

## Project Type
Fullstack

## Deplolyed App
Frontend: [Deplot Link](https://arbagp.netlify.app/)

## Test User 
    - User id : 
    - Password : 

<!-- Backend: [https://kryzen-assignment-4d0z.onrender.com](https://kryzen-assignment-4d0z.onrender.com) -->

## Directory Structure

<!-- ```
kryzen---Assignment/
├─ backend/
│  ├─ Config/
│  │  ├─ db.js
│  ├─ Controllers/
│  │  ├─ taskController.js
│  ├─ Models/
│  │  ├─ taskSchema.js
│  ├─ Routes/
│  │  ├─ taskRoute.js
│  ├─ index.js
│
├─ frontend/
│  ├─ src/
│  │  ├─ Components/
│  │  │  ├─ CreateTask.jsx
│  │  │  ├─ Header.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  ├─ NotFound.jsx
│  │  │  ├─ Task.jsx
│  │  │  ├─ TaskList.jsx
│  ├─ App.jsx
│  ├─ App.css
│  ├─ index.css
│  ├─ main.jsx
│
├─ package.json
``` -->


<!-- ## Features

### Frontend
- Task creation with name, status, and date
- Task management with drag-and-drop functionality
- Filtering tasks by date
- Exporting task lists to PDF format

### Backend
- CRUD operations for task management
- Filtering tasks by date
- Delete tasks by id -->

## Installation & Getting started

    git clone https://github.com/Guruprasad3n/Arba_Development--Assignment
---------------------
    cd Arba_Development--Assignment
### Frontend

    - cd frontend
    - npm install
    - npm run dev

- Server will start on the ```http://localhost:5173/```

### Backend

- cd backend
    
- add  ```.env```
    - PORT = your port number
    - MONGO_URI = your Mongo Url
    - JWT_SECRET = Your Jwt Secret


- npm install
- npm start 

- Server will start on the ```http://localhost:8000/```



### API Endpoints
 - User
    * POST /register - Register User
    * POST /login - Login User
    * POST /forgot-password  -  Change Password
    * GET  /:userId  -  Get User By Id
    * POST /:userId  -  Update User

## Technology Stack

### Frontend
- React.js
- Chakra UI
- react-router-dom


### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Other libraries/modules:
    - cors
    - dotenv