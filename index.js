require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const { MURLOC_ACTIONS } = require('./murloc');
const { TOKEN, HAUNTED_USER } = process.env;

const client = new Client({ 
  intents: [
    GatewayIntentBits.GuildMembers,
  ] 
});


async function randomHaunting() {
  const guilds = Array.from(client.guilds.cache.values());
    
  for (let guild of guilds) {
    guild.members.fetch().then(async members => {
      let member = members.find(m => m.user.username === HAUNTED_USER);
      if (member) {
        console.log('Mat Murlock is haunting');
        try {
          let hauntingMessage = getRandomHaunting();
          let dmChannel = await member.createDM();
          await dmChannel.send(hauntingMessage);
          console.log(`${getTime()} - Mat Murlock is haunting ${HAUNTED_USER}: ${hauntingMessage}`);
        } catch (err) {
          console.error(`Erreur lors de l'envoi du message`, err);
        }
      }
    })
  }
}

function getRandomHaunting() {
  let randomIndex = Math.floor(Math.random() * MURLOC_ACTIONS.length);
  return MURLOC_ACTIONS[randomIndex];
}

function getTime(timeZone = "Europe/Paris", country = "fr-FR") {
  const dateOptions = {
    timeZone: timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }

  return new Date().toLocaleTimeString(country, dateOptions);
}

client.once('ready', async () => {
  randomHaunting();
  setInterval(randomHaunting, 3 * 60 * 60 * 1000); // Toutes les 3 heures
});

client.login(TOKEN);
