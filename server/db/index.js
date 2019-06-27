const db = require('./db')

// register models
// require('./models')
const User = require('./models/users')
const Tag = require('./models/tags')

// User.hasMany(Order)
// Order.belongsTo(User)
Tag.belongsTo(User)
User.hasMany(Tag)

module.exports = {
  db,
  User,
  Tag
}




