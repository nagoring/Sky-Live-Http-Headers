chrome = {
	storage: {
		sync: {
			get: function(keys, callback) {
				callback(keys);
			},
			set: function() {
			}
		}
		},
		runtime: {
		sendMessage: function(params, callback) {
			callback();
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
		onUpdated: {
			addListener : (callback, filter, opt_extraInfoSpec) => {
				console.log();
			}
		}
	}
};

