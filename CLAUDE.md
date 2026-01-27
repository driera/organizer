# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript note-taking application called "Organizer" built with Vite. It allows users to create, view, and delete notes with due dates. Notes are persisted to localStorage.

## Development Commands

### Development Server
```bash
npm run dev
```
Starts the Vite development server.

### Build
```bash
npm run build
```
Compiles TypeScript and builds the production bundle with Vite.

### Linting
```bash
npm run lint
```
Runs ESLint on all `.ts` and `.tsx` files with strict settings.

### Testing
```bash
npm test
```
Runs type checking (`tsc --noEmit`) followed by Jest tests.

```bash
npm run test:watch
```
Runs Jest in watch mode for interactive test development.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing.

## Architecture

### Component Structure

The application follows a simple component hierarchy:

- `App.tsx` - Root component that orchestrates the app, uses the `useNotes` hook for state management
- `NoteTaker.tsx` - Input form component for creating new notes
- `NoteList.tsx` - Displays the list of notes with delete functionality

### State Management

State is managed via a custom hook pattern:

- `useNotes.ts` - Custom hook that manages notes state and provides `addNote`/`removeNote` functions
  - Automatically syncs state with localStorage via `useEffect`
  - Notes are stored in reverse chronological order (newest first)

### Data Layer

- `repository/notes-repository.ts` - Static class that handles localStorage operations
  - Key used: `"organizer-notes"`
  - Methods: `getNotes()`, `setNotes()`, `resetNotes()`

### Type Definitions

- `types.ts` - Central type definitions
  - `Note`: `{ message: string; dueDate: string }`
  - `Notes`: Array of `Note` objects

### Styling

- Uses Chakra UI component library for all UI components
- CSS Modules with camelCase convention for custom styles
- PostCSS with nesting-rules enabled
- ChakraProvider wraps the entire app in `main.tsx`

## External Documentation

When working with Chakra UI components, always refer to `docs/chakra-ui-llm.txt` for the complete Chakra UI documentation. This file contains comprehensive guidance on component usage, props, and best practices.

## Code Conventions

### TypeScript
- Strict mode enabled
- `noUnusedLocals` and `noUnusedParameters` enforced
- Components are typed with `FunctionComponent` from React

### ESLint/Prettier
- Prettier configuration: no trailing commas, semicolons required
- Testing Library queries should prefer screen queries
- React Refresh plugin enabled for fast refresh during development
- Unused variables generate warnings (not errors)

### Testing
- Jest with `ts-jest` preset
- React Testing Library for component tests
- Tests located alongside source files with `.test.ts(x)` or `.spec.ts(x)` extensions
- Setup file: `src/setupTests.ts`

### Git Commits
- Do NOT include "Co-Authored-By: Claude" or any AI attribution in commit messages
- Write clear, concise commit messages describing the changes

### Session Documentation
- At the start of each development session, create a session file in `/sessions/YYMMDD-name_of_task.md`
  - Format: `YYMMDD-name_of_task.md` (e.g., `260127-chakra-ui-v3-migration.md`)
  - YY = year, MM = month, DD = day
  - name_of_task = brief description of the session goal
- Session file should include:
  - **Goals**: What we want to accomplish in this session
  - **Progress**: Updates as work progresses, including decisions made
  - **Summary**: Final summary of what was completed
  - **Issues/Blockers**: Any problems encountered and how they were resolved
- Update the session file throughout the session to maintain context
- This helps restore context if the session needs to be restarted

## Current Features & Roadmap

From the README, the project includes:
- Creating notes with due dates
- Deleting notes / marking them done
- Notes persistence via localStorage
- Notes appear in reverse order (most recent first)

Planned features (not yet implemented):
- Expanded due date options (today, tomorrow, this week, this month, some day)
- Ordering notes by due date, then creation date
- Column-based layout grouped by due date
- Style improvements
