require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ 
  intents: [
    GatewayIntentBits.GuildMembers,
  ] 
});

const { TOKEN, HAUNTED_USER } = process.env;

const MURLOC_ACTIONS = [
  `Mat Murlock s'aventure prudemment hors de sa mare, ses yeux bulbeux scrutant les alentours. Il grogne "Mrrrgllll glrrm gl!", signifiant sa curiosité pour le monde extérieur.`,
  `Avec un élan rapide, le murloc plonge dans l'eau, attrapant un poisson argenté entre ses dents. Il émerge en poussant un "Mrrglglgl!" triomphant.`,
  `Sentant les premières gouttes de pluie, le murloc commence à sauter et à danser joyeusement, chantant "Mrrgl mrrgl mrgl!"`,
  `Voyant un intrus s'approcher de sa mare, le murloc prend une posture défensive et émet un grognement menaçant : "Grrrmlglgl!"`,
  `Le murloc joue gaiement avec des algues, les enroulant autour de lui tout en gazouillant "Glrmgl mrgl!"`,
  `Tentant d'attirer une murloc femelle, le murloc chante une douce mélodie : "Mrlglglgl mrrrgl mrlg mrlg!"`,
  `Le murloc ramasse des coquillages scintillants et des pierres lisses, murmurant avec fierté "Glrgl mrgl gl!"`,
  `Rejoignant un groupe de murlocs, il échange des histoires et des nouvelles, tout en riant "Mrrgl mrrgl hahaha!"`,
  `Le murloc flotte calmement à la surface de l'eau, fermant les yeux et murmurant "Glrlgl... glrlgl..."`,
  `Avec un cri joyeux, le murloc court le long de la plage, ses pieds éclaboussant l'eau au rythme de ses invectives "Mrgl! Mrgl! Mrgl!"`,
  `Le murloc lance de l'eau sur ses amis, déclenchant une bataille d'éclaboussures tout en riant "Glrmgl mrgl!"`,
  `Assis sur un rocher, le murloc contemple le reflet de la lune sur l'eau, fredonnant doucement "Mrlgl mrlgl..."`,
  `Le murloc déterre une perle brillante, ses yeux s'écarquillant de surprise alors qu'il s'exclame "Glrglgl! Mrrglgl!"`,
  `Entendant le cri d'un jeune murloc, il se précipite pour le protéger, grognant avec fermeté "Grrrmgl! Rglglgl!"`,
  `Le murloc tente d'imiter les humains qu'il a observés, marchant sur deux pieds et déclarant d'une manière comique "Mrrglgl human!"`,
  `Se cachant parmi les algues, le murloc attend patiemment que ses amis le trouvent, retenant un "Glrlgl... mrgl!"`,
  `Après avoir vaincu un adversaire, le murloc danse et chante, proclamant "Mrgl! Glrlgl! Mrrgl!"`,
  `Échappant de justesse à un prédateur, le murloc soupire de soulagement, murmurant "Glrgl... mrgl... gl."`,
  `Le murloc montre à un groupe de jeunes comment chasser, les guidant avec des encouragements "Mrgl! Glrlgl! Mrgl!"`,
  `La nuit tombée, le murloc s'allonge sur le sable, regardant les étoiles tout en rêvant à voix haute "Glrlgl... mrlg... mrlg..."`
];

async function randomHaunting() {
  const guilds = Array.from(client.guilds.cache.values());
    
  for (let guild of guilds) {
    guild.members.fetch().then(async members => {
      let member = members.find(m => m.user.username === HAUNTED_USER);
      if (member) {
        console.log('Mat Murlock is haunting');
        try {
          let dmChannel = await member.createDM();
          let randomIndex = Math.floor(Math.random() * MURLOC_ACTIONS.length);
          let hauntingMessage = MURLOC_ACTIONS[randomIndex]
          await dmChannel.send(hauntingMessage);
          console.log('Murloc sent message:', hauntingMessage)
        } catch (err) {
          console.error('Erreur lors de l\'envoi du message', err);
        }
      }
    })
  }
}

client.once('ready', async () => {
  randomHaunting();
  setInterval(randomHaunting, 3 * 60 * 60 * 1000); // Toutes les 3 heures
});

client.login(TOKEN);
