const bcrypt = require('bcrypt')

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
const checkPasswordHash = (password, hash) => bcrypt.compareSync(password, hash)

module.exports = { hashPassword, checkPasswordHash }
