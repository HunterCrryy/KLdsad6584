const Discord = require("discord.js");
const client = new Discord.Client();
const request = require('request');
var status_chk = true;
var mutados = [];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ game: { name: "B y : H u n t e r", type: 0} });
});
// Mensagem de boas vindas
client.on('guildMemberAdd', member => {
    member.send("Olá Seja bem vindo ao servidor, divirta-se!");
