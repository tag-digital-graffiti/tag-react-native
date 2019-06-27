const Sequelize = require('sequelize')
const db = require('../db')

const Tag = db.define('tag', {
  imageUrl: {
    type: Sequelize.TEXT
  },
  location: {
    type: Sequelize.ARRAY(Sequelize.FLOAT)
  },
})

module.exports = Tag
