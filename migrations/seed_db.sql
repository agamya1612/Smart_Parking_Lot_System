-- Insert vehicle types
INSERT INTO vehicle_types (id, name, width_cm, length_cm)
VALUES
  (uuid_generate_v4(), 'motorcycle', 80, 220),
  (uuid_generate_v4(), 'car', 180, 450),
  (uuid_generate_v4(), 'bus', 250, 1200)
ON CONFLICT (name) DO NOTHING;

-- Insert a lot
INSERT INTO lots (id, name, address)
VALUES (uuid_generate_v4(), 'Downtown Lot', '123 Main St')
ON CONFLICT DO NOTHING;

-- Insert a floor
INSERT INTO floors (id, lot_id, name, level)
SELECT uuid_generate_v4(), id, 'Ground Floor', 0
FROM lots WHERE name = 'Downtown Lot'
ON CONFLICT DO NOTHING;

-- Insert spots (10 for demo)
DO $$
DECLARE
  f_id uuid;
BEGIN
  SELECT id INTO f_id FROM floors WHERE name = 'Ground Floor';
  FOR i IN 1..10 LOOP
    INSERT INTO spots (id, floor_id, spot_code, size_category)
    VALUES (uuid_generate_v4(), f_id, 'G-' || i, 'M')
    ON CONFLICT DO NOTHING;
  END LOOP;
END$$;

-- Insert pricing rules
INSERT INTO pricing_rules (id, vehicle_type_id, tier, per_hour_cents, min_cents)
SELECT uuid_generate_v4(), id, 'standard', 200, 100
FROM vehicle_types
WHERE name = 'car'
ON CONFLICT DO NOTHING;

INSERT INTO pricing_rules (id, vehicle_type_id, tier, per_hour_cents, min_cents)
SELECT uuid_generate_v4(), id, 'standard', 100, 50
FROM vehicle_types
WHERE name = 'motorcycle'
ON CONFLICT DO NOTHING;

INSERT INTO pricing_rules (id, vehicle_type_id, tier, per_hour_cents, min_cents)
SELECT uuid_generate_v4(), id, 'standard', 500, 300
FROM vehicle_types
WHERE name = 'bus'
ON CONFLICT DO NOTHING;
