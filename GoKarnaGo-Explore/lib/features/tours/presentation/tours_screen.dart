import 'package:flutter/material.dart';

class ToursScreen extends StatelessWidget {
  const ToursScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Tour Packages'),
      ),
      body: GridView.count(
        crossAxisCount: 2,
        padding: const EdgeInsets.all(16),
        mainAxisSpacing: 16,
        crossAxisSpacing: 16,
        children: [
          _buildTourCard(
            'Gokarna Temple Tour',
            'Visit ancient temples',
            Icons.temple_hindu,
          ),
          _buildTourCard(
            'Om Beach Sunset',
            'Beautiful sunset views',
            Icons.beach_access,
          ),
          _buildTourCard(
            'Half Day Sightseeing',
            'Explore Gokarna beaches',
            Icons.explore,
          ),
          _buildTourCard(
            'Airport Transfer',
            'Comfortable pickups',
            Icons.flight,
          ),
        ],
      ),
    );
  }

  Widget _buildTourCard(String title, String subtitle, IconData icon) {
    return Card(
      child: InkWell(
        onTap: () {},
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, size: 48, color: Colors.blue),
              const SizedBox(height: 12),
              Text(
                title,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                subtitle,
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 12),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
