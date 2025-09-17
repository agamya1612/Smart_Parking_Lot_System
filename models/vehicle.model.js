// src/models/vehicle.js

class Vehicle {
  constructor({ registrationNumber, brand, model, year, color, type }) {
    this.registrationNumber = registrationNumber;
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.color = color;
    this.type = type; // e.g., car, bike, bus, cycle
  }

  getDetails() {
    return `${this.year} ${this.color} ${this.brand} ${this.model} [${this.registrationNumber}] (${this.type})`;
  }

  toJSON() {
    return {
      registrationNumber: this.registrationNumber,
      brand: this.brand,
      model: this.model,
      year: this.year,
      color: this.color,
      type: this.type
    };
  }
}

// 🏎 Car subclass
class Car extends Vehicle {
  constructor({ registrationNumber, brand, model, year, color, doors }) {
    super({ registrationNumber, brand, model, year, color, type: "car" });
    this.doors = doors;
  }

  getDetails() {
    return `${super.getDetails()} with ${this.doors} doors`;
  }
}

// 🏍 Bike subclass
class Bike extends Vehicle {
  constructor({ registrationNumber, brand, model, year, color, hasGear }) {
    super({ registrationNumber, brand, model, year, color, type: "bike" });
    this.hasGear = hasGear;
  }

  getDetails() {
    return `${super.getDetails()} (${this.hasGear ? "Geared" : "Non-Geared"})`;
  }
}

// 🚌 Bus subclass
class Bus extends Vehicle {
  constructor({ registrationNumber, brand, model, year, color, capacity }) {
    super({ registrationNumber, brand, model, year, color, type: "bus" });
    this.capacity = capacity;
  }

  getDetails() {
    return `${super.getDetails()} with capacity ${this.capacity} passengers`;
  }
}

// 🚲 Cycle subclass
class Cycle extends Vehicle {
  constructor({ registrationNumber, brand, model, year, color, typeOfCycle }) {
    super({ registrationNumber, brand, model, year, color, type: "cycle" });
    this.typeOfCycle = typeOfCycle; // e.g., "mountain", "road"
  }

  getDetails() {
    return `${super.getDetails()} (${this.typeOfCycle} cycle)`;
  }
}

module.exports = { Vehicle, Car, Bike, Bus, Cycle };
