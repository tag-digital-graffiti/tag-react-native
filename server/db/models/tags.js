const Sequelize = require('sequelize')
const db = require('../db')

const Tag = db.define('tag', {
  imageUrl: {
    type: Sequelize.TEXT
  },
  lat: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0.0002
    }
  },
  long: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0.0002
    }
  }
})

module.exports = Tag

