 const shell = require('shelljs');

const UPLOAD_COMMAND = 'claudia update && claudia set-version --version skill'
shell.exec(UPLOAD_COMMAND, {silent:true}, (statusCode, output) => {
	if (statusCode === 0) {
		console.log('Uploaded code to Alexa!');
		
		const outputString = `"${output}"`;
		shell.exec('echo ' + outputString + ' >> newoutput.txt');
	} else {
		console.log('Failed to upload code to Alexa - ask someone for help.');
		const outputString = `"${output}"`;
		shell.exec('echo ' + outputString + ' >> newoutput.txt');
	}
}).output;

console.log('Uploading code...');
