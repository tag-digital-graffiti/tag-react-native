const Sequelize = require('sequelize')
const db = require('../db')

const Tag = db.define('tag', {
  imageUrl: {
    type: Sequelize.TEXT
  },
  lat: {
    type: Sequelize.STRING,
  },
  long: {
    type: Sequelize.STRING,
  }
})

module.exports = Tag

