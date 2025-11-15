# User Management System – Full Stack Application

A full-stack application for managing users and posts, built with a React + TypeScript frontend and a Node.js + TypeScript backend using SQLite.

---

## Features

### Backend
- RESTful API using Express + TypeScript
- SQLite database with predefined user, address, and post data
- User listing with pagination and full address details
- Post CRUD operations (create, read, delete)
- Input validation and detailed error handling
- CORS enabled for frontend-backend communication

### Frontend
- React 18 + TypeScript
- Tailwind CSS for modern responsive UI
- React Query for caching, synchronization, and optimistic updates
- Loading states with loading.io animations
- Responsive card-based layout (grid: desktop/tablet/mobile)

---

## Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- SQLite3
- Config
- CORS

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- React Query (TanStack)
- Axios
- Vite
- Lucide React

---


## Installation Backend

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```
   This will compile TypeScript files from `src/` into JavaScript in the `dist/` directory.

## Running the App locally

Start the server in production mode:

```bash
npm start
```

For development mode with hot reloading:

```bash
npm run dev
```

For development mode without hot reloading (required by nodemon):

```bash
npm run dev:once
```


## Installation Frontend

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```
   This will compile TypeScript files from `src/` into JavaScript in the `dist/` directory.

## Running the App locally

Start the server in production mode:

```bash
npm start
```

For development mode with hot reloading:

```bash
npm run dev
```

For development mode without hot reloading (required by nodemon):

```bash
npm run dev:once
```


## Run Test

1. Run Backend test scripts:

   ```bash
   cd backend
   ```

   ```bash
   npm run test
   ```

## Live url

- Frontend 
# https://user-manangement-system-lema.onrender.com/


- Backend 
# https://user-manangement-system.onrender.com/health


## WHAT the Solution Delivers

1. **State Management with React Query**
   -  React Query to manage server state.
   -  Efficient data fetching, caching, and synchronization with the backend.
   -  React Query's features to handle loading and error states.
2. **Code Reusability and Separation**
   - Structured components to promote reusability and maintainability.
   - Abstract shared logic into custom hooks or utility functions where appropriate.
   - Best practices for component composition and props management.
3. **Responsiveness**
   -  Responsive and functions well on various screen sizes and devices.
   -  Tailwind CSS utilities to create responsive layouts.
4. **Error Handling**
   -  Robust error handling for API requests and unexpected data.
   -  Meaningful feedback to the user in case of errors.
   - In place of try and catch i used a global error exception for better performance.



## Note
- Both Backend and frontend are hosted on Render. The render server sleeps at interval so sometime , you need to hit the server twice and wait for it to resume before it popultase data.

- Also on production i noticed that tailwindcss did not apply on my model, but it works okay locally