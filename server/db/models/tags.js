const Sequelize = require('sequelize')
const db = require('../db')

const Tag = db.define('tag', {
  imageUrl: {
    type: Sequelize.TEXT
  },
  lat: {
    typ
    
    e: Sequelize.DECIMAL
  },
  long: {
    type: Sequelize.DECIMAL
  }
})

module.exports = Tag

