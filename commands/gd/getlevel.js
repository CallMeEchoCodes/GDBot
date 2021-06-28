const axios = require('axios');

module.exports = {
	name: 'getlevel',
	description: 'Get GD Level Info By Level ID',
	cooldown: 5,
	args: true,
	usage: '<LevelID>',
	execute(message, args) {
		const id = args[0].toLowerCase();

		function isNumber(n) {
			return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
		}
		if (!isNumber(id)) {
			message.reply('Bad Level ID');
			return;
		}
		axios.get(`https://gdbrowser.com/api/level/${id}`)
			.then(function(response) {
				if (response.data == '-1') {
					message.reply('Not A Level');
				}
				else {
					let stars = null;
					if (response.data.stars === 0) {
						stars = 'None';
					}
					else {
						stars = response.data.stars;
					}
					const embed = {
						'title': response.data.name,
						'url': `https://gdbrowser.com/${response.data.id}`,
						'thumbnail': {
							'url': `https://gdbrowser.com/assets/difficulties/${response.data.difficultyFace}.png`,
						},
						'fields': [{
							'name': 'Description',
							'value': response.data.description,
						},
						{
							'name': 'Stars  <:star:859185431392026694>',
							'value': stars,
							'inline': true,
						},
						{
							'name': 'Orbs  <:orbs:859186715368226846>',
							'value': response.data.orbs,
							'inline': true,
						},

						{
							'name': 'Diamonds  <:diamond:859187888322510850>',
							'value': response.data.diamonds,
							'inline': true,
						},
						{
							'name': 'Likes  <:like:858918184220622849>',
							'value': response.data.likes,
							'inline': true,
						},
						{
							'name': 'Downloads  <:download:858920122986135592>',
							'value': response.data.downloads,
							'inline': true,
						},
						{
							'name': 'Song  <:song:858920926687133747>',
							'value': (response.data.customSong >= 1 ? `[${response.data.songName}](https://newgrounds.com/audio/listen/${response.data.songID}) by [${response.data.songAuthor}](https://${response.data.songAuthor}.newgrounds.com)` : `${response.data.songName} by [${response.data.songAuthor}](https://${response.data.songAuthor}.newgrounds.com)`),
							'inline': true,
						},
						],
					};
					message.channel.send({
						embed,
					});
				}
			})
			.catch(function(error) {
				console.log(error);
				message.channel.send('an error occurred. likely a bad id');
			})
			.then(function() {
				// always executed
			});
	},
};