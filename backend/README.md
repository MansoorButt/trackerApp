# Task Tracker Backend API

RESTful API for task management application with JWT authentication and MongoDB integration.

## 🚀 Features

- **JWT Authentication** with httpOnly cookies
- **CRUD Operations** for task management
- **Business Rules** enforcement (cannot complete future tasks)
- **MongoDB Integration** with Mongoose ODM
- **CORS Configuration** for cross-origin requests
- **Input Validation** and error handling
- **Production-ready** deployment on Render

## 📋 API Endpoints

### Authentication
```
POST /api/auth/signup    - Register new user
POST /api/auth/login     - User login
GET  /api/auth/me        - Get current user
POST /api/auth/logout    - Logout user
```

### Tasks
```
POST   /api/tasks         - Create new task
GET    /api/tasks         - Get user tasks (paginated)
GET    /api/tasks/:id     - Get single task
PATCH  /api/tasks/:id     - Update task
DELETE /api/tasks/:id     - Delete task
GET    /api/tasks/overdue - Get overdue tasks
```

## 🛠️ Tech Stack

- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database and ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **cookie-parser** - HTTP cookie parsing
- **CORS** - Cross-origin resource sharing

## ⚙️ Environment Variables

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tasktracker
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
```

## 🏃‍♂️ Quick Start

### Development
```bash
npm install
npm run dev
```

### Production
```bash
npm install
npm start
```

## 🔒 Security Features

- **HttpOnly Cookies** - JWT stored securely
- **Password Hashing** - bcrypt with salt rounds
- **Input Validation** - Mongoose schema validation
- **Error Handling** - Centralized error middleware
- **CORS Protection** - Configured for production origins

## 📊 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  timestamps: true
}
```

### Task Model
```javascript
{
  title: String (required, max 100 chars),
  description: String (max 500 chars),
  status: "pending" | "completed",
  dueDate: Date (required),
  userId: ObjectId (ref: User),
  timestamps: true
}
```

## 🚫 Business Rules

- Tasks cannot be marked completed if due date is in the future
- Users can only access their own tasks
- Passwords must be at least 6 characters
- JWT tokens expire after 7 days

## 🌐 Deployment

**Production URL:** [https://trackerapp-ln1l.onrender.com](https://trackerapp-ln1l.onrender.com)

### Deploy to Render
1. Connect GitHub repository
2. Set root directory to `backend`
3. Configure environment variables
4. Deploy with `npm start`

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## 🔗 Related

- **Frontend Repository:** React.js application
- **Live Demo:** [https://tracker-app-red.vercel.app](https://tracker-app-red.vercel.app)

---

Built with ❤️ using Node.js and Express