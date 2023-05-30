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
('{
    "Day 1": [
      {
        "Location": "British Museum",
        "Latitude": 51.5194,
        "Longitude": -0.1269,
        "Website": "https://www.britishmuseum.org/",
        "Category": "Museum"
      },
      {
        "Location": "Covent Garden",
        "Latitude": 51.5129,
        "Longitude": -0.1227,
        "Website": "https://www.coventgarden.london/",
        "Category": "Shopping & Entertainment"
      },
      {
        "Location": "Tower of London",
        "Latitude": 51.5081,
        "Longitude": -0.0759,
        "Website": "https://www.hrp.org.uk/tower-of-london/",
        "Category": "Historic Site"
      },
      {
        "Location": "Tower Bridge",
        "Latitude": 51.5055,
        "Longitude": -0.0754,
        "Website": "https://www.towerbridge.org.uk/",
        "Category": "Landmark"
      }
    ],
    "Day 2": [
      {
        "Location": "Buckingham Palace",
        "Latitude": 51.5014,
        "Longitude": -0.1419,
        "Website": "https://www.royal.uk/buckingham-palace",
        "Category": "Historic Site"
      },
      {
        "Location": "Westminster Abbey",
        "Latitude": 51.4993,
        "Longitude": -0.1273,
        "Website": "https://www.westminster-abbey.org/",
        "Category": "Church"
      },
      {
        "Location": "Big Ben",
        "Latitude": 51.5007,
        "Longitude": -0.1246,
        "Website": "https://www.parliament.uk/bigben",
        "Category": "Landmark"
      },
      {
        "Location": "The London Eye",
        "Latitude": 51.5033,
        "Longitude": -0.1195,
        "Website": "https://www.londoneye.com/",
        "Category": "Observation Wheel"
      }
    ],
    "Day 3": [
      {
        "Location": "Natural History Museum",
        "Latitude": 51.4966,
        "Longitude": -0.1764,
        "Website": "https://www.nhm.ac.uk/",
        "Category": "Museum"
      },
      {
        "Location": "Kensington Palace",
        "Latitude": 51.5051,
        "Longitude": -0.1877,
        "Website": "https://www.hrp.org.uk/kensington-palace/",
        "Category": "Historic Site"
      },
      {
        "Location": "Hyde Park",
        "Latitude": 51.5074,
        "Longitude": -0.1657,
        "Website": "https://www.royalparks.org.uk/parks/hyde-park",
        "Category": "Park"
      },
      {
        "Location": "Piccadilly Circus",
        "Latitude": 51.5101,
        "Longitude": -0.1340,
        "Website": "https://www.london.gov.uk/about-us/our-building-and-squares/piccadilly-circus",
        "Category": "Landmark"
      }
    ]
}', 1)
