# Task Tracker Frontend

A modern React-based task management application with authentication, real-time updates, and responsive design.

## Features

### ✅ **Authentication**
- User signup and login
- JWT token-based authentication
- Protected routes
- Automatic logout on token expiry

### ✅ **Task Management**
- Create, read, update, and delete tasks
- Task status management (pending/completed)
- Due date tracking with visual indicators
- Rich task descriptions

### ✅ **Smart Due Date Handling**
- "Due in X days" or "Overdue by Y days" display
- Tasks overdue by more than 5 days highlighted in red
- Prevention of marking future tasks as completed (business rule)
- Visual status indicators with color coding

### ✅ **User Experience**
- Responsive design for mobile and desktop
- Loading states and error handling
- Pagination for large task lists
- Real-time task statistics
- Intuitive task form with validation

### ✅ **Bonus Features**
- Logout functionality
- Pagination for task lists
- Dashboard with task statistics
- Modern UI with smooth animations

## Project Structure

```
src/
├── components/
│   ├── auth/               # Authentication components
│   ├── tasks/              # Task management components  
│   ├── layout/             # Layout components (Header, etc.)
│   └── common/             # Reusable components
├── pages/                  # Page components
├── context/                # React Context providers
├── services/               # API service functions
├── utils/                  # Utility functions
├── hooks/                  # Custom React hooks
├── App.js                  # Main app component
└── index.js               # Entry point
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend server running on http://localhost:5000

### Installation

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NAME="Task Tracker"
REACT_APP_VERSION=1.0.0
GENERATE_SOURCEMAP=true
```

4. **Start the development server:**
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (irreversible)

## Key Components

### Authentication Flow
- **LoginPage** - User login form
- **SignupPage** - User registration form  
- **AuthContext** - Manages authentication state globally

### Task Management
- **Dashboard** - Main task overview with statistics
- **TaskForm** - Create/edit task form with validation
- **TaskList** - Paginated list of tasks
- **TaskItem** - Individual task with actions

### Services
- **api.js** - Axios configuration with interceptors
- **auth.js** - Authentication API calls
- **tasks.js** - Task management API calls

## API Integration

The frontend communicates with the backend via REST API:

### Authentication Endpoints
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Task Endpoints  
- `POST /api/tasks` - Create task
- `GET /api/tasks` - Get user tasks (paginated)
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/overdue` - Get overdue tasks

## Business Rules Implementation

### Future Task Completion Rule
The app prevents marking tasks as completed if their due date is in the future:
```javascript
const canComplete = canMarkCompleted(task.dueDate);
// Disables checkbox and shows warning message
```

### Visual Indicators
Tasks are color-coded based on their status:
- **Green** - Completed tasks
- **Yellow** - Due today
- **Blue** - Due soon
- **Orange** - Overdue
- **Red** - Critically overdue (>5 days)

## State Management

Uses React Context API for global state:
- **AuthContext** - User authentication state
- **TaskContext** - Task data and operations

## Error Handling

Comprehensive error handling with:
- Network error detection
- Validation error display
- Token expiry handling
- User-friendly error messages

## Responsive Design

Mobile-first approach with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

## Performance Optimizations

- Lazy loading of components
- Memoized expensive operations
- Optimized re-renders with proper dependencies
- Image optimization
- Efficient pagination

## Deployment

### Production Build
```bash
npm run build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify
```bash
# Build first
npm run build

# Upload build folder to Netlify
```

## Environment Variables

Required environment variables:
- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_NAME` - Application name  
- `REACT_APP_VERSION` - App version

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.