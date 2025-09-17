// app.js
const ParkingSpot = require('./src/models/parkingSpot');
const ParkingFloor = require('./src/models/parkingFloor');
const ParkingLot = require('./src/models/parkingLot'); // we will define this manager
const EntryService = require('./src/services/entry.service');
const ExitPanel = require('./src/panels/ExitPanel');

// ==== Setup Parking Lot (1 floor, 6 spots) ====
const floor1Spots = [
  new ParkingSpot('F1-S1', 'S'),
  new ParkingSpot('F1-S2', 'S'),
  new ParkingSpot('F1-M1', 'M'),
  new ParkingSpot('F1-M2', 'M'),
  new ParkingSpot('F1-L1', 'L'),
  new ParkingSpot('F1-L2', 'L'),
];
const floor1 = new ParkingFloor(1, floor1Spots);

const parkingLot = new ParkingLot([floor1]);

async function simulate() {
  console.log('🚗 Smart Parking Lot System Simulation Started');

  // vehicles (simple mock objects)
  const car = { registrationNumber: 'UP32AB1234', sizeCategory: 'M', vehicle_type: 'car' };
  const bike = { registrationNumber: 'UP32XY5678', sizeCategory: 'S', vehicle_type: 'bike' };
  const bus = { registrationNumber: 'UP32BUS999', sizeCategory: 'L', vehicle_type: 'bus' };

  // === Entry Simulation ===
  console.log('\n[Entry] Car entering...');
  const { session: carSession, spot: carSpot } = await EntryService.checkin(car);
  console.log(`Car parked at spot ${carSpot.spotId}`);

  console.log('\n[Entry] Bike entering...');
  const { session: bikeSession, spot: bikeSpot } = await EntryService.checkin(bike);
  console.log(`Bike parked at spot ${bikeSpot.spotId}`);

  // === Exit Simulation ===
  console.log('\n[Exit] Car leaving...');
  const { closedSession: closedCarSession, fee: carFee } = await ExitPanel.checkout(car.registrationNumber);
  console.log(`Car fee: $${carFee}`);

  console.log('\n[Exit] Bike leaving...');
  const { closedSession: closedBikeSession, fee: bikeFee } = await ExitPanel.checkout(bike.registrationNumber);
  console.log(`Bike fee: $${bikeFee}`);

  console.log('\n🏁 Simulation Finished');
}

simulate().catch((err) => console.error('App error:', err));
