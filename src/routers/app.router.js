const {
  postSensor,
  setSensor,
  getDetail,
  getGeneral,
  deleteAction,
  updateValue,
  setMap,
  getSensor,
  setMapSensor,
  getMapSensor
} = require('../controllers/app.controller')
const router = require('express').Router()

// For post new sensor
router.post('/', postSensor)

// For setting sensors location and frekans
router.patch('/set', setSensor)

// For delete action of a sensor
router.patch('/del/:name', deleteAction)

// For updating value of sensor
router.patch('/val', updateValue)

// For getting general sensor page
router.get('/gen', getGeneral)

// For getting a sensors detail page
router.get('/det/:name', getDetail)

router.post('/set-map', setMap)

router.get('/sensors', getSensor)

router.post('/set-map-sensors', setMapSensor)

router.get('/map-sensors/:id', getMapSensor)

module.exports = router
