describe("BackgroundWebRequest", () => {
	var background;

	beforeEach(() => {
		background = new BackgroundWebRequest();
	});

	it("should be request has been added", () => {
		let tabId = 100;
		chrome.webRequest.details = {
			tabId : tabId,
			requestId: 1
		};
		background.setOnSendHeaders();
		let headersDetails = background.getHeadersDetails();
		expect(headersDetails[ tabId ].request.length).toEqual(1);
		expect(headersDetails[ tabId ].response.length).toEqual(0);
	});

	it("should be response has been added", () => {
		let tabId = 100;
		chrome.webRequest.details = {
			tabId : tabId,
			requestId: 1
		};
		background.setOnSendHeaders();
		background.setOnHeadersReceived();
		let headersDetails = background.getHeadersDetails();
		expect(headersDetails[ tabId ].request.length).toEqual(1);
		expect(headersDetails[ tabId ].response.length).toEqual(1);
	});
	it("should be response has been not added", () => {
		let tabId = 100;
		chrome.webRequest.details = {
			tabId : tabId,
			requestId: 1
		};
		background.setOnHeadersReceived();
		let headersDetails = background.getHeadersDetails();
		expect(headersDetails[ tabId ]).toBeUndefined();
	});

	it("should be request and response has been not added. Case where tabId is -1", () => {
		let tabId = -1;
		chrome.webRequest.details = {
			tabId : tabId,
			requestId: 1
		};
		background.setOnSendHeaders();
		let headersDetails = background.getHeadersDetails();
		expect(headersDetails).toEqual({});

		background.setOnHeadersReceived();
		headersDetails = background.getHeadersDetails();
		expect(headersDetails).toEqual({});
	});

	it("should be two request and response has been added", () => {
		let tabId = 100;
		chrome.webRequest.details = {
			tabId : tabId,
			requestId: 1
		};
		background.setOnSendHeaders();
		background.setOnHeadersReceived();

		chrome.webRequest.details = {
			tabId : tabId,
			requestId: 1
		};
		background.setOnSendHeaders();
		background.setOnHeadersReceived();

		let headersDetails = background.getHeadersDetails();
		expect(headersDetails[ tabId ].request.length).toEqual(2);
		expect(headersDetails[ tabId ].response.length).toEqual(2);
	});
	
	it("should be two request and response has been not added. Because different requestId.", () => {
		let tabId = 100;
		chrome.webRequest.details = {
			tabId : tabId,
			requestId: 1
		};
		background.setOnSendHeaders();
		background.setOnHeadersReceived();

		chrome.webRequest.details = {
			tabId : tabId,
			requestId: 2
		};
		background.setOnSendHeaders();
		background.setOnHeadersReceived();

		let headersDetails = background.getHeadersDetails();
		expect(headersDetails[ tabId ].request[0]).toEqual({tabId: 100, requestId: 2});
		expect(headersDetails[ tabId ].response[0]).toEqual({tabId: 100, requestId: 2});
	});
});
