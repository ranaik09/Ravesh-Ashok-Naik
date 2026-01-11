class Tour {
  final String id;
  final String name;
  final String description;
  final String tourType;
  final double price;
  final int durationHours;
  final List<String> highlights;
  final List<String> includedServices;

  const Tour({
    required this.id,
    required this.name,
    required this.description,
    required this.tourType,
    required this.price,
    required this.durationHours,
    required this.highlights,
    required this.includedServices,
  });

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'tourType': tourType,
      'price': price,
      'durationHours': durationHours,
      'highlights': highlights,
      'includedServices': includedServices,
    };
  }

  factory Tour.fromJson(Map<String, dynamic> json) {
    return Tour(
      id: json['id'] as String,
      name: json['name'] as String,
      description: json['description'] as String,
      tourType: json['tourType'] as String,
      price: (json['price'] as num).toDouble(),
      durationHours: json['durationHours'] as int,
      highlights: List<String>.from(json['highlights'] as List),
      includedServices: List<String>.from(json['includedServices'] as List),
    );
  }
}
