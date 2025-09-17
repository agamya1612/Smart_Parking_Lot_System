class FeeCalculator {
  constructor(rates) {
    // rates example: { car: 20, bike: 10, bus: 50 }
    this.rates = rates;
  }

  calculate(session) {
    const hours = session.getDurationHours();
    const rate = this.rates[session.vehicle.type] || 0;
    return hours * rate;
  }
}

module.exports = FeeCalculator;
