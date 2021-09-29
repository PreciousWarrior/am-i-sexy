const axios = require('axios');
const Server = require('./server/index');

class Client {
	constructor(server, address) {
		this.server = server;
		this.address = address;
	}

	async amISexy(name) {
		const response = await axios.default.get(`http://${this.address}/api/issexy/${name}`);
		return response.data;
	}

	static async build() {
		const port = 3000;
		const server = new Server(port, 'server/sexylist.txt');
		await server.start();
		return new Client(server, `localhost:${port}`);
	}
}

module.exports = Client;
