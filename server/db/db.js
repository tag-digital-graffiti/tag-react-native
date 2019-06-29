const Sequelize = require('sequelize')
const pkg = require('../../package.json')

// const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const hello = new Sequelize(
  `postgres://localhost:5432/tagdb`,
  {
    logging: false
  }
)

module.exports = hello;

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
// if (process.env.NODE_ENV === 'test') {
//   after('close database connection', () => db.close())
// }

