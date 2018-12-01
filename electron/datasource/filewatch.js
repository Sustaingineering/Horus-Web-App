
const { ipcMain } = require('electron');
const datastore = require('../datastore');

//JSON Lines 
const jsonlines = require('jsonlines');

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

//TODO: TEST JSON PARSER
try {
  let file = require('path').resolve(__dirname, '../../test-json.jsonl');
  fs.watch(file, () => {
    fs.stat(file, (err, stats) => {
      if (stats.size === 0) { return; }
      if (err) throw err;
      fs.createReadStream(file, {
        start: startByte,
        end: stats.size
      })
        .pipe(jsonlines.parse())
        .on('data', async data => {
          startByte = stats.size;
          if (!initiatedRead) {
            lastRead = data;
            return
          }
          try {
              await datastore.storeSensorData(data)
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
      });
    });
  });
} catch(error) {
  console.log(error)
}


//TODO: Move to electron.js ???
ipcMain.on('get-sensor-data', async (e, msg) => {
  try { 
    if (!needsUpdate) {
      return
    }
    let data = await datastore.getRealTime({pumpId: msg.sensorId})
    e.sender.send('get-sensor-data', {data: data})
    needsUpdate = false
  } catch(error) {
    e.sender.send('get-sensor-data', false)
  }
})

/*
Function that Parses csv files
//Needs: const csv = require('fast-csv');

exports.parseCSVFile = function(file) {
  return new Promise((resolve) => {
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
  })
}
*/