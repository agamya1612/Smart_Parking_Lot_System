
const ParkingFloor = require('./ParkingFloor');
const ParkingSpot = require('./ParkingSpot');
const ParkingSession = require('./parkingSession');

class ParkingLot {
  constructor(name) {
    this.name = name;
    this.floors = [];
    this.activeSessions = new Map(); // registrationNumber -> ParkingSession
  }

  addFloor(parkingFloor) {
    this.floors.push(parkingFloor);
  }

  findAvailableSpot(vehicle) {
    for (const floor of this.floors) {
      for (const spot of floor.spots) {
        if (!spot.isOccupied && this.canFit(vehicle, spot)) {
          return spot;
        }
      }
    }
    return null;
  }

  canFit(vehicle, spot) {
    // simple size check — could be extended
    const sizeMap = { cycle: "S", bike: "S", car: "M", bus: "L" };
    return sizeMap[vehicle.type] === spot.sizeCategory;
  }

  checkIn(vehicle) {
    if (this.activeSessions.has(vehicle.registrationNumber)) {
      throw new Error("Vehicle already checked in");
    }

    const spot = this.findAvailableSpot(vehicle);
    if (!spot) {
      throw new Error("No available spot for this vehicle");
    }

    spot.assignVehicle(vehicle);
    const session = new ParkingSession(vehicle, spot);
    this.activeSessions.set(vehicle.registrationNumber, session);

    return { spot, session };
  }

  checkOut(vehicle, feeCalculator) {
    const session = this.activeSessions.get(vehicle.registrationNumber);
    if (!session) throw new Error("No active session for this vehicle");

    const fee = session.checkout(feeCalculator.calculate.bind(feeCalculator));
    session.spot.removeVehicle();

    this.activeSessions.delete(vehicle.registrationNumber);
    return { fee, duration: session.getDurationHours() };
  }

  getAvailability() {
    return this.floors.map(floor => ({
      floor: floor.floorNumber,
      available: floor.getAvailableSpots()
    }));
  }
}

module.exports = ParkingLot;
