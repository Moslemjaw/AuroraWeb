# Fabric Blooms - Handmade Fabric Flowers E-Commerce Platform

## Overview

Fabric Blooms is a full-stack e-commerce application for selling handmade fabric flowers. The platform features a modern, minimalist design with a pink and white theme, showcasing custom floral products with an elegant user experience. It includes a public-facing storefront and an administrative dashboard for managing products, orders, and custom requests.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter (lightweight routing library)
- **State Management**: React Query (TanStack Query) for server state, React Context for admin authentication
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom theme configuration (pink/white minimalist design)
- **Forms**: React Hook Form with Zod validation
- **3D Graphics**: Spline for interactive 3D flower visualizations

**Architecture Pattern:**
The frontend follows a component-based architecture with clear separation between:
- Pages (`client/src/pages/`) - Route-level components
- Reusable UI components (`client/src/components/`)
- Shared utilities and hooks (`client/src/lib/`, `client/src/hooks/`)
- Type-safe API client layer (`client/src/lib/api.ts`)

**Design System:**
Custom theme defined in `client/src/index.css` with:
- Professional minimalist aesthetic
- Pink (#E8A5B7) as primary color
- Clean white backgrounds with subtle shadows
- Two font families: DM Sans (sans-serif) and Playfair Display (serif)

### Backend Architecture

**Technology Stack:**
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Session Management**: express-session with in-memory or MongoDB storage
- **Authentication**: Simple password-based admin authentication (hardcoded for demo, extendable to database)
- **Validation**: express-validator for request validation

**API Design:**
RESTful API with the following endpoint structure:
- `/api/products` - Product CRUD operations
- `/api/orders` - Order management
- `/api/colors` - Color palette for custom orders
- `/api/custom-orders` - Custom flower arrangement requests
- `/api/admin/login` - Admin authentication

**Storage Strategy:**
The application implements a **dual storage pattern** with automatic fallback:
- **Primary**: MongoDB (via Mongoose) for production persistence
- **Fallback**: In-memory storage (`server/storage-memory.ts`) when MongoDB is unavailable
- Storage selector function (`getStorage()`) dynamically chooses between MongoDB and memory storage
- Graceful degradation ensures the app continues functioning even if database connection fails

**Rationale**: This approach provides resilience in development environments and temporary outages while maintaining a simple codebase. The in-memory fallback allows developers to work without database setup, and the application continues serving requests if the database becomes unavailable.

### Data Storage

**Database**: MongoDB Atlas (configured but with fallback support)
- Connection string stored in environment variable `MONGODB_URI`
- Mongoose ODM for schema definition and queries
- Network access whitelist warning handled gracefully with fallback

**Schema Design** (defined in `server/models.ts`):
- **AdminUser**: Simple username/password authentication
- **Product**: Core product catalog with metadata (title, price, description, images, categories, featured flags)
- **Order**: Customer orders with status tracking
- **Color**: Available color options for custom orders
- **CustomOrder**: Custom flower arrangement requests with configuration

**Alternative Database Configuration**:
The codebase also includes Drizzle ORM configuration (`drizzle.config.ts`) for PostgreSQL, though currently unused. The MongoDB implementation is active.

**Tradeoff**: MongoDB was chosen for its flexible schema (useful for varying product attributes) and simple setup, while Drizzle+PostgreSQL configuration remains for potential migration to relational data if stronger consistency requirements emerge.

### Authentication & Authorization

**Admin Authentication:**
- Session-based authentication using express-session
- Password verification (currently hardcoded as "admin123" for demo)
- Session stored server-side with cookie-based session ID
- Protected routes require `requireAuth` middleware
- Context provider (`AdminProvider`) manages client-side auth state

**Security Considerations:**
- HTTPS enforced for production cookies (secure flag)
- Session secret configurable via environment variable
- 7-day session expiration
- Future enhancement: Replace hardcoded password with bcrypt-hashed database credentials

### Build & Deployment

**Build Process** (`script/build.ts`):
1. Builds client using Vite (outputs to `dist/public`)
2. Bundles server using esbuild (outputs to `dist/index.cjs`)
3. Selective bundling: Critical dependencies bundled, others externalized
4. Single production artifact for deployment

**Development Workflow:**
- Client: Vite dev server on port 5000 with HMR
- Server: tsx watch mode for hot reloading
- Vite middleware integration for seamless full-stack development

**Environment Variables:**
- `DATABASE_URL`: PostgreSQL connection (if using Drizzle)
- `MONGODB_URI`: MongoDB Atlas connection string
- `SESSION_SECRET`: Session encryption key
- `NODE_ENV`: Environment indicator (development/production)

## External Dependencies

### Third-Party Services

**MongoDB Atlas**:
- Cloud-hosted MongoDB database
- Requires IP whitelisting (0.0.0.0/0 for Replit)
- Connection may fail gracefully with in-memory fallback

**Spline**:
- 3D design and runtime for interactive flower visualizations
- Scene hosted at: `https://prod.spline.design/KM0s8r9Jk9en7NWt/scene.splinecode`
- Used in custom order preview

**Google Fonts**:
- DM Sans and Playfair Display typography
- Loaded via CDN link in HTML

### Key NPM Packages

**UI & Styling:**
- `@radix-ui/*` - Accessible component primitives (26+ packages)
- `tailwindcss` - Utility-first CSS framework
- `class-variance-authority` - Component variant management
- `lucide-react` - Icon library

**Data & Forms:**
- `@tanstack/react-query` - Server state management
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `@hookform/resolvers` - Zod integration for forms

**Backend:**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing (installed but demo uses plaintext)
- `express-session` - Session management
- `express-validator` - Request validation

**Database (Alternative):**
- `drizzle-orm` - Type-safe SQL ORM (configured but unused)
- `drizzle-kit` - Schema migrations
- `@neondatabase/serverless` - PostgreSQL driver (configured but unused)

**Build Tools:**
- `vite` - Frontend build tool and dev server
- `esbuild` - Server bundler
- `tsx` - TypeScript execution for development

### Replit-Specific Integrations

- `@replit/vite-plugin-runtime-error-modal` - Enhanced error display
- `@replit/vite-plugin-cartographer` - Development tooling
- `@replit/vite-plugin-dev-banner` - Environment indicator
- Custom `vite-plugin-meta-images.ts` - Dynamic OpenGraph image URL generation for Replit deployments