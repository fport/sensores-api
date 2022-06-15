const {
  postSensor,
  setSensor,
  getGeneral,
  getDetail,
  deleteAction,
  updateValue,
  setMap,
  getSensor,
  setMapSensor,
  getMapSensor
} = require('../models/app.model')

module.exports = {
  // For Posting Sensor
  postSensor: (req, res) => {
    const body = req.body
    var speciality = body.sensor_ozellik.split(',')
    postSensor(body, speciality, (err, results) => {
      if (err) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: 'Cannot post a sensor'
        })
      } else {
        return res.status(201).json({
          isAuth: true,
          massage: 'sensor successfuly posted!',
          data: results
        })
      }
    })
  },

  // For Setting Sensor
  setSensor: (req, res) => {
    const body = req.body
    var konum = body.konum.split('.')
    var frekans = body.frekans.split(',')
    setSensor(konum, frekans, (err, results) => {
      if (err) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: 'Cannot set a sensor'
        })
      } else {
        return res.status(200).json({
          isAuth: true,
          massage: 'sensor setted successfuly!',
          data: results
        })
      }
    })
  },

  // For getting all setted sensors
  getGeneral: (req, res) => {
    getGeneral((err, results) => {
      if (err) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: 'Cannot get the sensors',
          data: null
        })
      } else if (!results) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: 'No sensors found',
          data: null
        })
      } else {
        return res.status(200).json({
          isAuth: true,
          error: null,
          massage: 'sensors got successfuly',
          data: results
        })
      }
    })
  },

  // For getting a sensors detail
  getDetail: (req, res) => {
    getDetail(req.params.name, (err, results) => {
      if (err) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: 'Cannot get the sensor',
          data: null
        })
      } else if (!results) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: 'No sensor found',
          data: null
        })
      } else {
        return res.status(200).json({
          isAuth: true,
          error: null,
          massage: 'sensor got successfuly',
          data: results
        })
      }
    })
  },

  // For Deleting Action of a sensor
  deleteAction: (req, res) => {
    deleteAction(req.params.name, (err, results) => {
      if (err) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: 'Cannot delete action',
          data: null
        })
      } else {
        return res.status(200).json({
          isAuth: true,
          error: null,
          massage: 'sensor action deleted successfuly',
          data: results
        })
      }
    })
  },

  // For Updating Value of a sensor
  updateValue: (req, res) => {
    const body = req.body
    var ad = body.sensor_ad
    var ozellik = body.sensor_ozellik.split(',')
    updateValue(ad, ozellik, (err, results) => {
      if (err) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: 'Cannot update value of sensor'
        })
      } else {
        return res.status(200).json({
          isAuth: true,
          massage: 'Updating value of sensor is done successfuly',
          data: results
        })
      }
    })
  },

  setMap: (req, res) => {
    const body = req.body
    setMap(body, (err, results) => {
      if (err) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: 'Cannot post a map'
        })
      } else {
        return res.status(201).json({
          isAuth: true,
          massage: 'map successfuly posted!',
          data: results
        })
      }
    })
  },

  getSensor: (req, res) => {
    getSensor((err, results) => {
      if (err) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: 'Cannot get the sensors',
          data: null
        })
      } else if (!results) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: 'No sensors found',
          data: null
        })
      } else {
        return res.status(200).json({
          isAuth: true,
          error: null,
          massage: 'sensors got successfuly',
          data: results
        })
      }
    })
  },

  setMapSensor: (req, res) => {
    const body = req.body
    setMapSensor(body, (err, results) => {
      if (err) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: 'Cannot post a map sensors'
        })
      } else {
        return res.status(201).json({
          isAuth: true,
          massage: 'map sensors successfuly posted!',
          data: results
        })
      }
    })
  },

  getMapSensor: (req, res) => {
    getMapSensor(req.params.id, (err, results) => {
      if (err) {
        return res.status(400).json({
          isAuth: false,
          error: err,
          massage: 'Cannot get map sensors',
          data: null
        })
      } else {
        return res.status(200).json({
          isAuth: true,
          error: null,
          massage: 'map sensors gotten successfuly',
          data: results
        })
      }
    })
  }
}
