import 'package:flutter/material.dart';

class DriversScreen extends StatelessWidget {
  const DriversScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Available Drivers'),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: 5,
        itemBuilder: (context, index) {
          return Card(
            margin: const EdgeInsets.only(bottom: 16),
            child: ListTile(
              leading: const CircleAvatar(
                child: Icon(Icons.person),
              ),
              title: Text('Driver ${index + 1}'),
              subtitle: const Text('Toyota Innova • 4.5 ⭐'),
              trailing: ElevatedButton(
                onPressed: () {},
                child: const Text('Request Quote'),
              ),
            ),
          );
        },
      ),
    );
  }
}
