
const { ipcMain } = require('electron');
const csv = require('fast-csv');
const datastore = require('../datastore');

var startByte = 0;
var initiatedRead = false;
var lastRead = null;
var needsUpdate = true
const fs = require('fs');

const DATA_TYPE_HISTORY = 'DATA_TYPE_HISTORY';
const DATA_TYPE_SUMARY = 'DATA_TYPE_SUMARY';

//TODO
const DATA_TYPE_REAL_TIME = 'DATA_TYPE_REAL_TIME';
const DATA_TYPE_STATS = 'DATA_TYPE_STATS';


try {
  fs.watch('../../test-csv.csv', () => {
    fs.stat('../../test-csv.csv', (err, stats) => {
      if (stats.size === 0) { return }
      if (err) throw err;
      fs.createReadStream('../../test-csv.csv', {
        start: startByte,
        end: stats.size
      })
        .pipe(csv({headers : false}))
        .on('data', async data => {
          startByte = stats.size;
          if (data.length !== 7) {
            return
          }
          if (!initiatedRead) {
            lastRead = {
              voltage: data[0],
              current: data[1],
              power: data[2],
              opTemp: data[3],
              suTemp: data[4],
              waterBreaker: data[5],
              pumpId: data[6]
            }
            return
          }
          var dataObject = {
            voltage: data[0],
            current: data[1],
            power: data[2],
            opTemp: data[3],
            suTemp: data[4],
            waterBreaker: data[5],
            pumpId: data[6]
          }
          try {
              await datastore.storeSensorData(dataObject)
              needsUpdate = true
            } catch(error) {
              console.log(error)
            }
        })		
        .on('end', async data => {
          if (!initiatedRead) {
            try {
              await datastore.storeSensorData(lastRead)
              needsUpdate = true
            } catch(error) {
              console.log(error)
            }
            initiatedRead = true
            return
          }
      })
    })
  })
} catch(error) {
  console.log(error)
}


ipcMain.on('is-data-updated', async (e, msg) => {
  try { 
    if (!needsUpdate) {
      return
    }
    var data = {};
    switch(msg.dataType) {
      case DATA_TYPE_HISTORY:
        setting.to = to;
        setting.from = from;
        break
      case DATA_TYPE_SUMARY:
        data = await datastore.getSummaryData(msg.pump_id)
        e.sender.send('is-data-updated', {data: data})
        break
      case DATA_TYPE_REAL_TIME:
        data = await datastore.getRealTime({pumpId: msg.pump_id})
        e.sender.send('is-data-updated', {data: data})
        break
      default:
        break;
    }
    needsUpdate = false
  } catch(error) {
    e.sender.send('is-data-updated', false)
  }
})