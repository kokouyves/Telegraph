const express = require('express');

const app = express();
app.use(
    express.urlencoded({
      extended: true
    })
)

app.use(express.json())

const server = require('http').Server(app);
const port = 4000;

app.get('/', (req, res) => {
	res.status(200);
	res.json({ message: "GET Response" });
	res.end();
});

app.post('/', (req, res) => {
	res.status(200);
	res.json({ message: " c est les vacances" });
    
	res.end();
});

app.post('/crypt-message', (req, res) => {
    const request = req.body; // get request senGETt
    const message = request.message;
    const algorithm = request.algorithm;
    // Logs imofration received
    console.log("Message to process: ", message);
    console.log("Algorithm used for encryption: ", algorithm);

 
    // We can handle only 2 algorithm keys : HC2, H3X
    request.algorithm = 'aes2896mg' ;


    // Process the request
    let message_encrypted = "";
    for (let i = message.length - 1; i >= 0; i--) {
        message_encrypted = message_encrypted + message.charAt(i);
    }
    let message_decrypted = "";
    for (let i = message.length - 1; i>= 0; i--){
        message_decrypted = message_decrypted + message.charAt(i);
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