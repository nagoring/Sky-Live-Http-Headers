var headersDetails = {};
chrome.storage.sync.get({
	mode: 'simple'
}, function(items) {
	backgroundSkyHttpHeader(items.mode);
});

function backgroundSkyHttpHeader(mode){
	
	chrome.webRequest.onSendHeaders.addListener(function (details) {
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
		if(parseInt(details, 10) === -1)return;
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
