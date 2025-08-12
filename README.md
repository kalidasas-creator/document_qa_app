# Document RAG Angular Application

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

## Build Configuration

### Compiled File Organization

- **Source Files**: All TypeScript files remain in their original locations under `src/`
- **Compiled Output**: All compiled JavaScript files are output to `dist/` directory
- **TypeScript Output**: TypeScript compilation output goes to `out-tsc/` directory
- **No Mixed Files**: Source directories contain only TypeScript files, no compiled JavaScript

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

### File Organization Benefits

1. **Clean Source**: Source directories contain only TypeScript files
2. **Separate Output**: Compiled files are in dedicated directories
3. **Version Control**: Only source files are committed to git
4. **Build Artifacts**: Compiled files are generated during build process
5. **Easy Cleanup**: Simple commands to clean compiled files

## Development Workflow

1. **Write TypeScript**: Edit files in `src/` directory
2. **Build**: Run `npm run build:dev` to compile
3. **Serve**: Run `npm start` for development server
4. **Clean**: Use `npm run clean:js` to remove compiled files from source directories

## Configuration Files

- `angular.json`: Angular build configuration with output path set to `dist/`
- `tsconfig.app.json`: TypeScript configuration with output directory set to `dist/js/`
- `.gitignore`: Excludes `dist/` and `out-tsc/` from version control

## Features

- **Authentication**: Login and signup functionality
- **Document Upload**: File upload with validation
- **Document List**: View documents with status grouping
- **RAG Query**: Query documents using natural language
- **Responsive Design**: Mobile-friendly UI
- **Modern UI**: Clean, professional interface

## Technologies

- **Angular 17**: Latest Angular framework
- **TypeScript**: Type-safe JavaScript
- **Axios**: HTTP client for API communication
- **CSS3**: Modern styling with gradients and animations
- **RxJS**: Reactive programming for state management
