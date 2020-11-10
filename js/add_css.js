function track_control_btn(site, tab_id, type, div_ct) {
	let player;
	if(site.search('gaana') >= 0){
		player = 'gaana';
	}
	else if(site.search('wynk') >= 0){
		player = 'wynk';
	}
	else if(site.search('soundcloud') >= 0){
		player = 'sound_cloud';
	}
	else if(site.search('spotify') >= 0){
		player = 'spotify';
	}
	else if(site.search('music.youtube') >= 0){
		player = 'music_youtube';
	}
	else if(site.search('youtube') >= 0 && !(site.search('music') >= 0)){
		player = 'youtube';
	}
	else{
		return;
	}
	let track_btn = document.createElement('button');
	let track_next = document.createElement('button');
	let track_prev = document.createElement('button');
	track_btn.id = 'track_btn_' + tab_id;
	track_next.id = 'track_btn_n_' + tab_id;
	track_prev.id = 'track_btn_p_' + tab_id;
	track_btn.className = "btn-trans col-sm-1";
	track_next.className = "btn-trans col-sm-1";
	track_prev.className = "btn-trans col-sm-1";
	track_btn.innerHTML = "<i class='material-icons'>"+ type +"</i>";
	track_next.innerHTML = "<i class='material-icons'>skip_next</i>";
	track_prev.innerHTML = "<i class='material-icons'>skip_previous</i>";
	track_btn.setAttribute("data-player", player);
	track_btn.setAttribute("data-tabid", tab_id);
	track_next.setAttribute("data-player", player);
	track_next.setAttribute("data-tabid", tab_id);
	track_next.setAttribute("data-cmd", "next");
	track_prev.setAttribute("data-player", player);
	track_prev.setAttribute("data-tabid", tab_id);
	track_prev.setAttribute("data-cmd", "previous");
	if(type === 'play_arrow'){
		track_btn.setAttribute("data-cmd", "play");
	}
	else if(type === 'pause'){
		track_btn.setAttribute("data-cmd", "pause");
	}
	track_btn.addEventListener('click', () => { pause_play(track_btn); });
	track_next.addEventListener('click', () => { pause_play(track_next); });
	track_prev.addEventListener('click', () => { pause_play(track_prev); });
	div_ct.appendChild(track_prev);
	div_ct.appendChild(track_btn);
	div_ct.appendChild(track_next);
}

function add_delete_btn(div_ct, tab) {
	let del_btn = document.createElement('button');
	del_btn.id = 'del_btn_' + tab.id;
	del_btn.className = "col-sm-1 btn-trans";
	del_btn.innerHTML = "<i class='material-icons'>delete</i>";
	del_btn.addEventListener('click', () => { delete_tab(tab.id); });
	div_ct.appendChild(del_btn);
}

function add_mute_btn(div_ct, tab) {
	let mute_btn = document.createElement('button');
	mute_btn.id = 'mute_btn_' + tab.id;
	mute_btn.className = "col-sm-1 btn-trans";
	mute_btn.innerHTML = "<i class='material-icons'>volume_off</i>";
	mute_btn.addEventListener('click', () => { mute_unmute(tab.id); });
	if(tab.mutedInfo.muted) {
		track_control_btn(tab.url, tab.id, 'pause', div_ct);
		mute_btn.style.color = 'red';
		div_ct.appendChild(mute_btn);
	}
	else if(tab.audible) {
		track_control_btn(tab.url, tab.id, 'pause', div_ct);
		mute_btn.style.color = 'black';
		div_ct.appendChild(mute_btn);
	}
	else {
		track_control_btn(tab.url, tab.id, 'play_arrow', div_ct);
	}
}

function add_tab_info(div_ct, tab) {
	let p_ct = document.createElement('p');
	p_ct.classList.add("col-sm-7");
	let alt_url = chrome.runtime.getURL('icons/default.png');
	p_ct.innerHTML = "<img src='" + tab.favIconUrl + "' id='img_" + tab.id + "' alt='' height='20px' width='20px'/>&nbsp;&nbsp;" + tab.title;
	div_ct.appendChild(p_ct);
	let img_ele = document.getElementById('img_'+tab.id);
	img_ele.addEventListener('error', () => { img_ele.src = alt_url; });
}