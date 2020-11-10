chrome.runtime.onMessage.addListener((msg, sender, resp) => {
	switch (msg.type) {
		case 'music_control':
			switch (msg.player) {
				case 'gaana':
					gaana(msg.cmd);
					break;
				case 'spotify':
					spotify(msg.cmd);
					break;
				case 'sound_cloud':
					sound_cloud(msg.cmd);
					break;
				case 'wynk':
					wynk(msg.cmd);
					break;
				case 'youtube':
					youtube(msg.cmd);
					break;
				case 'music_youtube':
					music_youtube(msg.cmd);
					break;
			}
			break;
		default:
			break;
	}
});