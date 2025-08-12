# Document QA Angular Application

A modern Angular application for document management and RAG (Retrieval-Augmented Generation) functionality with comprehensive user authentication and role-based access control.

## 🚀 Features

### 🔐 Authentication & Authorization
- **User Registration & Login**: Secure authentication system
- **Role-Based Access Control**: Admin, Editor, and Viewer roles
- **JWT Token Management**: Automatic token handling and refresh
- **Route Guards**: Protected routes based on user permissions

### 📄 Document Management
- **Document Upload**: Drag-and-drop file upload with progress tracking
- **Document Processing**: Real-time status monitoring (Pending, Processing, Completed, Failed)
- **Document List**: Organized view with status-based grouping
- **Refresh Functionality**: Manual refresh to check processing status

### 🔍 RAG Query Interface
- **Natural Language Queries**: Query documents using conversational language
- **Real-time Responses**: Get instant answers from uploaded documents
- **Context-Aware Results**: Retrieval-Augmented Generation for accurate responses

### 👥 User Management (Admin)
- **User List**: View all registered users
- **Role Management**: Update user roles and status
- **User Statistics**: Dashboard with user counts and statistics

A modern Angular application for document management and RAG (Retrieval-Augmented Generation) functionality.

## Project Structure

```
document_rag/
├── src/                    # Source TypeScript files
│   ├── app/
│   │   ├── core/          # Core services, models, guards
│   │   ├── shared/        # Shared components and pipes
│   │   └── features/      # Feature modules
│   │       ├── auth/      # Authentication features
│   │       ├── documents/ # Document management
│   │       └── dashboard/ # Dashboard features
├── dist/                   # Compiled output (generated)
│   ├── browser/           # Browser-specific build
│   └── prerendered-routes.json
├── out-tsc/               # TypeScript compilation output (generated)
└── node_modules/          # Dependencies
```

### Build Scripts

```bash
# Development build
npm run build:dev

# Production build
npm run build:prod

# Clean compiled files
npm run clean

# Clean JavaScript files from src directories
npm run clean:js

# Watch mode for development
npm run watch

# Start development server
npm start
```

## Configuration Files

- `angular.json`: Angular build configuration with output path set to `dist/`
- `tsconfig.app.json`: TypeScript configuration with output directory set to `dist/js/`
- `.gitignore`: Excludes `dist/` and `out-tsc/` from version control

## Features

- **Authentication**: Login and signup functionality
- **Document Upload**: File upload with validation
- **Document List**: View documents with status grouping
- **RAG Query**: Query documents using LLM API Servers
- **Responsive Design**: Mobile-friendly UI

## 🛠️ Technologies

- **Angular 17**: Latest Angular framework with standalone components
- **TypeScript**: Type-safe JavaScript development
- **Axios**: HTTP client for API communication
- **RxJS**: Reactive programming for state management
- **CSS3**: Modern styling with gradients and animations
- **Angular Router**: Client-side routing with lazy loading
- **Angular Forms**: Reactive forms for data handling

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Quick Start
```bash
# Clone the repository
git clone https://github.com/kalidasas-creator/document_qa_app.git

# Navigate to project directory
cd document_qa_app

# Install dependencies
npm install

# Start development server
npm start

# Open browser and navigate to http://localhost:4200
```

### Build Commands
```bash
# Development build
npm run build:dev

# Production build
npm run build:prod

# Clean compiled files
npm run clean

# Watch mode for development
npm run watch
```

## 🔧 Configuration

### Environment Setup
The application connects to a backend API. Update the API URL in `src/app/core/shared/services/auth.service.ts`:

```typescript
private apiUrl = 'http://localhost:3000/auth'; // Update to your backend URL
```

### API Endpoints
- **Authentication**: `/auth/login`, `/auth/onboard`, `/auth/me`
- **Documents**: `/documents/upload`, `/documents/list`, `/documents/query`
- **Users**: `/auth/users` (Admin only)

## 🏗️ Architecture

### Core Modules
- **Core Module**: Authentication, guards, interceptors
- **Shared Module**: Common components and pipes
- **Feature Modules**: Auth, Documents, Dashboard, Admin

### Key Components
- **AuthInterceptor**: Automatic JWT token handling
- **Route Guards**: Role-based access control
- **Document Service**: API communication for documents
- **Auth Service**: User authentication and management

## 🚀 Deployment

### Build for Production
```bash
npm run build:prod
```

The built application will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options
- **Netlify**: Drag and drop the `dist/` folder
- **Vercel**: Connect your GitHub repository
- **AWS S3**: Upload the `dist/` contents
- **Firebase Hosting**: Use Firebase CLI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation in the code comments
