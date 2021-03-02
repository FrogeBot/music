options = {
  BOT_NAME: "FrogeBot",
  EMBED_COLOUR: 3394611,
  MSG_VIBING: "",
  MSG_UNVIBING: "",
  SKIP_PERCENT: 50,
  USE_MUSIC_ROLE: true,
  MUSIC_ROLE_NAME: "DJ",
  TOKEN: ""
}

const { Worker } = require('worker_threads');

const musicWorkerPath = '/worker.js'

// Exports
module.exports = function(opts) {
  if(opts.TOKEN == undefined) {
    throw "No token provided"
  }

  Object.keys(opts).forEach(k => { 
    if(options.hasOwnProperty(k)) options[k] = opts[k]
  })
  let musicWorker = new Worker(__dirname+musicWorkerPath, { workerData: options }) // Spawn worker

  function runCmd(msg, args, cmd) {
    musicWorker.postMessage({
      msgId: msg.id,
      interaction: msg.interaction,
      channelId: msg.channel.id,
      args,
      cmd,
    });
  }

  return runCmd
};