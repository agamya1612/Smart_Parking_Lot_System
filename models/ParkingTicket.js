// src/models/parkingTicket.js
class ParkingTicket {
  constructor(ticketId, vehicle, spot) {
    this.ticketId = ticketId;
    this.vehicle = vehicle;           // vehicle object (car, bike, bus…)
    this.spot = spot;                 // ParkingSpot object
    this.entryTime = new Date();
    this.exitTime = null;
    this.amount = 0;
    this.paid = false;
  }

  markAsExited(exitTime = new Date()) {
    this.exitTime = exitTime;
  }

  setAmount(amount) {
    this.amount = amount;
  }

  setPaid(status) {
    this.paid = status;
  }

  getSummary() {
    return {
      ticketId: this.ticketId,
      vehicle: this.vehicle.registrationNumber,
      spotId: this.spot.spotId,
      entryTime: this.entryTime,
      exitTime: this.exitTime,
      amount: this.amount,
      paid: this.paid
    };
  }
}

module.exports = ParkingTicket;
