import 'package:flutter_test/flutter_test.dart';
import 'package:gokarnago_explore/main.dart';

void main() {
  testWidgets('App loads successfully', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const GoKarnaGoApp());

    // Verify that app starts
    expect(find.text('GoKarnaGo Explore'), findsOneWidget);
  });
}
