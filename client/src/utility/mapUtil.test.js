import { getMapCenter } from "./mapUtil.js";

describe("getMapCenter", () => {
  test("returns the correct center coordinates for a single item (the point itself) ", () => {
    const itinerary = [
      {
        "Title": "British Museum",
        "Description": "Take a walk around the British Museum",
        "Latitude": 51.5194,
        "Longitude": -0.1269,
        "Website": "https://www.britishmuseum.org/",
        "Category": "Museum"
      },
    ];

    const expectedCenter = {
      lat: 51.5194,
      lng: -0.1269
    };

    const center = getMapCenter(itinerary);

    expect(center).toEqual(expectedCenter);
  });

  test("returns the correct center coordinates for a two items ", () => {
    const itinerary = [
      {
        "Title": "British Museum",
        "Description": "Take a walk around the British Museum",
        "Latitude": 80,
        "Longitude": 100,
        "Website": "https://www.britishmuseum.org/",
        "Category": "Museum"
      },
      {
        "Title": "British Museum",
        "Description": "Take a walk around the British Museum",
        "Latitude": 60,
        "Longitude": 0,
        "Website": "https://www.britishmuseum.org/",
        "Category": "Museum"
      },
    ];

    const expectedCenter = {
      lat: 70,
      lng: 50
    };

    const center = getMapCenter(itinerary);

    expect(center).toEqual(expectedCenter);
  })

    test("returns the correct center coordinates for items with negative coordinates ", () => {
      const itinerary = [
        {
          "Title": "British Museum",
          "Description": "Take a walk around the British Museum",
          "Latitude": -100,
          "Longitude": 100,
          "Website": "https://www.britishmuseum.org/",
          "Category": "Museum"
        },
        {
          "Title": "British Museum",
          "Description": "Take a walk around the British Museum",
          "Latitude": -10,
          "Longitude": -30,
          "Website": "https://www.britishmuseum.org/",
          "Category": "Museum"
        },
      ];

    const expectedCenter = {
      lat: -55,
      lng: 35
    };

    const center = getMapCenter(itinerary);

    expect(center).toEqual(expectedCenter);
  });

  test("returns the correct center coordinates for items with 3 coordinates ", () => {
    const itinerary = [
      {
        "Title": "British Museum",
        "Description": "Take a walk around the British Museum",
        "Latitude": -100,
        "Longitude": 100,
        "Website": "https://www.britishmuseum.org/",
        "Category": "Museum"
      },
      {
        "Title": "British Museum",
        "Description": "Take a walk around the British Museum",
        "Latitude": -10,
        "Longitude": -30,
        "Website": "https://www.britishmuseum.org/",
        "Category": "Museum"
      },
      {
        "Title": "British Museum",
        "Description": "Take a walk around the British Museum",
        "Latitude": -20,
        "Longitude": -50,
        "Website": "https://www.britishmuseum.org/",
        "Category": "Museum"
      },
    ];

  const expectedCenter = {
    lat: -60,
    lng: 25
  };

  const center = getMapCenter(itinerary);

  expect(center).toEqual(expectedCenter);
});


test("returns the correct center coordinates for items with 3 coordinates having decimal places ", () => {
  const itinerary = [
    {
      "Title": "British Museum",
      "Description": "Take a walk around the British Museum",
      "Latitude": -10.55,
      "Longitude": 10.75,
      "Website": "https://www.britishmuseum.org/",
      "Category": "Museum"
    },
    {
      "Title": "British Museum",
      "Description": "Take a walk around the British Museum",
      "Latitude": -10.35,
      "Longitude": -30.75,
      "Website": "https://www.britishmuseum.org/",
      "Category": "Museum"
    },
    {
      "Title": "British Museum",
      "Description": "Take a walk around the British Museum",
      "Latitude": -20.22,
      "Longitude": -50.36,
      "Website": "https://www.britishmuseum.org/",
      "Category": "Museum"
    },
  ];

const expectedCenter = {
  lat: -15.29,
  lng: -19.81
};

const center = getMapCenter(itinerary);

expect(center.lat).toBeCloseTo(expectedCenter.lat);
expect(center.lng).toBeCloseTo(expectedCenter.lng);
});

});
