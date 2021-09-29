const express = require('express');
const fs = require('fs/promises');

class Server {
	delay = (ms) => new Promise((res) => setTimeout(res, ms));

	constructor(port, listName) {
		this.port = port;
		this.listName = listName;
	}

	async start() {
		const list = await fs.readFile(this.listName, { encoding: 'utf-8' });
		this.people = list.split('\n').map((person) => person.toLowerCase());
		const app = express();
		app.get('/api/issexy/:name', this.serverRequestHandler);
		app.listen(this.port, () => {
			console.log(`Server is listening at port ${this.port}!`);
		});
		//wait for server to start, app.listen doesnt return a promise :(
		//await this.delay(500);
	}

	serverRequestHandler = async (req, res) => {
		const name = req.params.name.toLowerCase();
		if (this.people.indexOf(name) > -1) {
			res.send(JSON.stringify(true));
		} else {
			res.send(JSON.stringify(false));
		}
	};
}

module.exports = Server;
