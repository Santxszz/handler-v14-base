const mongoose = require('mongoose');
const config = require("../config/config.json");

module.exports = (client) => {
	const mongo = process.env.MONGO || config.Handlers.MONGO;

	if (!mongo) {
		console.log("[DATABASE ERROR] Informe a URL de conexão.");
	} else {
		mongoose.connect(mongo, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}).catch((e) => console.log(e))

		mongoose.connection.once("open", () => {
			console.log("[DATABASE] Conectado ao Banco de Dados.");
		})
		return;
	}
}