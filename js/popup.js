function pause_play(ele) {
	let msg = {type : 'music_control', player : ele.getAttribute('data-player'), cmd : ele.getAttribute('data-cmd')};
	chrome.tabs.sendMessage(parseInt(ele.getAttribute('data-tabid')), msg);
}

function add_tab() {                                                                              //ct -> Current Tabs
	let x = document.getElementById('tab_opt').value;
	chrome.runtime.sendMessage({command: "post", tab: x}, (response) => {
		console.log(response.stat);
		if(response.stat == "SUCCESS"){
			let div_ct = document.createElement('div');
			document.getElementById('current_tabs').appendChild(div_ct);
			chrome.tabs.get(parseInt(x), (tab) => {
				div_ct.id = "div_ct_" + tab.id;
				div_ct.classList.add("row");
				add_tab_info(div_ct, tab);
				add_mute_btn(div_ct, tab);
				add_delete_btn(div_ct, tab);
			});
		}
	});
}

function mute_unmute(tab){
	chrome.tabs.get(tab, (_tab) => {
		if(_tab.mutedInfo.muted){
			document.getElementById('mute_btn_'+tab).style.color = 'black';
			chrome.tabs.update(tab, {"muted": false});
		}
		else{
			document.getElementById('mute_btn_'+tab).style.color = 'red';
			chrome.tabs.update(tab, {"muted": true});
		}
	});
}

function delete_tab(tab) {
	chrome.runtime.sendMessage({"command": "delete", "tab": tab}, (response) => {
		console.log(response.stat);
		if(response.stat == "SUCCESS"){
			document.getElementById("div_ct_"+tab).remove();
		}
		else{
			alert("Some error occured");
		}
	});
}

function add_options() {
	if(document.getElementById('tab_opt') == null){
	var d = document.getElementById('div_opt');
	var div_dd = document.createElement('div');  //dd-> dropdown
	var div_db = document.createElement('div');  //db-> drop button
	var div_m = document.createElement('div');  //m-> main
	var sel = document.createElement('select');
	var sub = document.createElement('button');
	sub.innerHTML = "<i class='material-icons md-light md-18'>add</i>";
	div_dd.className = "form-group col-sm-9";
	div_db.className = "form-group col-sm-3";
	div_m.className = "form-row";
	sel.className = "form-control";
	sub.className = "btn btn-black";
	sel.id = 'tab_opt';
	d.appendChild(div_m);
	div_m.appendChild(div_dd);
	div_m.appendChild(div_db);
	div_dd.appendChild(sel);
	div_db.appendChild(sub);
	chrome.tabs.query({}, (tabs) => {
		for(let i = 0; i < tabs.length; i++) {
			let opt = document.createElement('option');
			opt.value = tabs[i].id;
			opt.id = "opt_" + opt.value;
			opt.innerHTML = tabs[i].title;
			sel.appendChild(opt);
		}
	});
	sub.addEventListener('click', add_tab);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	var un_list = document.getElementById('current_tabs');
	chrome.runtime.sendMessage({command: "get"}, (response) => {
		let tab_id = response.data;
		if(tab_id.length == 0){
			let li = document.createElement('p');
			li.innerHTML = "<i>No tabs added</i>";
			li.style.color = "grey";
			un_list.appendChild(li);
		}
		else{
		for(let i = 0;i < tab_id.length; i++){
			let div_ct = document.createElement('div');
			document.getElementById('current_tabs').appendChild(div_ct);
			chrome.tabs.get(tab_id[i], (tab) => {
				div_ct.id = "div_ct_" + tab.id;
				div_ct.classList.add("row");
				add_tab_info(div_ct, tab);
				add_mute_btn(div_ct, tab);
				add_delete_btn(div_ct, tab);
			});
		}
		}
	});
	document.getElementById('add_tab').addEventListener('click', add_options);
}, false);
