class Driver {
  final String id;
  final String name;
  final String phoneNumber;
  final String vehicleModel;
  final String vehicleNumber;
  final double rating;
  final int totalTrips;
  final bool isAvailable;
  final List<String> languages;

  const Driver({
    required this.id,
    required this.name,
    required this.phoneNumber,
    required this.vehicleModel,
    required this.vehicleNumber,
    required this.rating,
    required this.totalTrips,
    required this.isAvailable,
    required this.languages,
  });

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'phoneNumber': phoneNumber,
      'vehicleModel': vehicleModel,
      'vehicleNumber': vehicleNumber,
      'rating': rating,
      'totalTrips': totalTrips,
      'isAvailable': isAvailable,
      'languages': languages,
    };
  }

  factory Driver.fromJson(Map<String, dynamic> json) {
    return Driver(
      id: json['id'] as String,
      name: json['name'] as String,
      phoneNumber: json['phoneNumber'] as String,
      vehicleModel: json['vehicleModel'] as String,
      vehicleNumber: json['vehicleNumber'] as String,
      rating: (json['rating'] as num).toDouble(),
      totalTrips: json['totalTrips'] as int,
      isAvailable: json['isAvailable'] as bool,
      languages: List<String>.from(json['languages'] as List),
    );
  }
}
