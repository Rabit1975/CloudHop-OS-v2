# CloudHop OS 2.0 - Structure Documentation

## Overview
CloudHop 2.0 is structured as a modular operating system with clear separation between layers.

## Directory Structure

### Root Level
- **package.json** - Project dependencies and scripts
- **tsconfig.json** - TypeScript configuration with path aliases
- **vite.config.ts** - Vite build configuration
- **.gitignore** - Git ignore rules

### /electron
Electron desktop application configuration
- **main.ts** - Electron main process
- **preload.ts** - Preload script for renderer-main communication
- **electron-builder.json** - Build configuration for desktop apps

### /build
Build assets for desktop applications
- **/icons** - Application icons for different platforms (.ico, .icns, .png)

### /public
Static public assets served by the web server
- **index.html** - Main HTML template
- **manifest.json** - PWA manifest
- **logo192.png, logo512.png** - PWA icons
- **browserconfig.xml** - Browser configuration

### /src
Main application source code

#### /src/kernel
OS-level kernel layer - Core application infrastructure

**Providers** (`/kernel/providers/`)
- AppProviders.tsx - Root provider wrapper
- AuthProvider.tsx - Authentication context
- SessionProvider.tsx - Session management
- SettingsProvider.tsx - App settings
- RealtimeProvider.tsx - Real-time connections
- AIProvider.tsx - AI capabilities
- ThemeProvider.tsx - Theme management

**Auth** (`/kernel/auth/`)
- AuthGate.tsx - Authentication gate component
- useAuth.ts - Auth hook

**Routing** (`/kernel/routing/`)
- Router.tsx - Main router component
- routes.ts - Route definitions

**Errors** (`/kernel/errors/`)
- ErrorBoundary.tsx - Error boundary component

#### /src/core
Core engines and services

**Supabase** (`/core/supabase/`)
- client.ts - Supabase client configuration
- types.ts - Database type definitions

**Realtime** (`/core/realtime/`)
- useRealtime.ts - Real-time hook
- channels.ts - Channel definitions

**Signaling** (`/core/signaling/`)
- useSignaling.ts - WebRTC signaling hook
- signalingClient.ts - Signaling client

**Presence** (`/core/presence/`)
- usePresence.ts - Presence tracking hook
- presenceChannel.ts - Presence channel

**User** (`/core/user/`)
- useUser.ts - User management hook
- userStore.ts - User state store

**Settings** (`/core/settings/`)
- useSettings.ts - Settings hook
- settingsStore.ts - Settings state store

**AI** (`/core/ai/`)
- AIClient.ts - AI client implementation
- tools.ts - AI tool definitions
- contextBuilder.ts - Context builder for AI

#### /src/modules
Feature modules - Main application features

**Chat** (`/modules/chat/`)
- ChatModule.tsx - Main chat module
- ChatSidebar.tsx - Chat sidebar
- ChatWindow.tsx - Chat window
- useChatActions.ts - Chat actions hook

**Meetings** (`/modules/meetings/`)
- MeetingsModule.tsx - Meetings module
- useWebRTC.ts - WebRTC functionality
- useMeetingRoom.ts - Meeting room logic
- CallOverlay.tsx - Call controls overlay

**Spaces** (`/modules/spaces/`)
- SpacesModule.tsx - Spaces module
- useHopSpaces.ts - Spaces management hook
- GalaxyView.tsx - Galaxy view component
- SpaceInterior.tsx - Space interior view

**Profile** (`/modules/profile/`)
- ProfileModule.tsx - Profile module
- ProfileCard.tsx - Profile card component

**Settings** (`/modules/settings/`)
- SettingsModule.tsx - Settings module
- SettingsPanel.tsx - Settings panel

**AI Tools** (`/modules/ai-tools/`)
- AIToolsModule.tsx - AI tools module
- AIPanel.tsx - AI panel component

#### /src/ui
UI system and design components

**Components** (`/ui/components/`)
- Button.tsx - Button component
- Input.tsx - Input component
- Modal.tsx - Modal component
- Toast.tsx - Toast notification
- Card.tsx - Card component

**Layout** (`/ui/layout/`)
- AppLayout.tsx - Main app layout
- Sidebar.tsx - Navigation sidebar

**Primitives** (`/ui/primitives/`)
- Flex.tsx - Flex layout primitive
- Stack.tsx - Stack layout primitive

**Icons** (`/ui/icons/`)
- index.ts - Icon exports

**Logo** (`/ui/logo/`)
- Logo.tsx - Logo component
- LogoLoader.tsx - Loading screen with logo

**Theme** (`/ui/theme/`)
- tokens.ts - Design tokens
- dark.ts - Dark theme
- light.ts - Light theme

**Animations** (`/ui/animations/`)
- transitions.ts - Animation utilities

#### /src/lib
Shared utility libraries
- **storage.ts** - Local storage utilities
- **fetcher.ts** - HTTP fetcher utilities
- **utils.ts** - General utilities

#### /src/types
TypeScript type definitions
- **user.ts** - User types
- **space.ts** - Space types
- **message.ts** - Message types
- **presence.ts** - Presence types
- **call.ts** - Call types
- **ai.ts** - AI types
- **settings.ts** - Settings types

#### /src/assets
Static assets
- **/logos** - Logo assets
- **/icons** - Icon assets
- **/gradients** - Gradient assets
- **/mural** - Mural/background assets

## Path Aliases
The following path aliases are configured in tsconfig.json:

```typescript
@/* -> ./src/*
@kernel/* -> ./src/kernel/*
@core/* -> ./src/core/*
@modules/* -> ./src/modules/*
@ui/* -> ./src/ui/*
@lib/* -> ./src/lib/*
@types/* -> ./src/types/*
```

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev              # Start Vite dev server
npm run electron:dev     # Start Electron in dev mode
```

### Building
```bash
npm run build            # Build for web
npm run electron:build   # Build Electron app
```

## Architecture Principles

1. **Layered Architecture**: Clear separation between kernel, core, modules, and UI
2. **Provider Pattern**: Context providers for cross-cutting concerns
3. **Modular Design**: Self-contained feature modules
4. **Type Safety**: Full TypeScript coverage with strict mode
5. **Component Library**: Reusable UI components with consistent design

## Next Steps

1. Install dependencies: `npm install`
2. Configure environment variables (Supabase, etc.)
3. Replace placeholder icon/logo files with actual assets
4. Implement authentication flow
5. Set up database schema
6. Configure WebRTC signaling server
7. Implement AI service integration
8. Add routing logic
9. Build out feature modules
10. Add tests

## Notes

- All placeholder icon/logo files should be replaced with actual assets
- Environment variables need to be configured for Supabase and other services
- The structure is ready for immediate development
- Each module is independent and can be developed in parallel
