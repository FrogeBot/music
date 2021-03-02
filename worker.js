const { isMainThread, parentPort, workerData } = require("worker_threads");
options = workerData;

// Create discord.js client
const Discord = require("discord.js");
const client = new Discord.Client();

let ready = false;
client.on("ready", () => {
  ready = true;
  console.log(`Music client ready`);
});

client.on("error", (error) => {
  console.log(error);
});

client.login(options.TOKEN); // discord.js connect to discord bot

const musicCmdPath = "main.js";
let { cmdFunc } = require("./" + musicCmdPath); // Gets function of music commands

// On worker message (music command passthrough)
parentPort.on("message", async (data) => {
  if (!isMainThread && ready) {
    let { msgId, channelId, args, cmd } = data;
    try {
      let channel = await client.channels.fetch(channelId); // Get channel from ID
      let msg = await channel.messages.fetch(msgId); // Get message from ID
      setImmediate(async () => {
        cmdFunc(msg, args, cmd.action); // Runs command function
      });
    } catch (e) {
      console.log(e);
    }
  }
});

// Catch process errors
process.on("uncaughtException", function (err) {
  console.log(err);
});
