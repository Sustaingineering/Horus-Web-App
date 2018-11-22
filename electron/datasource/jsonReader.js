//Read json file and run the next function using lambda
fs = require('fs');
jsonlines = require('jsonlines');

exports.readJSONFile = function(file) {
	return new Promise((resolve) => {
		const readStream = fs.createReadStream('../../test-json.json') //TODO: Check filename
			.pipe(csv({headers : true}))
			.on('data', data => {
			})		
			.on('end', data => {
				return resolve(users)
		})
	})
}