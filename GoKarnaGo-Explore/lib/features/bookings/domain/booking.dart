class Booking {
  final String id;
  final String userId;
  final String driverId;
  final String pickupLocation;
  final String dropLocation;
  final DateTime bookingDate;
  final String status;
  final double estimatedCost;
  final String? specialRequests;

  const Booking({
    required this.id,
    required this.userId,
    required this.driverId,
    required this.pickupLocation,
    required this.dropLocation,
    required this.bookingDate,
    required this.status,
    required this.estimatedCost,
    this.specialRequests,
  });

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'userId': userId,
      'driverId': driverId,
      'pickupLocation': pickupLocation,
      'dropLocation': dropLocation,
      'bookingDate': bookingDate.toIso8601String(),
      'status': status,
      'estimatedCost': estimatedCost,
      'specialRequests': specialRequests,
    };
  }

  factory Booking.fromJson(Map<String, dynamic> json) {
    return Booking(
      id: json['id'] as String,
      userId: json['userId'] as String,
      driverId: json['driverId'] as String,
      pickupLocation: json['pickupLocation'] as String,
      dropLocation: json['dropLocation'] as String,
      bookingDate: DateTime.parse(json['bookingDate'] as String),
      status: json['status'] as String,
      estimatedCost: (json['estimatedCost'] as num).toDouble(),
      specialRequests: json['specialRequests'] as String?,
    );
  }
}
