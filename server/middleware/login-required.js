const loginRequired = (req, res, next) => {
  if (req.session.user) {
    return next()
  }
  res.status(401).json({ message: 'You must be logged in' })
}

module.exports = loginRequired
