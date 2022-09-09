const fs = require("fs");

module.exports = (client) => {
  fs.readdirSync('./events/').forEach(dir => {
	const commands = fs.readdirSync(`./events/${dir}`).filter(file => file.endsWith('.js'));

	for (let file of commands) {
		let pull = require(`../events/${dir}/${file}`);

		if (pull.name) {
			client.events.set(pull.name, pull);
		} else {
			continue;
		}
		}
	});
}