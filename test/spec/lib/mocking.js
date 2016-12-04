chrome = {
	storage: {
		sync: {
			get: function(keys, callback) {
				callback(keys);
			}
		}
	},
	webRequest: {
		details: {tabId : -1},
		onSendHeaders: {
			addListener : (callback, filter, opt_extraInfoSpec) => {
				callback(chrome.webRequest.details);

			}
		},
		onHeadersReceived: {
			addListener : (callback, filter, opt_extraInfoSpec) => {
				callback(chrome.webRequest.details);
			}
		}
	},
	tabs: {
		tabs: [],
		query: (queryInfo, callback) => {
			callback(chrome.tabs.tabs);
		},
		onUpdated: {
			addListener : (callback, filter, opt_extraInfoSpec) => {
			}
		}
	},
	extension: {
		details: {},
		getBackgroundPage : () => {
			return {background: {
				getHeadersDetails: () => {
					return chrome.extension.details;
				}
			}};
		}
	}
};

chrome.extension.getBackgroundPage().background.getHeadersDetails
