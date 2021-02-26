require('dotenv').config()
var mysql = require('mysql');
var mc = require('minecraft-protocol');

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

var server = mc.createServer({
  'online-mode': true,
  encryption: true,
  host: process.env.MC_HOST,
  port: 25565,
  motd: '\u00a7cHyStats\u00a7r Verification Server',
  maxPlayers: 0,
  favicon: 'data:image/png;base64,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'
});
const mcData = require('minecraft-data')(server.version)

server.on('login', function(client) {
  var msg = "";
  
  let loginPacket = mcData.loginPacket
  if(client.version != null && client.version <= 578) {
	client.write('login', {
    entityId: client.id,
    levelType: 'default',
    gameMode: 0,
    dimension: 0,
    difficulty: 2,
    maxPlayers: server.maxPlayers,
    reducedDebugInfo: false,
    hashedSeed: [0, 0]
  });
  } else {
	client.write('login', {
    entityId: client.id,
    isHardcore: false,
    gameMode: 0,
    previousGameMode: 255,
    worldNames: loginPacket.worldNames,
    dimensionCodec: loginPacket.dimensionCodec,
    dimension: loginPacket.dimension,
    worldName: 'minecraft:overworld',
    hashedSeed: [0, 0],
    maxPlayers: server.maxPlayers,
    viewDistance: 10,
    reducedDebugInfo: false,
    enableRespawnScreen: true,
    isDebug: false,
    isFlat: false
  });
  }
  
  var uuid = client.uuid.replace(/-/g, "");
  con.query("SELECT * FROM web_verification WHERE uuid = ? ORDER BY lastattempt DESC", [uuid], function (err, result) {
    if (err) throw err;
    if (result.length > 0) {
	 var code = result[0].token;
         msg = "Your authentication code is: "+code;
    } else {
    	msg = "Please register at hystats.net/register first.";
    }
    client.end(msg);
  });
});

console.log(mc.supportedVersions);
