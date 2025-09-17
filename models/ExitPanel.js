// src/panels/ExitPanel.js
const SessionService = require('../services/session.service');
const FeeService = require('../services/fee.service');

class ExitPanel {
  static async checkout(ticket) {
    try {
      ticket.markAsExited(new Date());

      // calculate fee
      const fee = FeeService.calculateFee({
        entry_time: ticket.entryTime,
        exit_time: ticket.exitTime,
        vehicle_type: ticket.vehicle.vehicle_type
      });

      ticket.setAmount(fee / 100); // convert cents → dollars
      ticket.setPaid(true);

      // close session in DB
      await SessionService.checkout(ticket.vehicle.registrationNumber);

      console.log(`✅ Vehicle ${ticket.vehicle.registrationNumber} checked out.`);
      console.log(`💰 Parking Fee: $${ticket.amount}`);

      return ticket.getSummary();
    } catch (err) {
      console.error(`❌ Checkout failed for vehicle ${ticket.vehicle.registrationNumber}: ${err.message}`);
      throw err;
    }
  }
}

module.exports = ExitPanel;
