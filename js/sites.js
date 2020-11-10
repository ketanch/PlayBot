function runcode(code){
	var script = document.createElement('script');
	script.textContent = code;
	(document.head||document.documentElement).appendChild(script);
	script.remove();
}

function gaana(cmd){
	var code;
	if(cmd === 'play' || cmd === 'pause') {
		code = `document.getElementsByClassName("playPause")[0].dispatchEvent(new Event('click'))`;
	}
	else if(cmd === 'next') {
		code = `document.getElementsByClassName("next-song next")[0].dispatchEvent(new Event('click'))`;
	}
	else if(cmd === 'previous') {
		code = `document.getElementsByClassName("prev-song previous")[0].dispatchEvent(new Event('click'))`;
	}
	runcode(code);
}

function wynk(cmd) {
	var ele;
	if(cmd === 'play'){
		ele = "Play";
	}
	else if(cmd === 'pause'){
		ele = "Pause";
	}
	else if(cmd === 'next'){
		ele = "Next";
	}
	else if(cmd === 'previous'){
		ele = "Previous";
	}
	else {
		return;
	}
	var code = `document.querySelector('[title="`+ ele +`"]').childNodes[0].dispatchEvent(new Event("click"));`;
	runcode(code);
}

function music_youtube(cmd){
	var code;
	if(cmd === 'play' || cmd === 'pause') {
		code = `document.getElementById("play-pause-button").dispatchEvent(new Event('click'))`;
	}
	else if(cmd === 'next') {
		code = `document.getElementsByClassName("next-button")[0].dispatchEvent(new Event('click'))`;
	}
	else if(cmd === 'previous') {
		code = `document.getElementsByClassName("previous-button")[0].dispatchEvent(new Event('click'))`;
	}
	runcode(code);
}

function youtube(cmd){
	var code;
	if(cmd === 'play' || cmd === 'pause') {
		code = `document.getElementsByClassName("ytp-play-button ytp-button")[0].dispatchEvent(new Event('click'))`;
	}
	else if(cmd === 'next') {
		code = `document.getElementsByClassName("ytp-next-button ytp-button")[0].dispatchEvent(new Event('click'))`;
	}
	else if(cmd === 'previous') {
		code = `document.getElementsByClassName("ytp-prev-button ytp-button")[0].dispatchEvent(new Event('click'))`;
	}
	runcode(code);
}

function spotify(cmd){
	alert('yep');
	var ele;
	switch (cmd) {
		case 'play':
			ele = `document.querySelector('[title="Play"], [data-testid="control-button-play"]')`;
		case 'pause':
			ele = `document.querySelector('[title="Pause"], [data-testid="control-button-pause"]')`;
	}
	var code = ele + `.dispatchEvent(new Event('click'));`;
	alert(code);
	runcode(code);
}

function sound_cloud(cmd){
	var ele;
	switch (cmd){
		case 'play':
			ele = `document.querySelector('[title="Play current"],.playCurrent')`;
			break;
		case 'pause':
			ele = `document.querySelector('[title="Pause current"],.playCurrent')`;
			break;
		case 'next':
			ele = `document.getElementsByClassName("playControls__next skipControl__next")[0]`;
			break;
		case 'previous':
			ele = `document.getElementsByClassName("playControls__prev skipControl__previous")[0]`;
			break;
	}
	var code = ele + `.dispatchEvent(new Event('click'))`;
	runcode(code);
}