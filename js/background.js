'use strict'
var background = new BackgroundWebRequest();
background.run();


chrome.tabs.onUpdated.addListener(function(tabId, changeinfo, tab) {
	var url = tab.url;
	if (url !== void 0 && changeinfo.status === "complete" ) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);

		xhr.onload = function (e) {
			var statusCode = e.currentTarget.status;
			var iconName = getIconName(statusCode);
			chrome.browserAction.setIcon({
				path: "../img/" + iconName,
				tabId: tabId
			});
		};
		xhr.send();
	}
});
function getIconName(statusCode){
	if(statusCode >= 200 &&  statusCode <= 299){
		return 'icon_green.png';
	}
	else if(statusCode >= 300 &&  statusCode <= 399){
		return 'icon_yellow.png';
	}
	else{
		return 'icon_red.png';
	}
}


