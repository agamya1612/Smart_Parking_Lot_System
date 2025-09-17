CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Vehicle types
CREATE TABLE IF NOT EXISTS vehicle_types (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  width_cm int NOT NULL,
  length_cm int NOT NULL
);

-- Vehicles
CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  plate text NOT NULL UNIQUE,
  vehicle_type_id uuid REFERENCES vehicle_types(id),
  created_at timestamptz DEFAULT now()
);

-- Lots
CREATE TABLE IF NOT EXISTS lots (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  address text
);

-- Floors
CREATE TABLE IF NOT EXISTS floors (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  lot_id uuid REFERENCES lots(id) ON DELETE CASCADE,
  name text NOT NULL,
  level int NOT NULL
);

-- Spots
CREATE TABLE IF NOT EXISTS spots (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  floor_id uuid REFERENCES floors(id) ON DELETE CASCADE,
  spot_code text NOT NULL,
  size_category text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(floor_id, spot_code)
);

-- Spot states
CREATE TABLE IF NOT EXISTS spot_state (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  spot_id uuid REFERENCES spots(id) ON DELETE CASCADE,
  state text NOT NULL,
  since timestamptz NOT NULL DEFAULT now(),
  metadata jsonb
);

-- Parking sessions
CREATE TABLE IF NOT EXISTS parking_sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id uuid REFERENCES vehicles(id),
  vehicle_type_id uuid REFERENCES vehicle_types(id),
  spot_id uuid REFERENCES spots(id),
  checkin_at timestamptz NOT NULL DEFAULT now(),
  checkout_at timestamptz,
  billed_amount_cents bigint,
  status text NOT NULL DEFAULT 'active',
  metadata jsonb
);

-- Pricing rules
CREATE TABLE IF NOT EXISTS pricing_rules (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_type_id uuid REFERENCES vehicle_types(id),
  tier text NOT NULL,
  per_hour_cents int NOT NULL,
  min_cents int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_spots_floor_size ON spots(floor_id, size_category);
CREATE INDEX IF NOT EXISTS idx_sessions_status_vehicle ON parking_sessions(status, vehicle_id);
