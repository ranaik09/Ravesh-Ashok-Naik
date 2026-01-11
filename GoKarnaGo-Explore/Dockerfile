# Multi-stage Dockerfile for Flutter Web and Android builds
# Stage 1: Base Flutter image
FROM ubuntu:22.04 AS flutter-base

# Avoid interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    xz-utils \
    zip \
    libglu1-mesa \
    openjdk-17-jdk \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Set up environment variables
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"

# Install Flutter
ENV FLUTTER_HOME=/opt/flutter
ENV FLUTTER_VERSION=3.19.0
ENV PATH="$FLUTTER_HOME/bin:$PATH"

RUN git clone https://github.com/flutter/flutter.git -b stable --depth 1 $FLUTTER_HOME \
    && flutter precache \
    && flutter doctor -v

# Install Android SDK
ENV ANDROID_HOME=/opt/android-sdk
ENV PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"

RUN mkdir -p $ANDROID_HOME/cmdline-tools && \
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip -O /tmp/cmdline-tools.zip && \
    unzip -q /tmp/cmdline-tools.zip -d $ANDROID_HOME/cmdline-tools && \
    mv $ANDROID_HOME/cmdline-tools/cmdline-tools $ANDROID_HOME/cmdline-tools/latest && \
    rm /tmp/cmdline-tools.zip

# Accept Android licenses
RUN yes | sdkmanager --licenses || true

# Install Android SDK components
RUN sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"

# Stage 2: Build stage
FROM flutter-base AS builder

WORKDIR /app

# Copy pubspec files
COPY pubspec.yaml pubspec.lock* ./

# Get Flutter dependencies
RUN flutter pub get

# Copy the rest of the application
COPY . .

# Enable web and configure
RUN flutter config --enable-web

# Build Flutter Web
RUN flutter build web --release --no-tree-shake-icons

# Build Android APK
RUN flutter build apk --release --split-per-abi

# Build Android App Bundle (AAB)
RUN flutter build appbundle --release

# Stage 3: Output stage for web
FROM nginx:alpine AS web

# Copy web build to nginx
COPY --from=builder /app/build/web /usr/share/nginx/html

# Create custom nginx config
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Stage 4: Artifacts stage
FROM alpine:latest AS artifacts

# Copy build artifacts
COPY --from=builder /app/build/app/outputs/flutter-apk/*.apk /artifacts/apk/
COPY --from=builder /app/build/app/outputs/bundle/release/*.aab /artifacts/aab/
COPY --from=builder /app/build/web /artifacts/web/

# Create a summary file
RUN echo "GoKarnaGo-Explore Build Artifacts" > /artifacts/BUILD_INFO.txt && \
    echo "================================" >> /artifacts/BUILD_INFO.txt && \
    echo "" >> /artifacts/BUILD_INFO.txt && \
    echo "Android APKs:" >> /artifacts/BUILD_INFO.txt && \
    ls -lh /artifacts/apk/ >> /artifacts/BUILD_INFO.txt && \
    echo "" >> /artifacts/BUILD_INFO.txt && \
    echo "Android App Bundle:" >> /artifacts/BUILD_INFO.txt && \
    ls -lh /artifacts/aab/ >> /artifacts/BUILD_INFO.txt && \
    echo "" >> /artifacts/BUILD_INFO.txt && \
    echo "Web Build: Available in /artifacts/web/" >> /artifacts/BUILD_INFO.txt

WORKDIR /artifacts

CMD ["cat", "BUILD_INFO.txt"]
