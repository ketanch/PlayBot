var tabs = [];

chrome.runtime.onMessage.addListener((msg, sender, response) => {
	switch (msg.command) {
		case 'get':
			response({data: tabs});
			break;
		case 'post':
			let val_p = parseInt(msg.tab);
			if(tabs.includes(val_p)){
				response({stat: "ALREADY PRESENT"});
				break;
			}
			tabs.push(val_p);
			response({stat: "SUCCESS"});
			break;
		case 'delete':
			let val_d = parseInt(msg.tab);
			ind = tabs.indexOf(val_d);
			if(ind > -1){
				tabs.splice(ind, 1);
				response({stat: "SUCCESS"});
				break;
			}
			response({stat: "ERROR"});
			break;
		default:
			response({stat: "ERROR"});
			break;
	}
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
	if(tabs.includes(tabId)){
		tabs.splice(tabs.indexOf(tabId), 1);
	}
});