// src/services/entry.service.js
const { Mutex } = require('async-mutex');
const SpotModel = require('../models/ParkingSpot');
const SessionModel = require('../models/session.model');
const ParkingTicket = require('../models/parkingticket');
const parkingLot = require('../models/parkingLotInstance'); // singleton instance

const entryLock = new Mutex();
let ticketCounter = 1;

class EntryService {
  static async checkin(vehicle) {
    return entryLock.runExclusive(async () => {
      // find free spot in the lot
      const spot = parkingLot.findAvailableSpot(vehicle.sizeCategory);
      if (!spot) throw new Error('No available spots for this vehicle type');

      // assign spot
      spot.assignVehicle(vehicle);

      // create parking ticket
      const ticketId = `TICKET-${ticketCounter++}`;
      const ticket = new ParkingTicket(ticketId, vehicle, spot);

      // optionally persist session in DB
      await SessionModel.createSession(vehicle.registrationNumber, spot.spotId);

      return { ticket, spot };
    });
  }
}

module.exports = EntryService;
