const { Mutex } = require('async-mutex');
const SessionModel = require('../models/session.model');
const SpotModel = require('../models/spot.model');
const FeeService = require('./fee.service');

const checkoutLock = new Mutex();

class SessionService {
  static async checkout(registrationNumber) {
    // acquire lock
    return checkoutLock.runExclusive(async () => {
      const session = await SessionModel.findActiveByPlate(registrationNumber);
      if (!session) throw new Error('No active session for this vehicle');
      
      const feeCents = await FeeService.calculateFee(session);

      // close session
      const closedSession = await SessionModel.closeSession(session.id, feeCents);

      // free the spot
      await SpotModel.updateSpotState(session.spot_id, 'free');

      return { closedSession, fee: feeCents / 100 }; // return fee in $
    });
  }
}

module.exports = SessionService;
