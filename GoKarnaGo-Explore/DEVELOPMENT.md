# GoKarnaGo-Explore - Flutter Project Structure

This directory contains the Flutter mobile application for GoKarnaGo-Explore.

## Quick Start

```bash
cd GoKarnaGo-Explore
flutter pub get
flutter run
```

## Build Commands

### Development
```bash
flutter run --debug
```

### Release Builds
```bash
# Android APK
flutter build apk --release

# Android App Bundle
flutter build appbundle --release

# Web
flutter build web --release

# iOS
flutter build ios --release
```

## Docker Build

Build the Docker image for Flutter web and Android:

```bash
docker build -t gokarnago-explore .

# Run web server
docker run -p 8080:80 gokarnago-explore
```

## Project Structure

```
GoKarnaGo-Explore/
├── lib/
│   ├── main.dart                 # App entry point
│   ├── core/                     # Core functionality
│   │   ├── constants/           # App constants
│   │   ├── router/              # Navigation
│   │   ├── theme/               # Theme configuration
│   │   ├── utils/               # Utilities
│   │   └── services/            # Core services
│   ├── features/                # Feature modules
│   │   ├── drivers/             # Driver listing
│   │   │   ├── data/           # Data layer
│   │   │   ├── domain/         # Business logic
│   │   │   └── presentation/   # UI layer
│   │   ├── bookings/            # Booking management
│   │   ├── tours/               # Tour packages
│   │   └── chat/                # Chat with translation
│   └── shared/                  # Shared components
│       ├── widgets/            # Reusable widgets
│       └── models/             # Shared models
├── test/                        # Test files
├── android/                     # Android configuration
├── ios/                         # iOS configuration
├── web/                         # Web configuration
├── pubspec.yaml                 # Dependencies
├── analysis_options.yaml        # Linter rules
├── Dockerfile                   # Docker configuration
└── README.md                    # This file
```

## Features

1. **Driver Direct** - Connect directly with local drivers
2. **Tour Packages** - Pre-defined tours and routes
3. **Booking Management** - Track your bookings
4. **Linguist-Link** - Real-time chat translation

## CI/CD

GitHub Actions workflow automatically:
- Builds Docker images on push to main
- Generates Android APK and AAB
- Creates Flutter web build
- Runs code analysis and tests

See `.github/workflows/main.yml` for details.
