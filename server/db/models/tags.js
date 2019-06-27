const Sequelize = require('sequelize')
const db = require('../db')

const Tag = db.define('tag', {
  imageUrl: {
    type: Sequelize.TEXT
  },
  lat: {
    type: Sequelize.TEXT
  },
  long: {
    type: Sequelize.TEXT
  }
})

module.exports = Tag

