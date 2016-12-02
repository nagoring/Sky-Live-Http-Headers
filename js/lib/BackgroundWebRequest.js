class BackgroundWebRequest {
	constructor() {
		this.headersDetails = {};
	}
	run(){
		chrome.storage.sync.get({
			mode: 'simple'
		}, (items) => {
			this.addEvent(items.mode);
		});
	}
	addEvent(mode){
		this.setOnSendHeaders();
		this.setOnHeadersReceived();
	}
	setOnSendHeaders(){
		chrome.webRequest.onSendHeaders.addListener((details) => {
			if(parseInt(details.tabId, 10) === -1)return;
			let tabId = details.tabId;
			if(this.headersDetails[tabId] === void 0){
				this.headersDetails[tabId] = {};
				this.headersDetails[tabId].request = [];
				this.headersDetails[tabId].response = [];
			}else{
				if(this.headersDetails[tabId].request[0].requestId !== details.requestId){
					this.headersDetails[tabId].request = [];
					this.headersDetails[tabId].response = [];
				}
			}
			this.headersDetails[tabId].request.push(details);
		},{
			urls: ["<all_urls>"],
			types: ["main_frame"]
		},["requestHeaders"]);
	}
	setOnHeadersReceived(){
		chrome.webRequest.onHeadersReceived.addListener((details) => {
			if(parseInt(details.tabId, 10) === -1)return;
			if(this.headersDetails === void 0 || this.headersDetails[details.tabId] === void 0)return;
			let tabId = details.tabId;
			this.headersDetails[tabId].response.push(details);
		}, 
		{
		urls: ["<all_urls>"],
		types: ["main_frame"]
		},
			["responseHeaders"]
		);
	}
	getHeadersDetails(){
		return this.headersDetails;
	}
}
