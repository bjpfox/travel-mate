DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS trips CASCADE;
DROP TABLE IF EXISTS itineraries CASCADE;
DROP INDEX username_index;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE UNIQUE INDEX username_index
ON users (username);

CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  destination TEXT NOT NULL,
  time_of_departure TEXT NOT NULL,
  duration TEXT NOT NULL,
  activities TEXT,
  budget TEXT,
  additional_information TEXT,
  -- TODO - check this
  created_on TIMESTAMPTZ DEFAULT current_timestamp, 
  updated_on TIMESTAMPTZ DEFAULT current_timestamp,
  user_id INT REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE itineraries (
  id SERIAL PRIMARY KEY,
  json_result TEXT NOT NULL,
  trip_id INT REFERENCES trips (id) ON DELETE CASCADE,
  UNIQUE (trip_id)
);