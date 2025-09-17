class ParkingFloor {
    constructor(floorNumber, capacity) {
        this.floorNumber = floorNumber;
        this.capacity = capacity;
        this.occupiedSpots = 0;
    }
    
    isFull() {
        return this.occupiedSpots >= this.capacity;
    }

    parkVehicle() {
        if (this.isFull()) {
            throw new Error('Parking floor is full');
        }
        this.occupiedSpots += 1;
    }

    removeVehicle() {
        if (this.occupiedSpots > 0) {
            this.occupiedSpots -= 1;
        } else {
            throw new Error('No vehicles to remove');
        }
    }

    getAvailableSpots() {
        return this.capacity - this.occupiedSpots;
    }
}

module.exports = ParkingFloor;