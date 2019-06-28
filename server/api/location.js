const router = require('express').Router()
const { Tag } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const getAll = await Tag.findAll()
    res.json(getAll)
  } catch (error) {
    next(error)
  }
})
module.exports = router
