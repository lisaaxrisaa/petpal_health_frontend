# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## Architecture Overview

This is a React frontend for PetPal Health, a pet health tracking application built with:

- **Vite + React 19** - Build tool and UI framework
- **Redux Toolkit + RTK Query** - State management and API data fetching
- **React Router v7** - Client-side routing
- **JWT Authentication** - Token-based auth stored in localStorage

### State Management Structure

The app uses RTK Query with a centralized API slice pattern:

- `src/api.js` - Base API configuration with auth headers and tag invalidation
- `src/store.js` - Redux store setup
- `src/features/` - Domain-specific API slices that inject endpoints into the base API:
  - `pets/petsSlice.js` - Pet CRUD operations
  - `healthLogs/healthLogsSlice.js` - Health log management
  - `auth/authSlice.js` - Authentication endpoints
  - `users/usersSlice.js` - User management

### Application Flow

1. **Authentication Gate**: App.jsx handles JWT validation and shows login/register forms for unauthenticated users
2. **Main Navigation**: Home.jsx provides tabbed interface for pet management
3. **Routing Structure**:
   - `/` - Home with pet list and health log management
   - `/pets/:petId` - Individual pet details with tabbed interface (Health Logs, Medications, Insurance, General Info)
   - `/pets/:petId/logs/new` - Create new health log for specific pet
   - `/logs/:logId` - Health log detail view
   - `/logs/:logId/edit` - Health log editing

### Component Organization

- `components/` - Reusable UI components organized by feature
- `pages/` - Top-level page components
- `css/` - Component-specific stylesheets (not CSS modules)

### API Integration

- Base URL configured via `VITE_API_URL` environment variable (defaults to localhost:3000)
- RTK Query handles caching and automatic re-fetching
- Tag-based cache invalidation for data consistency (especially 'HealthLogs' tags)

### Key Patterns

- Components use RTK Query hooks for data fetching (useGetUserPetsQuery, useCreateHealthLogMutation, etc.)
- JWT tokens automatically included in request headers via baseQuery configuration
- Form submissions trigger cache invalidation to refresh related data
- Pet selection flows from Home → PetDetails → HealthLogs with navigation state management