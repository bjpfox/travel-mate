const express = require('express')

const db = require('../db')
const { checkPasswordHash } = require('../utils/password')
const asyncHandler = require('../middleware/async-handler')

const router = express.Router()

// Check if username and password are valid, if so login the user
router.post('/', asyncHandler(async (req, res) => {
  const { username, password } = req.body
  const query = `SELECT * FROM users WHERE username = $1`
  const { rows } = await db.query(query, [username])
  const user = rows[0]
  if (user && checkPasswordHash(password, user.password_hash)) {
    delete user.password_hash
    req.session.user = user
    return res.json(user)
  }
  const err = new Error('Invalid username or password')
  err.status = 400
  throw err
}))

// Check if user is logged in
router.get('/', (req, res) => {
  const { user } = req.session
  if (!user) {
    return res.status(401).json({ message: 'Not logged in' })
  }
  res.json(user)
})

// Log user out
router.delete('/', (req, res) => {
  req.session.destroy()
  res.json({ message: 'Logged out successfully' })
})

module.exports = router
