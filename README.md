# Tentwenty Timesheet Application

A modern, fully-featured timesheet management application built with Next.js 14, TypeScript, and Tailwind CSS. This application allows users to create, manage, and track their weekly timesheets with a clean and intuitive interface.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)

## ✨ Features

- 🔐 **Authentication** - Secure login with NextAuth.js
- 📅 **Dynamic Timesheet Management** - Create timesheets for any week
- ✏️ **Task Management** - Add, edit, and delete tasks with custom projects
- 💾 **Persistent Storage** - LocalStorage integration for data persistence
- 📊 **Progress Tracking** - Visual progress bars and status indicators
- 🎨 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- 🚀 **No Static Data** - All data is user-generated and dynamic

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm** or **bun**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tentwenty-timesheet
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📝 Default Login Credentials

For testing purposes, use these credentials:

- **Email:** `admin@tentwenty.com`
- **Password:** `admin123`

---

## 📁 Project Structure

```
tentwenty-timesheet/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   └── auth/                 # NextAuth.js authentication
│   │       └── [...nextauth]/
│   │           └── route.ts      # Auth configuration & handlers
│   ├── dashboard/                # Dashboard pages
│   │   ├── page.tsx             # Main timesheet list page
│   │   └── [id]/                # Dynamic timesheet detail pages
│   │       └── page.tsx         # Individual timesheet view
│   ├── login/                    # Authentication pages
│   │   └── page.tsx             # Login page
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page (redirects to dashboard)
│   └── globals.css              # Global styles & Tailwind
│
├── components/                   # Reusable React components
│   ├── common/                  # Common/shared components
│   │   ├── Footer.tsx           # Footer component
│   │   ├── LoginForm.tsx        # Login form with validation
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── TimesheetModal.tsx   # Modal for adding/editing tasks
│   │   └── TimesheetTable.tsx   # Table displaying all timesheets
│   ├── providers/               # Context providers
│   │   └── Providers.tsx        # Wraps app with all providers
│   └── ui/                      # UI components (design system)
│       ├── button.tsx           # Reusable button component
│       ├── Dropdown.tsx         # Dropdown select component
│       ├── input.tsx            # Reusable input (text, checkbox)
│       ├── pagination.tsx       # Pagination controls
│       └── TaskMenu.tsx         # Task menu (edit/delete options)
│
├── context/                      # React Context for state management
│   ├── AuthContext.tsx          # Authentication state & logic
│   └── TimesheetContext.tsx     # Timesheet data & CRUD operations
│
├── hooks/                        # Custom React hooks
│   └── useTimesheet.tsx         # Hooks for timesheet operations
│
├── types/                        # TypeScript type definitions
│   └── timesheet.ts             # Timesheet & Task interfaces
│
├── utils/                        # Utility functions
│   └── dateHelpers.ts           # Date manipulation & formatting
│
├── public/                       # Static assets
│   └── *.svg                    # Icons and images
│
├── middleware.ts                 # Next.js middleware (auth protection)
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies & scripts
```

---

## 🗂️ File & Folder Explanations

### **`/app`** - Application Pages (Next.js App Router)

#### `app/api/auth/[...nextauth]/route.ts`
- Configures NextAuth.js for authentication
- Handles login/logout functionality
- Credentials provider for demo login

#### `app/dashboard/page.tsx`
- Main dashboard displaying all timesheets in a table
- Features: Create new timesheet, filter by status, pagination
- Shows week number, date range, status badges

#### `app/dashboard/[id]/page.tsx`
- Detailed view of a single timesheet
- Displays tasks grouped by weekday (Mon-Fri)
- Add/edit/delete tasks for each day
- Shows progress bar (hours logged / 40 hours target)

#### `app/login/page.tsx`
- Login page with email/password form
- Split layout: form on left, branding on right
- Responsive design for mobile

#### `app/layout.tsx`
- Root layout wrapping entire app
- Includes all providers (Auth, Timesheet)
- Sets up fonts and metadata

---

### **`/components`** - Reusable UI Components

#### **`/components/common`** - Shared Components

##### `LoginForm.tsx`
- Handles user authentication
- Uses common Input component for fields
- Integrates with AuthContext for login logic

##### `Navbar.tsx`
- Top navigation bar
- User profile dropdown
- Logout functionality

##### `TimesheetModal.tsx`
- Modal for adding/editing tasks
- Dynamic input fields (no static dropdowns)
- Pre-fills data when editing existing tasks
- Validates required fields

##### `TimesheetTable.tsx`
- Table component displaying all timesheets
- Filter by status (COMPLETED, INCOMPLETE, MISSING)
- Pagination controls
- "Create New Timesheet" button

##### `Footer.tsx`
- Simple footer with copyright

---

