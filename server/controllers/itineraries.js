// *-*-*-*-*-*-*-*-*-*-
// TODO
// *-*-*-*-*-*-*-*-*-*-


const express = require('express')

const db = require('../db')
const loginRequired = require('../middleware/login-required')
const asyncHandler = require('../middleware/async-handler')

const router = express.Router()

router.post('/:followeeID', loginRequired, asyncHandler(async (req, res) => {
  const { followeeID } = req.params
  const { id: followerID } = req.session.user

  if (followeeID === followerID.toString()) {
    const err = new Error('Forbidden')
    err.status = 403
    throw err
  }

  try {
    const query = `
      INSERT INTO follows (follower_id, followee_id)
      VALUES ($1, $2)
    `
    await db.query(query, [followerID, followeeID])
    res.json({ message: 'User followed successfully' })
  } catch (err) {
    if (err.code === '23505' && err.constraint === 'follows_pkey') {
      err = new Error('Already following user')
      err.status = 400
    }
    throw err
  }
}))

router.get('/followers', loginRequired, asyncHandler(async (req, res) => {
  const { id: followeeID } = req.session.user
  const query = `
    SELECT users.id, users.username
    FROM follows
    JOIN users ON users.id = follows.follower_id
    WHERE follows.followee_id = $1;
  `
  const { rows } = await db.query(query, [followeeID])
  res.json(rows)
}))

router.get('/following', loginRequired, asyncHandler(async (req, res) => {
  const { id: followerID } = req.session.user
  const query = `
    SELECT users.id, users.username
    FROM follows
    JOIN users ON users.id = follows.followee_id
    WHERE follows.follower_id = $1;
  `
  const { rows } = await db.query(query, [followerID])
  res.json(rows)
}))

router.delete('/:followeeID', loginRequired, asyncHandler(async (req, res, next) => {
  const { followeeID } = req.params
  const { id: followerID } = req.session.user
  const query = `
    DELETE FROM follows
    WHERE follower_id = $1
    AND followee_id = $2
  `
  await db.query(query, [followerID, followeeID])
  res.status(204).send()
}))

module.exports = router
