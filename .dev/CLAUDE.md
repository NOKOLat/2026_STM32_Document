# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an educational React documentation site for STM32 microcontroller development (2026 cohort course). It's a multi-step tutorial covering embedded systems topics from basic LED control to advanced sensor integration and software design patterns.

## Build & Development Commands

- **`npm run dev`** - Start development server with hot reload (Vite)
- **`npm run build`** - Build for production (runs TypeScript compilation + Vite bundle)
- **`npm run lint`** - Run ESLint to check code style
- **`npm run preview`** - Preview the production build locally

## Architecture Overview

### Technology Stack
- **React 19** with TypeScript
- **Vite** for build tooling
- **React Router** for page navigation (hash-based routing via HashRouter)
- **React Syntax Highlighter** for C/C++ code blocks
- **Deployed to** GitHub Pages at `/2026_STM32_Document/` (see vite.config.ts base path)

### Core Directory Structure

```
src/
├── pages/
│   ├── documents/          # Tutorial content organized by steps (step1-7)
│   ├── Login/              # Authentication pages (LoginPage, RegisterPage)
│   ├── MainPage.tsx        # Course overview and progress tracking
│   ├── mypage.tsx          # User progress page
│   └── BugReport/          # Bug reporting interface
├── components/
│   ├── documents/          # Reusable content components
│   │   ├── ComplateButton  # Progress completion & Discord webhook
│   │   ├── CppCodeRender   # C/C++ syntax highlighted code blocks
│   │   └── FooterPageRoute # Navigation between pages
│   ├── mainpage/           # Main page specific components
│   ├── ProgressBar.tsx     # Progress visualization
│   └── ProgressCircle.tsx  # Circular progress indicator
├── layouts/
│   ├── Header.tsx          # Page section header
│   ├── Footer.tsx          # Footer component
│   ├── Topbar.tsx          # Top navigation bar
│   └── Format.module.css   # Shared styles for documentation
├── routes/
│   ├── Route.tsx           # Main routing configuration
│   ├── ProtectedRoute.tsx  # Auth guard for protected pages
│   └── documents/          # Section-based route definitions (Section1-7)
└── context/
    ├── AuthContext.tsx     # Authentication functions (Login, Register, isTokenValid)
    └── ManageProgress.tsx  # Progress sync API calls (GetProgress, UpDateProgress)
```

### Key Patterns

#### Page Structure
Each document page follows this standard pattern:
1. Import layout components (Topbar, Header, Footer, ComplateButton, FooterPageRoute)
2. Wrap content in a div with style classes from Format.module.css
3. Use provided components for structured content (title, note, tables)
4. End with ComplateButton (reports progress) and FooterPageRoute (navigation)

#### Backend API
All authentication and progress tracking calls go to: `https://2026stm32document.aoi256jp.workers.dev/`

Actions supported:
- `login` - Username/password authentication
- `register` - Account creation
- `verify_token` - Token validation
- `update_progress` - Update user's tutorial progress
- `get_progress` - Fetch user's progress data

Tokens and progress data are stored in localStorage. Server responses may include updated tokens (auto-refresh).

#### Routing Organization
Routes are defined by section (Step/Section 1-7) in separate files under `src/routes/documents/`. Each section file:
1. Imports all pages for that section
2. Returns an array of Route components wrapped in ProtectedRoute
3. Routes are registered in main Route.tsx

#### State Management
- **Auth**: Token and username stored in localStorage; checked on page load via ProtectedRoute
- **Progress**: Individual progress keys stored in localStorage AND synced with backend API
- No Context API or Redux; relies on localStorage + API integration

## Adding New Tutorial Pages

1. Create page file at `src/pages/documents/step{N}/{NN_PageName}/{NN_PageName}.tsx`
2. Import layout components and style
3. Use the template pattern from existing pages (Header, content area with style classes, ComplateButton, FooterPageRoute)
4. Add import and Route to appropriate section file in `src/routes/documents/SectionN.tsx`
5. Run `npm run lint` to verify code style

## Important Notes

- Pages use hash-based routing (`/#/path`) due to GitHub Pages deployment
- Token validation happens via ProtectedRoute wrapper on protected pages
- Progress updates trigger Discord webhooks (handled server-side)
- ESLint enforces consistent code style; check before committing
- All content is in Japanese (教科書/tutorial format)