#### **`/components/ui`** - UI Design System

##### `button.tsx`
- Reusable button component
- Props: `fullWidth`, `variant`, `disabled`
- Consistent styling across app

##### `input.tsx`
- Versatile input component
- Supports: text, email, password, checkbox
- `checkboxLabel` prop for inline labels
- Focus states and validation

##### `Dropdown.tsx`
- Select dropdown component
- Used for filters (date range, status)

##### `pagination.tsx`
- Pagination controls for table
- Change items per page
- Navigate between pages

##### `TaskMenu.tsx`
- Three-dot menu for task actions
- Options: Edit, Delete
- Hover/click to show menu

---

### **`/context`** - State Management

#### `AuthContext.tsx`
- Manages authentication state
- Login/logout functions
- User session management
- Error handling

#### `TimesheetContext.tsx`
- Centralized timesheet data management
- CRUD operations: Create, Read, Update, Delete
- LocalStorage integration for persistence
- Auto-calculates timesheet status based on hours:
  - **MISSING**: 0 hours logged
  - **INCOMPLETE**: 1-39 hours logged
  - **COMPLETED**: 40+ hours logged

---

### **`/hooks`** - Custom React Hooks

#### `useTimesheet.tsx`
Contains two hooks:

##### `useTimesheet(timesheetId)`
- For detail page - manages individual timesheet
- Returns: tasks grouped by date, progress percentage
- Functions: `addTask`, `updateTask`, `deleteTask`

##### `useTimesheetsList()`
- For list page - manages all timesheets
- Handles filtering and pagination
- Functions: `createTimesheet`, `deleteTimesheet`

---

### **`/types`** - TypeScript Definitions

#### `timesheet.ts`
Defines interfaces for type safety:

```typescript
interface Task {
  id: string;
  date: string;
  project: string;      // User-entered project name
  workType: string;     // User-entered work type
  description: string;
  hours: number;
  status?: "completed" | "incomplete" | "pending";
}

interface TimesheetRecord {
  id: string;
  week: number;
  dateRange: string;
  status: "COMPLETED" | "INCOMPLETE" | "MISSING";
  tasks: Task[];
  startDate: string;
  endDate: string;
}
```

---

### **`/utils`** - Helper Functions

#### `dateHelpers.ts`
Date manipulation utilities:

##### `getWeekStartDate(date: Date)`
- Returns Monday of any given week

##### `getWeekDates(weekOffset: number)`
- Calculates week dates based on current date + offset
- Returns formatted date strings and week number

##### `generateWeekDates(startDateString: string)`
- Generates 5 working days (Mon-Fri) from a start date
- Returns array of dates with labels

---

## 🔄 How It Works

### 1. **Authentication Flow**
```
User enters credentials → AuthContext validates → NextAuth creates session → Redirect to dashboard
```

### 2. **Creating a Timesheet**
```
Click "Create New Timesheet" → System calculates current week + offset → Creates new timesheet → Saves to localStorage
```

### 3. **Adding Tasks**
```
Click "Add new task" → Modal opens → User enters project, work type, description, hours → Task saved → Status auto-updates
```

### 4. **Data Persistence**
```
Any CRUD operation → TimesheetContext updates state → useEffect triggers → Data saved to localStorage → Survives page refresh
```

### 5. **Status Calculation**
```
Task added/updated/deleted → Calculate total hours → Update status:
  - 0 hours = MISSING
  - 1-39 hours = INCOMPLETE
  - 40+ hours = COMPLETED
```

---

## 🎨 Styling

- **Framework:** Tailwind CSS
- **Custom Theme:** Extended in `tailwind.config.ts`
- **Responsive:** Mobile-first approach
- **Colors:**
  - Primary: `#FF8A4C` (Orange)
  - Status badges: Green, Yellow, Pink

---

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server at localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

---

## 🌟 Key Features Explained

### 1. **Fully Dynamic Data**
- No hardcoded projects or work types
- Users enter any text they want
- True flexibility for different workflows

### 2. **LocalStorage Persistence**
- All data saved automatically
- Survives browser refresh and closure
- No backend required for demo

### 3. **Responsive Design**
- Mobile: Stacked layouts, full-width buttons
- Tablet: Hybrid layouts
- Desktop: Side-by-side layouts, optimal spacing

### 4. **Type Safety**
- Full TypeScript coverage
- Interfaces for all data structures
- Type-safe API calls

---


## 📚 Technologies Used

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication
- **[React Hooks](https://react.dev/reference/react)** - State management
- **[Lucide React](https://lucide.dev/)** - Icon library

---


**Tentwenty Team**

For questions or support, please contact: [muhammadahmedite@gmail.com](mailto:muhammadahmedite@gmail.com)

---


**Made for ❤️ Tentwenty**
