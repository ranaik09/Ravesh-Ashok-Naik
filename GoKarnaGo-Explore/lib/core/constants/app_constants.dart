class AppConstants {
  // App Info
  static const String appName = 'GoKarnaGo Explore';
  static const String appVersion = '1.0.0';
  
  // Firebase Collections
  static const String driversCollection = 'drivers';
  static const String bookingsCollection = 'bookings';
  static const String toursCollection = 'tours';
  static const String usersCollection = 'users';
  static const String messagesCollection = 'messages';
  
  // Routes
  static const String homeRoute = '/';
  static const String driversRoute = '/drivers';
  static const String bookingsRoute = '/bookings';
  static const String toursRoute = '/tours';
  static const String chatRoute = '/chat';
  
  // Key Airports
  static const List<String> airports = ['GOI', 'GOX', 'HBX', 'IXE'];
  static const Map<String, String> airportNames = {
    'GOI': 'Goa International Airport (Dabolim)',
    'GOX': 'Goa Manohar International Airport',
    'HBX': 'Hubli Airport',
    'IXE': 'Mangalore International Airport',
  };
  
  // Supported Languages for Translation
  static const List<String> supportedLanguages = [
    'English',
    'Kannada',
    'Hindi',
    'Konkani',
  ];
  
  // Tour Types
  static const List<String> tourTypes = [
    'Airport Pickup/Drop',
    'Round Trip',
    'Half Day Sightseeing',
    'Full Day Sightseeing',
    'Temple Tour',
  ];
}
