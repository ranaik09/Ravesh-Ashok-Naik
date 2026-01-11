# GoKarnaGo-Explore Flutter App

A taxi booking and tour operator mobile application connecting tourists with local drivers in Gokarna, Karnataka.

## Features

- **Driver Direct**: Browse available drivers with their vehicles and ratings
- **Tour Packages**: Pre-defined tour packages for popular destinations
- **Booking Management**: Track and manage your bookings
- **Linguist-Link**: Real-time chat translation (English ↔ Kannada/Hindi/Konkani)

## Architecture

This project follows a **features-first architecture** with clean code principles:

```
lib/
├── core/
│   ├── constants/      # App-wide constants
│   ├── router/         # Navigation configuration
│   ├── theme/          # Theme configuration
│   ├── utils/          # Utility functions
│   └── services/       # Core services
├── features/
│   ├── drivers/        # Driver listing and details
│   ├── bookings/       # Booking management
│   ├── tours/          # Tour packages
│   └── chat/           # Chat with translation
└── shared/
    ├── widgets/        # Reusable widgets
    └── models/         # Shared models
```

Each feature follows the **Clean Architecture** pattern:
- `domain/` - Business logic and entities
- `data/` - Data sources and repositories
- `presentation/` - UI components (screens, widgets, BLoC)

## Getting Started

### Prerequisites

- Flutter SDK (>=3.0.0)
- Dart SDK (>=3.0.0)
- Android Studio / Xcode (for mobile development)
- Firebase project setup

### Installation

1. Clone the repository
2. Navigate to the GoKarnaGo-Explore directory:
   ```bash
   cd GoKarnaGo-Explore
   ```

3. Install dependencies:
   ```bash
   flutter pub get
   ```

4. Configure Firebase:
   - Add `google-services.json` (Android) to `android/app/`
   - Add `GoogleService-Info.plist` (iOS) to `ios/Runner/`

5. Run the app:
   ```bash
   flutter run
   ```

## Building for Production

### Android APK
```bash
flutter build apk --release
```

### Android App Bundle
```bash
flutter build appbundle --release
```

### iOS
```bash
flutter build ios --release
```

### Web
```bash
flutter build web --release
```

## Docker Build

Use Docker to build the Flutter app in a containerized environment:

```bash
docker build -t gokarnago-explore .
```

## CI/CD

This project includes GitHub Actions workflow for automated builds:
- Builds on every push to `main` branch
- Creates Docker image with Flutter build environment
- Generates release artifacts

## Technology Stack

- **Framework**: Flutter
- **State Management**: flutter_bloc
- **Navigation**: go_router
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Translation**: Future integration with translation API
- **Maps**: Google Maps Flutter

## Key Dependencies

- `flutter_bloc` - State management
- `firebase_core` - Firebase integration
- `go_router` - Navigation
- `google_maps_flutter` - Maps integration
- `flutter_chat_ui` - Chat interface
- `cached_network_image` - Image caching

## Development Guidelines

1. Follow the established features-first architecture
2. Use BLoC pattern for state management
3. Keep widgets small and focused
4. Write unit tests for business logic
5. Use meaningful commit messages

## License

Copyright (c) 2026 TheBrainCord (TBC)
