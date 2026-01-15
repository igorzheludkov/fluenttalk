# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm start              # Start Expo development server
npm run ios            # Run on iOS (expo run:ios)
npm run android        # Run on Android (expo run:android)
npm run web            # Run on web
npm run ts:check       # TypeScript type checking
```

## Architecture Overview

FluentTalk is a React Native/Expo app for language learning through dialog practice. It uses Firebase for auth and Firestore for data.

### Project Structure

- `App.tsx` - Entry point: Redux Provider + NavigationContainer + auth state listener
- `app/navigation/` - React Navigation v7 setup
- `app/store/` - Redux Toolkit state management
- `app/services/` - Firestore data operations
- `app/screens/` - Screen components organized by feature stack
- `app/components/` - Reusable UI components (`UI/`) and feature blocks (`blocks/`)

### Navigation Architecture

```
RootNavigator (Native Stack)
├── AuthStack (when not authenticated)
│   └── LoginSignUp
└── MainTabs (when authenticated)
    └── DialogStack
        ├── Dialogs (CategoriesScreen)
        ├── Subcategory
        └── Talk
```

Auth state determines which stack is shown via `selectUser` selector in RootNavigator.

### State Management

Redux Toolkit with RTK Query:
- `authSlice` - User state and auth loading flag
- `apiSlice` - RTK Query base configuration
- `app/store/api/auth/authApi.ts` - Auth mutations (signUp, signIn, signOut)

Use typed hooks from `app/store/hooks.ts`:
```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks'
```

### Data Model

Firestore collections with hierarchical structure:
```
DialogCategory → DialogSubCategory → DialogItem → DialogPart → DialogSentence
```

Dialog parts have difficulty levels (levelOne, levelTwo, levelThree) and two sides (ME, OTHER).

### Path Alias

Use `@/` to import from `app/` directory:
```typescript
import { Button } from '@/components/UI/Button'
```

## Code Style

- Use destructured React imports: `{ useState } from 'react'` not `React.useState`
- No trailing spaces
- Run linter only on modified files
