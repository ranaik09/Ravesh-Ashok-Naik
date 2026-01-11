import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../features/drivers/presentation/drivers_screen.dart';
import '../../features/bookings/presentation/bookings_screen.dart';
import '../../features/tours/presentation/tours_screen.dart';
import '../../features/chat/presentation/chat_screen.dart';

class AppRouter {
  static final GoRouter router = GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const HomeScreen(),
      ),
      GoRoute(
        path: '/drivers',
        builder: (context, state) => const DriversScreen(),
      ),
      GoRoute(
        path: '/bookings',
        builder: (context, state) => const BookingsScreen(),
      ),
      GoRoute(
        path: '/tours',
        builder: (context, state) => const ToursScreen(),
      ),
      GoRoute(
        path: '/chat',
        builder: (context, state) => const ChatScreen(),
      ),
    ],
  );
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('GoKarnaGo Explore'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Welcome to GoKarnaGo',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => context.go('/drivers'),
              child: const Text('Find Drivers'),
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: () => context.go('/tours'),
              child: const Text('Browse Tours'),
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: () => context.go('/bookings'),
              child: const Text('My Bookings'),
            ),
          ],
        ),
      ),
    );
  }
}
