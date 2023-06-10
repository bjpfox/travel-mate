TRUNCATE TABLE itineraries, trips, users;
-- TRUNCATE TABLE trips;
-- TRUNCATE TABLE users;

ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE trips_id_seq RESTART WITH 1;
ALTER SEQUENCE itineraries_id_seq RESTART WITH 1;

INSERT INTO users (username, password_hash) VALUES ('test@test.com', '$2b$10$6BMTcmTrLDmI0sSun5rChOHrq/trurerTy03yA/RkQ6MQhgFQ4l9q');

INSERT INTO trips (destination, time_of_departure, duration, activities, 
budget, additional_information, created_on, updated_on, user_id) 
VALUES ('London', 'Summer 2024', '2 weeks', 'sightseeing, music festivals, tennis',
'150 pounds per day', 'include at least one museum',
'2022-12-05 17:47:46', '2022-12-05 17:47:46', 1);

INSERT into itineraries (json_result, trip_id) VALUES 
('[
    {
      "Title": "British Museum",
      "Description": "Take a walk around the British Museum",
      "Latitude": 51.5194,
      "Longitude": -0.1269,
      "Website": "https://www.britishmuseum.org/",
      "Category": "Museum"
    },
    {
      "Title": "Covent Museum",
      "Description": "Take a walk around the Covent Garden",
      "Latitude": 51.5129,
      "Longitude": -0.1227,
      "Website": "https://www.coventgarden.london/",
      "Category": "Shopping & Entertainment"
    },
    {
      "Title": "Tower of London",
      "Description": "Take a walk around the Tower of London",
      "Latitude": 51.5081,
      "Longitude": -0.0759,
      "Website": "https://www.hrp.org.uk/tower-of-london/",
      "Category": "Historic Site"
    },
    {
      "Title": "Tower Bridge",
      "Description": "Take a walk around Tower Bridge",
      "Latitude": 51.5055,
      "Longitude": -0.0754,
      "Website": "https://www.towerbridge.org.uk/",
      "Category": "Landmark"
    }
  ]', 1)
