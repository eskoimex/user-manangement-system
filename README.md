User Management System - Full Stack Application
A comprehensive full-stack application for managing users and their posts, built with React TypeScript frontend and Node.js TypeScript backend with SQLite database.

🚀 Features
Backend Features
RESTful API with Express.js and TypeScript

SQLite Database with existing user, address, and post data

User Management with pagination and address information

Post Management - Create, read, and delete posts

Input Validation and comprehensive error handling

CORS enabled for cross-origin requests

Frontend Features
React 18 with TypeScript for type safety

Tailwind CSS for modern, responsive design

React Query for efficient data fetching and caching

Loading States with loading.io CSS animations

Responsive Design that works on all devices

Card-based Layout for posts with 3-column grid

Optimistic Updates for smooth user experience

🛠 Tech Stack
Backend
Node.js with Express.js

TypeScript for type safety

SQLite3 for database

Config for environment management

CORS for cross-origin requests

Frontend
React 18 with TypeScript

Tailwind CSS for styling

React Query (TanStack Query) for state management

Axios for HTTP requests

Vite for fast development and building

Lucide React for icons

📁 Project Structure
text
web-developer-assignment-Public/
├── backend/
│   ├── src/
│   │   ├── db/
│   │   │   ├── connection.ts
│   │   │   ├── users/
│   │   │   │   ├── users.ts
│   │   │   │   ├── types.ts
│   │   │   │   └── query-templates.ts
│   │   │   └── posts/
│   │   │       ├── posts.ts
│   │   │       ├── types.ts
│   │   │       └── query-templates.ts
│   │   ├── routes/
│   │   │   ├── users.ts
│   │   │   └── posts.ts
│   │   ├── middleware/
│   │   │   └── validation.ts
│   │   └── index.ts
│   ├── config/
│   │   └── default.json
│   ├── data.db (SQLite database)
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ui/
    │   │   │   ├── pagination.tsx
    │   │   │   └── breadcrumb.tsx
    │   │   ├── UsersTable.tsx
    │   │   ├── PostsList.tsx
    │   │   └── AddPostForm.tsx
    │   ├── hooks/
    │   │   ├── useUsers.ts
    │   │   └── usePosts.ts
    │   ├── pages/
    │   │   ├── UsersPage.tsx
    │   │   └── UserPostsPage.tsx
    │   ├── types/
    │   │   └── index.ts
    │   ├── utils/
    │   │   └── api.ts
    │   └── App.tsx
    └── package.json
🚀 Quick Start
Prerequisites
Node.js 16+ installed

npm or yarn package manager

Backend Setup
Navigate to backend directory

bash
cd backend
Install dependencies

bash
npm install
Start the development server

bash
npm run dev
The backend will start on http://localhost:3001 with the following output:

text
🚀 Server running on port 3001
📝 Environment: development
Connected to SQLite database: ./data.db
Frontend Setup
Open a new terminal and navigate to frontend directory

bash
cd frontend
Install dependencies

bash
npm install
Start the development server

bash
npm run dev
The frontend will start on http://localhost:3000

📚 API Endpoints
Users Endpoints
Method	Endpoint	Description	Parameters
GET	/users	Get paginated users	pageNumber, pageSize
GET	/users/count	Get total user count	-
Example:

bash
GET http://localhost:3001/users?pageNumber=0&pageSize=4
Posts Endpoints
Method	Endpoint	Description	Body
GET	/posts	Get user's posts	userId (query param)
POST	/posts	Create new post	{ userId, title, body }
DELETE	/posts/:id	Delete post by ID	-
Examples:

bash
# Get posts for user
GET http://localhost:3001/posts?userId=user-id-here

# Create new post
POST http://localhost:3001/posts
Content-Type: application/json

{
  "userId": "user-id-here",
  "title": "Post Title",
  "body": "Post content here..."
}

# Delete post
DELETE http://localhost:3001/posts/post-id-here
🎨 UI Components
Users Page
Users Table: Displays users with name, email, and formatted address

Pagination: Right-aligned with Previous/Next buttons and page numbers

Loading States: Loading.io CSS animations during data fetch

Responsive Design: Mobile-friendly table and pagination

User Posts Page
User Header: User name, email, and post count

Posts Grid: 3-column card layout (2 on tablet, 1 on mobile)

Add Post Card: First card with + icon for creating new posts

Delete Functionality: Trash icon on each post card (hover to reveal)

Modal Forms: Clean modal for creating new posts

🔧 Configuration
Backend Configuration
backend/config/default.json

json
{
  "port": 3001,
  "dbPath": "./data.db"
}
Frontend Configuration
frontend/.env

env
VITE_API_URL=http://localhost:3001
🧪 Testing
Backend Testing
bash
cd backend
npm test
Frontend Testing
bash
cd frontend
npm test
🐛 Error Handling
The application includes comprehensive error handling:

Backend Errors
400 Bad Request: Invalid input data

404 Not Found: Resource not found

500 Internal Server Error: Server-side issues

Validation Errors: Detailed field-specific validation messages

Frontend Errors
Loading States: Visual feedback during API calls

Error Boundaries: Graceful error handling in React components

User Feedback: Clear error messages for failed operations

📱 Responsive Design
The application is fully responsive:

Desktop: 3-column grid for posts, full table view

Tablet: 2-column grid, optimized table

Mobile: 1-column grid, simplified pagination

🎯 Key Features Implementation
Data Fetching with React Query
Automatic caching and background updates

Optimistic updates for instant UI feedback

Error retry logic and loading states

Type Safety
Full TypeScript implementation

Shared types between frontend and backend

Compile-time error checking

Performance Optimizations
Paginated data loading

Efficient re-renders with React Query

Optimized database queries

🚀 Deployment
Backend Deployment (Railway/Render)
Set environment variables:

env
NODE_ENV=production
PORT=3001
DB_PATH=./data.db
Build command:

bash
npm run build
Start command:

bash
npm start
Frontend Deployment (Vercel/Netlify)
Set environment variable:

env
VITE_API_URL=https://your-backend-url.railway.app
Build command:

bash
npm run build
🔍 Troubleshooting
Common Issues
Database Connection Error

text
Error: SQLITE_CANTOPEN: unable to open database file
Solution: Ensure data.db file exists in the backend directory

CORS Errors

text
Access to fetch at 'http://localhost:3001' from origin 'http://localhost:3000' has been blocked by CORS policy
Solution: Backend includes CORS middleware - ensure it's running on port 3001

Validation Errors

text
ValidationError: Title is required, Body is required
Solution: Ensure all required fields are provided when creating posts

Port Already in Use

text
Error: listen EADDRINUSE: address already in use :::3001
Solution: Change port in backend config or kill existing process

Development Tips
Use browser DevTools to monitor network requests

Check backend console for detailed error logs

Use React Query DevTools for frontend state debugging

Verify database file path in backend configuration

📄 License
This project is for assessment purposes as part of a full-stack developer assignment.

👥 Contributing
This is an assessment project. For educational purposes only.

Note: This application demonstrates modern full-stack development practices including TypeScript, React Query, responsive design, and comprehensive error handling.

