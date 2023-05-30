const express = require('express')

const db = require('../db')
const { hashPassword } = require('../utils/password')
const asyncHandler = require('../middleware/async-handler')

const router = express.Router()

// Create new user and log user in
router.post('/', asyncHandler(async (req, res) => {
  const { username, password } = Object.entries(req.body).reduce((o, [k, v]) => {
    o[k] = v.trim()
    return o
  }, {})

  const password_hash = hashPassword(password)
  const query = `
    INSERT INTO users(username, password_hash) 
    VALUES($1, $2)
    RETURNING id, username
  `

  try {
    const { rows } = await db.query(query, [username, password_hash])
    const user = req.session.user = rows[0]
    res.json(user)
  } catch (err) {
    if (err.code === '23505' && err.constraint === 'users_username_key') {
      err = new Error('Username already taken')
      err.status = 400
    }
    throw err
  }
}))


module.exports = router
