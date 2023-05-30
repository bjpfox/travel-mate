const express = require('express')

const db = require('../db')
const loginRequired = require('../middleware/login-required')
const asyncHandler = require('../middleware/async-handler')

const router = express.Router()

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

// Create a a new trip
router.post('/', loginRequired, asyncHandler(async (req, res) => {
  //const text = req.body.text.trim()
  const { trips } = req.body
  console.log('trips:', trips)
  // TODO check scenarios where optional fields are empty - does this still work or will it break
  const sql = `
    INSERT INTO trips (destination, time_of_departure, duration, activities, budget, additional_information, created_on, updated_on, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `
  const { rows } = await db.query(sql, [trips.destination, trips.time_of_departure, trips.duration, trips.activities,
    trips.budget, trips.additional_information, trips.created_on, trips.updated_on, req.session.user.id])
  res.status(201).json(rows[0])
}))



// Get form entered trip data for a particular trip id - WORKING
// if no trip_id given, just return all trips from the current logged in user

// TODO only return trip id if it belongs to logged in user?

// router.get('/:id', asyncHandler(async (req, res) => {
router.get('/', asyncHandler(async (req, res) => {

  if (req.query.id) {
    console.log('there was an id')
    const id = req.query.id
    const query = `
      SELECT id, destination, time_of_departure, duration, activities, budget, additional_information, created_on, updated_on, user_id
      FROM trips
      WHERE trips.id = $1
    `
  // JOIN users ON users.id = trips.user_id
    // const { id } = req.params
    const { rows } = await db.query(query, [id])
    if (!rows[0]) {
      const err = new Error('Trip not found')
      err.status = 404
      throw err
    }
    res.json(rows[0])
  } else {
      // If no trip_id, return all trips from the current logged in user
      // router.get('/', asyncHandler(async (req, res) => {
        const query = `
          SELECT id, destination, time_of_departure, duration, activities, budget, additional_information, created_on, updated_on
          FROM trips
          WHERE user_id = $1 
        `
        const { id: user_id } = req.session.user
        console.log('query', query)
        console.log('userid', user_id)
        //console.log()
        const { rows } = await db.query(query, [user_id])
        // rows.map((item) => console.log(JSON.parse(item.row)))

     
        console.log('rows:', rows)
        // const dbResponse = await db.query(query, [user_id])
        // dbResponse
        //console.log('rows[0] is', JSON.parse(rows[0].row))
        //const rowsJson = rows.map((row) => JSON.parse(row))
        //rowsJson.map(row => row.json())
        //console.log('rj', rowsJson)

        res.json(rows)
    }}))
  

// Update form entered data for a particular trip id
router.put('/:id', loginRequired, tripExistsAndUserIsOwner, asyncHandler(async (req, res) => {
  const { trips } = req.body
  //const { trips } = req.body.trips
  console.log('trips:', trips)
  console.log('curly trips:', { trips } )
  console.log('trips id:', trips.id)
  console.log('trips dest:', trips.destination)

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
  const { rows } = await db.query(query, [trips.id, trips.destination, trips.time_of_departure, trips.duration, trips.activities,
    trips.budget, trips.additional_information, trips.created_on, trips.updated_on, trips.user_id, trip_id])

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
