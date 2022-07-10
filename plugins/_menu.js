const bot = require('../lib/events')
const {
	ctt,
	addSpace,
	textToStylist,
	PREFIX,
	getUptime,
	PLUGINS,
	getRam,
} = require('../lib/')
const { VERSION } = require('../config')
bot.addCommand(
	{
		pattern: 'help ?(.*)',
		fromMe: true,
		dontAddCommandList: true,
	},
	async (message, match) => {
		const date = new Date()
		let CMD_HELP = `╭────────────────╮
						𝗠𝗘𝗔𝗢𝗪 𝗕𝗢𝗧🐱
╰────────────────╯

╭────────────────
│ 🔖Prefix : ${PREFIX}
│ 🔖User : ${message.pushName}
│ 🔖Time : ${date.toLocaleTimeString()}
│ 🔖Day : ${date.toLocaleString('en', { weekday: 'long' })}
│ 🔖Date : ${date.toLocaleDateString('hi')}
│ 🔖Version : ${VERSION}
│ 🔖Plugins : ${PLUGINS.count}
│ 🔖Ram : ${getRam()}
│ 🔖Uptime : ${getUptime('t')}
│ 🎗️Developer : Ronen🐥
│ 🎗️ Developer Number : http://wa.me/+5069751205
╰────────────────
╭────────────────
`
		const commands = []
		bot.commands.map(async (command, index) => {
			if (
				command.dontAddCommandList === false &&
				command.pattern !== undefined
			) {
				commands.push(ctt(command.pattern))
			}
		})
		commands.forEach((command, i) => {
			CMD_HELP += `│ ${i + 1} ${addSpace(
				i + 1,
				commands.length
			)}${textToStylist(command.toUpperCase(), 'mono')}\n`
		})
		CMD_HELP += `╰────────────────`
		return await message.sendMessage('```' + CMD_HELP + '```')
	}
)

bot.addCommand(
	{
		pattern: 'list ?(.*)',
		fromMe: true,
		dontAddCommandList: true,
	},
	async (message, match) => {
		let msg = ''
		bot.commands.map(async (command, index) => {
			if (
				command.dontAddCommandList === false &&
				command.pattern !== undefined
			) {
				msg += `${index} ${ctt(command.pattern)}\n${command.desc}\n\n`
			}
		})
		await message.sendMessage('```' + msg.trim() + '```')
	}
)
bot.addCommand(
	{
		pattern: 'menu ?(.*)',
		fromMe: true,
		dontAddCommandList: true,
	},
	async (message, match) => {
		const commands = {}
		bot.commands.map(async (command, index) => {
			if (
				command.dontAddCommandList === false &&
				command.pattern !== undefined
			) {
				if (!commands[command.type]) commands[command.type] = []
				commands[command.type].push(ctt(command.pattern).trim())
			}
		})
		const date = new Date()

		let msg =
			'```' +
			`╭═══ 𝗠𝗘𝗔𝗢𝗪 𝗕𝗢𝗧🐱 ═══⊷
┃🔖╭──────────────
┃🔖│ Prefix : ${PREFIX}
┃🔖│ User : ${message.pushName}
┃🔖│ Time : ${date.toLocaleTimeString()}
┃🔖│ Day : ${date.toLocaleString('en', { weekday: 'long' })}
┃🔖│ Date : ${date.toLocaleDateString('hi')}
┃🔖│ Version : ${VERSION}
┃🔖│ Plugins : ${PLUGINS.count}
┃🔖│ Ram : ${getRam()}
┃🔖│ Uptime : ${getUptime('t')}
┃💕│ Developer : Ronen🐥
┃🎗️│ Developer Number : http://wa.me/+5069751205
┃❣️╰───────────────
╰═════════════════⊷
` +
			'```'
		for (const command in commands) {
			msg += ` ╭─❏ ${textToStylist(
				command.toLowerCase(),
				'smallcaps'
			)} ❏
`
			for (const plugin of commands[command])
				msg += ` │ ${textToStylist(plugin.toUpperCase(), 'mono')}\n`
			msg += ` ╰─────────────────
`
		}
		await message.sendMessage(msg.trim())
	}
)
