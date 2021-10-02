const express = require('express')

const lib = require('./library')

const app = express();
app.use(
    express.urlencoded({
      extended: true
    })
)

app.use(express.json())

const server = require('http').Server(app);
const port = 3000;

app.get('/', (req, res) => {
	res.status(200);
	res.json({ message: "GET Response" });
	res.end();
});

app.post('/', (req, res) => {
	res.status(200);
	res.json({ message: "POST Response" });
	res.end();
});

app.post('/crypt-message', (req, res) => {
    const request = req.body; // get request sent
    const message = request.message;
    const algorithm = request.algorithm;
    // Logs imofration received
    console.log("Message to process: ", message);
    console.log("Algorithm used for encryption: ", algorithm);

    // Request Validation
    // We can handle only 2 algorithm keys : HC2, H3X


    // Process the request
    let message_encrypted = "";
    for (let i = 0; i < message.length; i++) {
        message_encrypted = message_encrypted + lib.getCode(message.charAt(i))
    }

    // Send response
	res.status(200);
	res.json({ message: message_encrypted });
	res.end();
});

app.put('/decrypt-message', (req, res) => {
	res.status(200);
	res.json({ message: "PUT Response" });
	res.end();
});

server.listen(port, (err) => {
	if (err) {
		throw err;
	}

	console.log('Server running on localhost: ', port);
});

