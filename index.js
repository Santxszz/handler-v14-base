const { Client, Partials, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config/config.json');
const { DisTube } = require('distube');

const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction
  ]
});

client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();

client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
});

module.exports = client;

["commands", "events", "mongoose"].forEach(file => {
  require(`./handlers/${file}`)(client);
});


client.login(config.Client.TOKEN).catch((err) => {
  console.error("[CRASH] Erro ao conectar-se ao Bot..." + "\n");
  console.error("[CRASH] Erro do Discord API:" + err);
  process.exit();
});


process.on('unhandledRejection', async (err, promise) => {
  console.error(`[ANTI-CRASH] ${err}`);
  console.error(promise);
});