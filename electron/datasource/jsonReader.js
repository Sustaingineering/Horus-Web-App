//Testing purposes
//Run node jsonReader.js to print contents of test-json.jsonl file to console
//Read json file and run the next function using lambda
fs = require('fs');
jsonlines = require('jsonlines');

exports.readJSONFile = function(file) {
	return new Promise((resolve) => {
		let file = require('path').resolve(__dirname, '../../test-json.jsonl'); //TODO: Check filename
		const readStream = fs.createReadStream(file) 
			.pipe(jsonlines.parse())
			.on('data', data => {
                console.log(data);
			})		
			.on('end', data => {
				console.log('Done');
		});
	});
}

let example = this.readJSONFile();