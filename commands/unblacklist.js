const fs = require('fs')

module.exports = {
	name: 'unblacklist',
	execute(message, args, client) {
    const userArg = message.mentions.users.first()?.id || args[0]
    if (!userArg) return message.reply('Please provide a valid user')
    message.guild.members.fetch(userArg).then(user => {
      if (!message.member.roles.cache.has(process.env.MODROLE)) return;
      let rawBlacklistedUsers = fs.readFileSync('./blacklisted_users.txt')
      let blacklistedUsers = JSON.parse(rawBlacklistedUsers);

      if (!blacklistedUsers.includes(user.id)) return message.reply('That user is not blacklisted.')

      fs.writeFileSync('./blacklisted_users.txt', JSON.stringify(blacklistedUsers.filter(u => u !== user.id)));

      message.reply(`**${user.user.username}** has been removed from the blacklist.`)
    }).catch(err => {
      message.reply('That user could not be found')
    })
	},
};

