exports.getAvgFromData = function (dataList) {
    return new Promise((resolve, reject) => {
        try {

            let voltageList = dataList[0]
            let currentList = dataList[1]
            let powerList = dataList[2]
            let opTempList = dataList[3]
            let suTempList = dataList[4]

            let voltageSum = 0
            let currentSum = 0
            let powerSum = 0
            let opTempSum = 0
            let suTempSum = 0

            let size = voltageList.length
            //Given that all lists have the same number of elements, 
            //we can iterate through them in one loop
            for(i = 0; i < size; i++) {
                voltageSum += voltageList[i]
                currentSum += currentList[i]
                powerSum += powerList[i]
                opTempSum += opTempList[i]
                suTempSum += suTempList[i]
            }

            let voltageAvg = voltageSum / size
            let currentAvg = currentSum / size
            let powerAvg = powerSum / size
            let opTempAvg = opTempSum / size
            let suTempAvg = suTempSum / size
            
            let avgList = [
                voltageAvg, 
                currentAvg,
                powerAvg,
                opTempAvg,
                suTempAvg
            ]

            return resolve(avgList)

        } catch(error) {
            return reject(error)
        }
    })
}

exports.getMaxFromData = function (dataList) {
    return new Promise((resolve, reject) => {
        try {

            let voltageList = dataList[0]
            let currentList = dataList[1]
            let powerList = dataList[2]
            let opTempList = dataList[3]
            let suTempList = dataList[4]

            let voltageMax = Math.max(...voltageList)
            let currentMax = Math.max(...currentList)
            let powerMax = Math.max(...powerList)
            let opTempMax = Math.max(...opTempList)
            let suTempMax = Math.max(...suTempList)

            let maxList = [
                voltageMax, 
                currentMax,
                powerMax,
                opTempMax,
                suTempMax
            ]

            return resolve(maxList)

        } catch (error) {
            return reject(error)
        }
    })
}

exports.getMinFromData = function (dataList) {
    return new Promise((resolve, reject) => {
        try {

            let voltageList = dataList[0]
            let currentList = dataList[1]
            let powerList = dataList[2]
            let opTempList = dataList[3]
            let suTempList = dataList[4]

            let voltageMin = Math.min(...voltageList)
            let currentMin = Math.min(...currentList)
            let powerMin = Math.min(...powerList)
            let opTempMin = Math.min(...opTempList)
            let suTempMin = Math.min(...suTempList)

            let minList = [
                voltageMin, 
                currentMin,
                powerMin,
                opTempMin,
                suTempMin
            ]

            return resolve(minList)

        } catch (error) {
            return reject(error)
        }
    })
}