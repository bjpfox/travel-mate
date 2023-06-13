const express = require('express')

const db = require('../db')
const loginRequired = require('../middleware/login-required')
const asyncHandler = require('../middleware/async-handler')

const router = express.Router()

const { fetchItinFromLLM } = require('./fetchItinerary') 


// Only allow the user who entered the trip to edit / delete the trip
const tripExistsAndUserIsOwner = asyncHandler(async (req, res, next) => {
  const { id: trip_id } = req.params
  const { id: user_id } = req.session.user

  const query = `SELECT user_id FROM trips WHERE id = $1`
  const { rows } = await db.query(query, [trip_id])

  if (!rows[0]) {
    const err = new Error('Trip not found')
    err.status = 404
    throw err
  }

  if (rows[0].user_id !== user_id) {
    const err = new Error('Forbidden')
    err.status = 403
    throw err
  }

  next()
})

// Create a new trip
router.post('/', loginRequired, asyncHandler(async (req, res) => {
    const { trip: tripString } = req.body
    const trip = tripString
    trip.created_on = new Date()
    trip.updated_on = new Date()
    const sql = `
      INSERT INTO trips (destination, time_of_departure, duration, activities, budget, additional_information, created_on, updated_on, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
  `
    const { rows } = await db.query(sql, [trip.destination, trip.time_of_departure, trip.duration, trip.activities,
    trip.budget, trip.additional_information, trip.created_on, trip.updated_on, req.session.user.id])

    // Create a new itinerary every time a new trip is created
    const itinResponse = await fetchItinFromLLM(trip)
    const tripID  = rows[0]["id"]
    const json_result  = JSON.stringify(itinResponse)
  
    const query = `
        INSERT INTO itineraries (json_result, trip_id)
        VALUES ($1, $2)
      `
    await db.query(query, [json_result, tripID])

    res.status(201).json({ message: 'New trip and itinerary created' })
}))



// Get form entered trip data for a particular trip id  
// if no trip_id given, just return all trips from the current logged in user

router.get('/', asyncHandler(async (req, res) => {

  if (req.query.id) {
    const id = req.query.id
    const query = `
      SELECT id, destination, time_of_departure, duration, activities, budget, additional_information, created_on, updated_on, user_id
      FROM trips
      WHERE trips.id = $1
    `
    const { rows } = await db.query(query, [id])
    if (!rows[0]) {
      const err = new Error('Trip not found')
      err.status = 404
      throw err
    }
    res.json(rows[0])
  } else {
      // If no trip_id, return all trips from the current logged in user
        const query = `
          SELECT id, destination, time_of_departure, duration, activities, budget, additional_information, created_on, updated_on
          FROM trips
          WHERE user_id = $1 
        `
        const { id: user_id } = req.session.user
        const { rows } = await db.query(query, [user_id])
        res.json(rows)
    }}))
  

// Update form entered data for a particular trip id
router.put('/:id', loginRequired, tripExistsAndUserIsOwner, asyncHandler(async (req, res) => {
  const { trip } = req.body
  const { id: user_id } = req.session.user
  const { id: trip_id } = req.params
  
  const query = `
    UPDATE trips
    SET id = $1,
    destination = $2, 
    time_of_departure = $3, 
    duration = $4,
    activities = $5, 
    budget = $6, 
    additional_information = $7, 
    created_on = $8, 
    updated_on = $9, 
    user_id = $10
    WHERE trips.id = $11
    RETURNING *
  `
  // TODO refactor this
  // Fix var names, trips.id is user_id which is confusing
  // Fix put request, currently include trip id and user id in body with request, but server knows this
  // also a null will just overwrite db with null user_id which shouldnt happen (either add error check or dont use user is from users, use the value from sessions)
  const { rows } = await db.query(query, [trip_id, trip.destination, trip.time_of_departure, trip.duration, trip.activities,
    trip.budget, trip.additional_information, trip.created_on, trip.updated_on, user_id, trip_id])

  res.json(rows[0])
}))


// Delete trip
router.delete('/:id', loginRequired, tripExistsAndUserIsOwner, asyncHandler(async (req, res) => {
  const { id: trip_id } = req.params
  const query = `DELETE FROM trips WHERE id = $1`
  await db.query(query, [trip_id])
  res.status(204).send()
}))

module.exports = router
