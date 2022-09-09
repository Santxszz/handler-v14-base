const { EmbedBuilder } = require("discord.js"); 

module.exports = {
  config: {
    name: "ping",
    aliases: ['a'],
    description: "Replies with pong!",
  },
  permissions: ['SendMessages'],
  owner: true,
  run: async (client, message, args, prefix, config, db) => {

    message.reply({ embeds: [
      new EmbedBuilder()
        .setDescription(`🏓 **Pong!** Client websocket ping: \`${client.ws.ping}\` ms.`)
        .setColor("Green")
    ] })
    
  },
};
