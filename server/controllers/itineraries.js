// *-*-*-*-*-*-*-*-*-*-
// TODO
// *-*-*-*-*-*-*-*-*-*-
// Routes:
// Get itinerary by trip id
// Post itinerary
// Update itinerary
// Delete itinerary

const express = require('express')

const db = require('../db')
const loginRequired = require('../middleware/login-required')
const asyncHandler = require('../middleware/async-handler')

const router = express.Router()

// Create a new trip itinerary
// Typically this will be used to send the itin data we get from the openAI API, on creation of new trip
router.post('/:tripID', loginRequired, asyncHandler(async (req, res) => {
  const { tripID } = req.params
  const { json_result } = req.body
  const { id: userID } = req.session.user

  console.log('jsonis',json_result)
  console.log('tripID',tripID)

    const query = `
      INSERT INTO itineraries (json_result, trip_id)
      VALUES ($1, $2)
    `
    await db.query(query, [json_result, tripID])
    res.json({ message: 'New itinerary created' })
}))

// Get an itinerary for a trip id
router.get('/:tripID', loginRequired, asyncHandler(async (req, res) => {
  const { tripID } = req.params
  const query = `
    SELECT *
    FROM itineraries
    WHERE trip_id = $1;
  `
  const { rows } = await db.query(query, [tripID])
  res.json(rows)
}))

// Delete a trip itinerary
router.delete('/:tripID', loginRequired, asyncHandler(async (req, res, next) => {
  const { tripID } = req.params
  const query = `
    DELETE FROM itineraries 
    WHERE trip_id = $1
  `
  await db.query(query, [tripID])
  res.status(204).send()
}))

// Edit a trip itinerary
router.put('/:tripID', loginRequired, asyncHandler(async (req, res) => {
  const { tripID } = req.params
  const { json_result } = req.body
  const { id: userID } = req.session.user
  console.log('jsonis',json_result)
  console.log('tripID',tripID)

    const query = `
      UPDATE itineraries 
      SET json_result = $1,
      trip_id = $2
      WHERE trip_id = $2
      RETURNING *
    `
    await db.query(query, [json_result, tripID])
    res.json({ message: 'Trip editted successfully' })
}))

module.exports = router