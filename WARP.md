# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

React + TypeScript e-commerce application built with Vite, featuring a microservices architecture with API Gateway integration. The app demonstrates product catalog browsing, cart management, authentication, and order processing.

## Development Commands

### Essential Commands
- **Start dev server**: `npm run dev` (runs on port 3200)
- **Build for production**: `npm run build` 
- **Lint code**: `npm run lint`
- **Preview production build**: `npm run preview`

### Code Quality
- **ESLint**: Uses flat config with React hooks and TypeScript rules
- **Biome**: Available for formatting and additional linting (`@biomejs/biome`)
- **TypeScript**: Strict configuration with separate configs for app and node

## Architecture & Structure

### Core Architecture
- **Providers Pattern**: App wrapped in nested context providers (AuthProvider → CartProvider)
- **Module-based Organization**: Features organized in `src/modules/` with dedicated types, hooks, and components
- **API Layer**: Centralized HTTP client with automatic JWT token injection via axios interceptors

### Key Modules
- **Authentication**: JWT-based auth with localStorage persistence, automatic customer data fetching
- **Cart**: Local cart state with localStorage persistence, quantity management
- **Products**: SWR-powered data fetching with category filtering and pagination
- **Customer/Orders**: User profile and order history management

### State Management
- **Context API**: For global state (auth, cart)
- **SWR**: For server state, caching, and data fetching
- **React Hook Form**: For form handling
- **LocalStorage**: For cart and auth token persistence

### Routing Structure
```
/ - Home (with nested header layout)
/product-details/:id - Product details
/shopping-cart - Cart management  
/payment - Checkout process
/order-success - Order confirmation
/order-history - Past orders
/sign-in, /sign-up - Authentication (no header)
```

### API Integration
- Base URL configured via `VITE_API_URL` environment variable
- Centralized API client in `src/common/utils/api.ts` with:
  - Automatic JWT bearer token injection
  - Generic typed request methods (Get, Post, Put, Delete)
  - Microservices endpoints for categories, products, customers, orders

## Development Notes

### Environment Variables
- `VITE_API_URL`: Base URL for the API Gateway

### Custom Hooks Pattern
- Data fetching hooks use SWR with consistent return pattern: `{ data, isLoading, error }`
- Example: `useCategories()`, `usePagedProducts()`

### Component Organization
- Pages in `src/pages/` with feature-specific subdirectories
- Shared components in `src/components/`
- Module-specific components within respective module folders

### Styling
- Tailwind CSS v4 with Vite plugin integration
- Global styles in `src/index.css` and `src/App.css`