const dbConn = require('../../config/db.config')

module.exports = {
  // For Post Sensor
  postSensor: (data, speciality, callback) => {
    console.log(speciality)
    for (var i = 0; i < speciality.length; i++) {
      dbConn.query(
        'INSERT INTO sensor_degerler (sensor_deger_ad, sensor_deger_ozellik, sensor_deger) VALUES (?,?,?)',
        [data.sensor_ad, speciality[i], 0]
      )
      if (i == speciality.length - 1) {
        dbConn.query(
          'INSERT INTO sensorler (sensor_ad, sensor_konum, sensor_ozellik, sensor_frekans) VALUES (?,?,?,?)',
          [data.sensor_ad, '0,0', data.sensor_ozellik, 0],
          (error, results, _fields) => {
            if (error) {
              return callback(error)
            } else {
              return callback(null, results)
            }
          }
        )
      }
    }
  },

  /*
  {
    "sensor_ad":"Metan",
    "sensor_ozellik":"CO2,Toz,O2,Metan"
  }
  */

  // For Set Frekans and Location
  setSensor: (konum, frekans, callback) => {
    for (var i = 0; i < frekans.length; i++) {
      dbConn.query('UPDATE sensorler set sensor_frekans=? WHERE sensor_ad = ?', [
        frekans[i + 1],
        frekans[i]
      ])
      if (i == frekans.length - 2) {
        dbConn.query(
          'UPDATE sensorler set sensor_konum=? WHERE sensor_ad = ?',
          [konum[i + 1], konum[i]],
          (error, results, _fields) => {
            if (error) {
              return callback(error)
            } else {
              return callback(null, results)
            }
          }
        )
      }
      dbConn.query('UPDATE sensorler set sensor_konum=? WHERE sensor_ad = ?', [
        konum[i + 1],
        konum[i]
      ])
      i++
    }
  },

  /* 
  {
    "konum":"Metan.5,5.Sıcaklık.10,10",
    "frekans":"Metan,5,Sıcaklık,10"
  }
  */

  // For General Sensor Page
  getGeneral: (callback) => {
    dbConn.query(
      'SELECT sensor_ad, sensor_konum, sensor_frekans FROM sensorler WHERE sensor_frekans != 0',
      (error, results, _fields) => {
        if (error) {
          return callback(error)
        } else {
          return callback(null, results)
        }
      }
    )
  },

  // For Delete Sensor Action

  deleteAction: (name, callback) => {
    dbConn.query(
      'UPDATE sensorler set sensor_konum=?, sensor_frekans=? WHERE sensor_ad = ?',
      ['0,0', 0, name],
      (error, results, _fields) => {
        if (error) {
          return callback(error)
        } else {
          return callback(null, results)
        }
      }
    )
  },

  /*
  localhost:3000/api/:name => localhost:3000/api/Metan => name = Metan
  */

  // For Sensor Detail Page
  getDetail: (name, callback) => {
    dbConn.query(
      'SELECT sensorler.sensor_ad, sensorler.sensor_konum, sensorler.sensor_ozellik, sensorler.sensor_frekans, sensor_degerler.sensor_deger_ozellik, sensor_degerler.sensor_deger From sensorler, sensor_degerler WHERE sensorler.sensor_ad=? AND sensor_degerler.sensor_deger_ad=?',
      [name, name],
      (error, results, _fields) => {
        if (error) {
          return callback(error)
        } else {
          return callback(null, results)
        }
      }
    )
  },

  /*
  localhost:3000/api/:name => localhost:3000/api/Metan => name = Metan
  */

  // For Update Values
  updateValue: (ad, ozellik, callback) => {
    for (var i = 0; i < ozellik.length; i++) {
      var random = Math.floor(Math.random() * 100)
      if (i == ozellik.length - 1) {
        dbConn.query(
          'UPDATE sensor_degerler set sensor_deger=? WHERE sensor_deger_ad=? AND sensor_deger_ozellik=?',
          [random, ad, ozellik[i]],
          (error, results, _fields) => {
            if (error) {
              return callback(error)
            } else {
              return callback(null, results)
            }
          }
        )
      }
      dbConn.query(
        'UPDATE sensor_degerler set sensor_deger=? WHERE sensor_deger_ad=? AND sensor_deger_ozellik=?',
        [random, ad, ozellik[i]]
      )
    }
  },

  /* 
  {
    "sensor_ad":"Metan",
    "sensor_ozellik":"Duman,Co2,Metan,Toz,O2"
  }
  */

  setMap: (data, callback) => {
    dbConn.query(
      'INSERT INTO map (cords, rads) Values (?,?)',
      [data.cords, data.rads],
      (error, results, _fields) => {
        if (error) {
          return callback(error)
        } else {
          return callback(null, results)
        }
      }
    )
  },

  getSensor: (callback) => {
    dbConn.query('Select * from sensorler', (error, results, _fields) => {
      if (error) {
        return callback(error)
      } else {
        return callback(null, results)
      }
    })
  },

  setMapSensor: (data, callback) => {
    dbConn.query(
      'Insert Into map_sensors (map_id, sensor_adi, sensor_konum, sensor_frekans) Values (?,?,?,?)',
      [data.map_id, data.sensor_adi, data.sensor_konum, data.sensor_frekans],
      (error, results, _fields) => {
        if (error) {
          return callback(error)
        } else {
          return callback(null, results)
        }
      }
    )
  },

  getMapSensor: (id, callback) => {
    dbConn.query('Select * from map_sensors Where map_id = ?', [id], (error, results, _fields) => {
      if (error) {
        return callback(error)
      } else {
        return callback(null, results)
      }
    })
  }
}
