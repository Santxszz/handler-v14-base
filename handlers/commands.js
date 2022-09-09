const fs = require("fs");

module.exports = (client) => {
  fs.readdirSync('./commands/').forEach(dir => {
    const commands = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));

      for (let file of commands) {
        let pull = require(`../commands/${dir}/${file}`);

        if (pull.config.name) {
          client.commands.set(pull.config.name, pull);
        } 
        if (pull.config.aliases && Array.isArray(pull.config.aliases)) {
          pull.config.aliases.forEach(x => client.aliases.set(x, pull.config.name))
        } else {
          continue;
        }
      }

    });
};
