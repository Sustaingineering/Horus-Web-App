const fs = require('fs');
const jsonlines = require('jsonlines');
const file = require('path').resolve(__dirname, '../test-json.jsonl');
const MAX_TIME = 5000;
const config = require('./simulate_config.json');
let timer = null;
let currentTime = 0;

//TODO: with user_id, fetch user sensor list to randomly print data, user number, 
let startSimulation = exports.startSimulation = async () => {
    timer = setInterval(writeFile, 3500);
}
startSimulation()
let stopSimulation = exports.stopSimulation = async () => {
    clearInterval(timer);
}

function writeFile() {
    if(currentTime === MAX_TIME) { stopSimulation }
    currentTime += 1
    let data = generateRandomData()
    data.pumpId = 'S1'
    let fileVal =  {
        number: '+16041234567',
        date: Math.round((new Date()).getTime() / 1000),
        data: data
    }
    fileval = JSON.stringify(fileVal)
    writeJSONFile(fileVal)
    console.log('Cant stop me now!', fileVal);
  }

  
var generateRandomData = exports.generateRandomData = () => {
    if (config.dataFields.count <= 0) {return}
    let data = {};
    let dataFields = config.dataFields;
    for(dataField in dataFields) {
        let fieldMax = dataFields[dataField].max
        let fieldMin = dataFields[dataField].min
        let fieldVal = randomInt(fieldMin, fieldMax); 
        data[dataField] = fieldVal
    }
    return data
}

  var writeJSONFile = function(data) {
    return new Promise((resolve, reject) => {
        try {
            let writeStream = fs.createWriteStream(file, { 'flags': 'a', 'encoding': null, 'mode': 0666 });
            let stringifier = jsonlines.stringify();
            stringifier.pipe(writeStream);
            stringifier.write(data);
            stringifier.end();
            return resolve(true);
        } catch(err) {
            console.log(err);
            return reject(err);
        }
	})
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
}
