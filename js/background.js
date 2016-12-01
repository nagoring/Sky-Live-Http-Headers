var headersDetails = {};
chrome.storage.sync.get({
	mode: 'simple'
}, function(items) {
	backgroundSkyHttpHeader(items.mode);
});
function backgroundSkyHttpHeader(mode){
	chrome.webRequest.onSendHeaders.addListener(function (details) {
		if(parseInt(details.tabId, 10) === -1)return;
		var tabId = details.tabId;
		if(headersDetails[tabId] === void 0){
			headersDetails[tabId] = {};
			headersDetails[tabId].request = [];
			headersDetails[tabId].response = [];
		}else{
			if(headersDetails[tabId].request[0].requestId !== details.requestId){
				headersDetails[tabId].request = [];
				headersDetails[tabId].response = [];
			}
		}
		headersDetails[tabId].request.push(details);
	},{
		urls: ["<all_urls>"],
		types: ["main_frame"]
	},["requestHeaders"]);
	chrome.webRequest.onHeadersReceived.addListener(function(details){
		if(parseInt(details.tabId, 10) === -1)return;
		var tabId = details.tabId;
		headersDetails[tabId].response.push(details);
	}, 
	{
	urls: ["<all_urls>"],
	types: ["main_frame"]
	},
		["responseHeaders"]
	);
}


chrome.tabs.onUpdated.addListener(function(tabId, changeinfo, tab) {
	var url = tab.url;
	console.log("status:" + changeinfo.status + ", url:" + url);
	if (url !== void 0 && changeinfo.status === "complete" ) {
		xhr = new XMLHttpRequest();
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


