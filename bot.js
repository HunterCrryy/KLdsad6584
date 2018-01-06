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

 });
//  >

client.on(`message`, message => {
    if (message.content.split(" ")[0] == "!status") {
        var msg = message;
        if (msg.member.hasPermission("MANAGE_MESSAGES")) {
            var jogo = message.content.replace("!status ","");
            client.user.setPresence({ game: { name: jogo, type: 0 } });
            message.channel.send(" **O status foi alterado para:** "+jogo);
        }
    }
}
);

client.on(`message`, message => {
    if (message.content.split(" ")[0] == "!statusoff") {
        var msg = message;
        if (msg.member.hasPermission("MANAGE_MESSAGES")) {
            var jogo = message.content.replace("!status ","");
            client.user.setPresence({ game: { name: "By: Hunter", type: 0} });
            message.channel.send(" O status foi reestabelecido");
        }
    }
}
);

// Anti !chk no chat
client.on('message',async  (msg) => {
    var is_PM = msg.channel.type == "dm";
    var message = msg;
    if(is_PM && msg.author.id != "395034578433343488"){
        var embed = new Discord.RichEmbed();
        embed.setColor(0x00ff00);
        embed.setAuthor(message.author.username, message.author.avatarURL)
        embed.setDescription("**Só posso executar \nfunções No grupo!**");;
        message.channel.send({ embed })
    }

    if(msg.content.split(" ")[0].indexOf("!") < 0){
        return;
    }
    var cmd = msg.content.split(" ")[0];

// >
    //Qualquer comando a baixo
	
	       var mutados = [];    
            if (cmd == "!mutar") {
				        let modRole = msg.guild.roles.find("name", "Comandante");
        if(msg.member.roles.has(modRole.id)) {
                let mutadosRole = message.guild.roles.find(roles => roles.name === "Mutados");
                var usuario = msg.guild.member(msg.mentions.users.first());
                if (!usuario) {
                    return;
                }
                if (msg.member.hasPermission("MANAGE_MESSAGES")) {
                    if(usuario.roles.has(mutadosRole.id)) return;
                    mutados.push(usuario.id);
                    usuario.addRole(mutadosRole);
                    msg.channel.send("O usuario: " + usuario + " foi mutado!");
                }
            }}
	
    var myArray
    var rand
    if(message.content.split(" ")[0] == "!on"){
    var myArray = ['Estou sim, Pois não?', 'To sim, vamo testa cc pohaa!!'];
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    msg.channel.send(rand+' ');
}
	
    if (message.content.split(" ")[0] == "!ccdo") {
        var usuario = msg.guild.member(msg.mentions.users.first());
        if(!usuario) {
            return;
        }
        message.channel.send("", {
            file: "http://historiascomvalor.com/wp-content/uploads/2015/12/Sua-m%C3%A3e-serviu-torradas-queimadas-para-o-jantar.-A-rea%C3%A7%C3%A3o-de-seu-pai.jpg"
        });
}

    //Informaçõs do gate!
    if(cmd == "!gate"){
        var embed = new Discord.RichEmbed();
        embed.setColor(0xb45ffa);
        embed.setAuthor(message.author.username, message.author.avatarURL)
        embed.setDescription("STATUS DO SERVIDOR\nFORMATO: **5292050025644424|10|2018|358**\nSTATUS DO GATE: **FUNCIONANDO**\nBANDEIRAS: **VISA/MASTERCARD**\nATUALMENTE O SERVIDOR ESTA EM ÓTIMO ESTADO");;
        embed.setFooter("Hunterzinho", "https://i.imgur.com/hneM8Oq.png");
        message.channel.send({ embed })
        }
    //Informaçõs do gate!

    // -> Limpar Chat
let role = message.guild.roles.find("name", "Comandante");
if(message.member.roles.has(role.id) && message.content.startsWith("!limpar")){
	msgDel = 100;
	let numberMessages = parseInt(msgDel);
    message.channel.fetchMessages({limit: numberMessages}).then(messages => message.channel.bulkDelete(messages));
    return message.reply("Chat foi limpo com sucesso!");
}
// -> Limpar Chat

    // Voteban e Votekick - >
    var voteban = false;
    var vote_sim = 0;
    var vote_nao = 0;

    client.on('messageReactionAdd', (reaction, user) => {
        if(reaction.emoji.name === "👍") {
            vote_sim++;
        }
        if(reaction.emoji.name === "👎") {
            vote_nao++;
        }
    });

    if (cmd == "!voteban") {
        let modRole = msg.guild.roles.find("name", "Comandante");
        if(msg.member.roles.has(modRole.id)) {
        if (!voteban) {
            voteban = true;
            vote_sim = 0;
            vote_nao = 0;

            var usuario = msg.guild.member(msg.mentions.users.first());

            var embed = new Discord.RichEmbed();
            embed.setColor(0x1aa8fd);
            embed.setAuthor(msg.author.username, msg.author.avatarURL);
            embed.setTimestamp();
            embed.setDescription("**UMA VOTAÇÃO FOI INCIADA CONTRA O USUARIO:** " + usuario);
            embed.setFooter("Hunterzinho", "https://i.imgur.com/hneM8Oq.png");
            msg.channel.send({embed})
                    .then(function (message) {
                        message.react("👍");
                        message.react("👎");
                        
                    });

            setTimeout(function () {
                msg.channel.send("FALTAM **35 SEGUNDOS** PARA ENCERRAR A VOTAÇÃO.");
                setTimeout(function () {

                    if ((vote_nao + vote_sim) > 2) {

                        var porcent_ban = (vote_sim * 100) / (vote_nao + vote_sim);
                        if (porcent_ban > 50) {
                            var embed = new Discord.RichEmbed();
                            embed.setColor(0x00ff00);
                            embed.setAuthor(msg.author.username, msg.author.avatarURL);
                            embed.setTimestamp();
                            embed.setDescription("A VOTAÇÃO FOI FINALIZADA\nRESULTADO: **CINZADO**");
                            embed.setImage("https://media1.tenor.com/images/66b9e27c779a1a314f0a8b31bb5609f7/tenor.gif");
                            embed.setFooter("Hunterzinho", "https://i.imgur.com/hneM8Oq.png");
                            console.log("Usuario: "+message.username+" foi banido com "+vote_sim+" votos positivos e "+vote_nao+" votos negativos!");
                            msg.channel.send({embed});
                            msg.guild.member(usuario).ban();
                            vote_sim = 0;
                            vote_nao = 0;
                        } else {
                            var embed = new Discord.RichEmbed();
                           embed.setColor(0xff0000);
                            embed.setAuthor(msg.author.username, msg.author.avatarURL);
                            embed.setTimestamp();
                            embed.setDescription("A VOTAÇÃO FOI FINALIZADA\nRESULTADO: **NEGADO**");
                            embed.setFooter("Hunterzinho", "https://i.imgur.com/hneM8Oq.png");
                            msg.channel.send({embed});
                            vote_sim = 0;
                            vote_nao = 0;
                        }
                    } else {
                        msg.channel.send("VOTAÇÃO ENCERRADA MOTIVO: **FALTA DE VOTOS**!");
                        vote_sim = 0;
                        vote_nao = 0;
                    }

                }, 1000 * 35);
            }, 1000 * 35);

        } else {
            msg.reply("JÁ TEM UMA VOTAÇÃO EM ANDAMENTO!");
        }
    }
}

    var votekick = false;
    var vote_sim1 = 0;
    var vote_nao2 = 0;

    client.on('messageReactionAdd', (reaction, user) => {
        if(reaction.emoji.name === "👍") {
            vote_sim1++;
        }
        if(reaction.emoji.name === "👎") {
            vote_nao2++;
        }
    });

    if (cmd == "!votekick") {
        let modRole = msg.guild.roles.find("name", "Comandante");
        if(msg.member.roles.has(modRole.id)) {
        if (!voteban) {
            votekick = true;
            vote_sim1 = 0;
            vote_nao2 = 0;

            var usuario = msg.guild.member(msg.mentions.users.first());

            var embed = new Discord.RichEmbed();
            embed.setColor(0x1aa8fd);
            embed.setAuthor(msg.author.username, msg.author.avatarURL);
            embed.setTimestamp();
            embed.setDescription("**UMA VOTAÇÃO FOI INCIADA CONTRA O USUARIO:** " + usuario);
            embed.setFooter("Hunterzinho", "https://i.imgur.com/hneM8Oq.png");
            msg.channel.send({embed})
                    .then(function (message) {
                        message.react("👍");
                        message.react("👎");
                        
                    });

            setTimeout(function () {
                msg.channel.send("FALTAM 35 SEGUNDOS PARA ENCERRAR A VOTAÇÃO.");
                setTimeout(function () {

                    if ((vote_nao + vote_sim) > 2) {

                        var porcent_kick = (vote_sim * 100) / (vote_nao2 + vote_sim1);
                        if (porcent_kick > 50) {
                            var embed = new Discord.RichEmbed();
                            embed.setColor(0x00ff00);
                            embed.setAuthor(msg.author.username, msg.author.avatarURL);
                            embed.setTimestamp();
                            embed.setDescription("A VOTAÇÃO FOI FINALIZADA\nRESULTADO: **CINZADO**");
                            embed.setImage("https://media1.tenor.com/images/66b9e27c779a1a314f0a8b31bb5609f7/tenor.gif");
                            embed.setFooter("Hunterzinho", "https://i.imgur.com/hneM8Oq.png");
                            console.log("O usuario: "+message.users+" foi kickado com "+vote_sim1+" votos positivos e "+vote_nao2+ "votos negativos!");
                            msg.channel.send({embed});
                            msg.guild.member(usuario).kick();
                            vote_sim = 0;
                            vote_nao = 0;
                        } else {
                            var embed = new Discord.RichEmbed();
                           embed.setColor(0xff0000);
                            embed.setAuthor(msg.author.username, msg.author.avatarURL);
                            embed.setTimestamp();
                            embed.setDescription("A VOTAÇÃO FOI FINALIZADA\nRESULTADO: **NEGADO**");
                            embed.setFooter("Hunterzinho", "https://i.imgur.com/hneM8Oq.png");
                            msg.channel.send({embed});
                            vote_sim = 0;
                            vote_nao = 0;
                        }
                    } else {
                        msg.channel.send("VOTAÇÃO ENCERRADA MOTIVO: **FALTA DE VOTOS**!");
                        vote_sim = 1;
                        vote_nao = 2;
                    }

                }, 1000 * 35);
            }, 1000 * 35);

        } else {
            msg.reply("Já tem uma votação em andamento!");
        }
    }
}
       // Voteban e Votekick - >

	   
	if (message.content.split(" ")[0] == "!treta") {
     message.channel.send("", {       
	file:"https://cdn.discordapp.com/attachments/397125687841914880/397410246047432715/IMG-20171231-WA0022.jpg"
            });
}

    //Ban/Kick
    if(cmd == "!ban") {
        let modRole = msg.guild.roles.find("name", "Comandante");
        if(msg.member.roles.has(modRole.id)) { 
          let banMember = msg.guild.member(msg.mentions.users.first());
          msg.guild.member(banMember).ban();
          msg.channel.sendMessage("Membro banido com sucesso!");
        } else {
          return msg.reply("Você não tem permisão para banir membros.");
        }
      }

      if(cmd == "!kick") {
        let modRole = msg.guild.roles.find("name", "Comandante");
        if(msg.member.roles.has(modRole.id)) { 
          let banMember = msg.guild.member(msg.mentions.users.first());
          msg.guild.member(banMember).kick();
          msg.channel.sendMessage("Membro kickado com sucesso!");
        } else {
          return msg.reply("Você não tem permisão para kickar membros.");
        }
      }
      //Ban/Kick


      // Comandos do chat
      if(cmd == "!comandos"){
        const embed = new Discord.RichEmbed()
        embed.setAuthor(message.author.username, message.author.avatarURL)
        .setColor(0x00ff00)
        .setTitle("A lista de comandos")
        .addField("!chk", "Irá testar sua cc.")
        .addField("!cpf", "Irá consultar o cpf desejado.")
        .addField("!on", "Irá verifica se o bot está online")
        .addField("!gate", "Irá listar as informações do gate.")
		.addField("!treta", "Comando utilizado para treta")
		.addField("!ccdo", "Para utilizar o comando !ccdo + marcação")
        .addField("!comandos", "Irá listar os comandos atuais.")
        embed.setFooter("Hunterzinho", "https://i.imgur.com/hneM8Oq.png");    
         message.channel.send({embed});
}

if(cmd == "!status_chk"){
    let modRole = msg.guild.roles.find("name", "Comandante");
    if(msg.member.roles.has(modRole.id)) {
    if(status_chk == true){
    status_chk = false;
    msg.reply("Comando !chk desativado");
    } else {
    status_chk = true
    msg.reply("Comando !chk ativado");
    }
}}

// >

     //Checker de cc
      if(message.content.split(" ")[0] == "!chk"){
        if(!status_chk) {
            return message.reply("**O COMANDO FOI DESATIVADO PELO ADM/DONO SEU PRETO**");
            }
        if(message.content.split(" ")[1]){
            var chk = message.content.split(" ")[1];
            var url = "https://apidohunterbot1857.000webhostapp.com/api10.php?lista="+chk;
            var msg = message.content;
            var cc = msg.replace("!chk ", "").split("\n");
    
            var lives = "";
            var dies = "";
            var i = 0;
            var t = 0;
    
            if(cc.length > 5){
                return message.reply("SÓ TESTO 5 CC SEU PRETO DO CARALHO!");
            }
            cc.forEach(function (value) {
                t++;
                setTimeout(function () {
                    request("https://apidohunterbot1857.000webhostapp.com/api10.php?lista="+value, function (error, response, body) {
                        if (body.indexOf("APROVADA") > -1) {
                            lives += body + "\n\n" ;
                        } else {
                            dies += body + "\n\n" ;
                        }
                        i++;
                        console.log(i + "/" + cc.length + " = " + body);
                        if (i >= cc.length) {
                            if(lives) {
                                var embed = new Discord.RichEmbed();
                                embed.setColor(0x00ff00);
                                embed.setAuthor(message.author.username, message.author.avatarURL)
                                embed.setTimestamp();
                                embed.setFooter("Hunterzinho Checker", "https://i.imgur.com/hneM8Oq.png");          
                                if (dies.length > 1900) {
                                embed.setDescription("FORMATO: 5206021569823456|12|2023|654")
                                } else {
                                    embed.setDescription(lives);
                                }
                                message.channel.send({embed});
                            } 
                            if (dies) {
                                var embed = new Discord.RichEmbed();
                                embed.setColor(0xff0000);
                                embed.setAuthor(message.author.username, message.author.avatarURL)
                                embed.setFooter("Hunterzinho Checker", "https://i.imgur.com/hneM8Oq.png");
                                embed.setTimestamp();             
                                if (dies.length > 1900) {
      
                                } else {
                                    embed.setDescription(dies);
                                }
                                message.channel.send({embed});
                            } 
                        }
                    });
                }, t * 200);
            });
    
        }
    }
      

});

    //Checker de cc

client.login('Mzk1MDM0NTc4NDMzMzQzNDg4.DSNARw.k5xW5sAXEX5_yLFGYzWdQhnxsP4'); //Token do seu bot
