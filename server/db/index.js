const pg = require('pg')

const db = new pg.Pool({
  database: process.env.DB_NAME || 'travel-mate'
})

module.exports = db
