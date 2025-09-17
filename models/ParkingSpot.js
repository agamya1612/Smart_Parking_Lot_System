// src/models/parkingSpot.js
class ParkingSpot {
  constructor(spotId, sizeCategory) {
    this.spotId = spotId;           
    this.sizeCategory = sizeCategory; 
    this.isOccupied = false;
    this.vehicle = null;
  }

  assignVehicle(vehicle) {
    if (this.isOccupied) {
      throw new Error(`Spot ${this.spotId} is already occupied`);
    }
    this.vehicle = vehicle;
    this.isOccupied = true;
  }

  removeVehicle() {
    if (!this.isOccupied) {
      throw new Error(`Spot ${this.spotId} is already free`);
    }
    const removedVehicle = this.vehicle;
    this.vehicle = null;
    this.isOccupied = false;
    return removedVehicle;
  }
}

module.exports = ParkingSpot;
