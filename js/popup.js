'use strict'

function sortHeaders(_a, _b) {
	var a = _a.name.toLowerCase();
	var b = _b.name.toLowerCase();
	if(a < b)return -1;
	if(a > b)return 1;
	return 0;
}


chrome.tabs.query({active: true, lastFocusedWindow : true}, (tabs) => {
	var headersDetails =  chrome.extension.getBackgroundPage().background.getHeadersDetails();
	if(tabs === void 0 || tabs.length === 0 || tabs[0] === void 0){
		document.getElementById('popup_main').innerHTML = "failed tabs";
		return;	
	}
	let template = new SkyTemplate();
	let tab = tabs[0];
	
	var details = headersDetails[tab.id];
	if(details === void 0){
		document.getElementById('popup_main').innerHTML = "";
		return;
	}
	var requestLength = details.request.length;
	var responseLength = details.response.length;
	var html = '';
	for(var i=0; i<responseLength; i++){
		template.createTemplate();
		var request = details.request[i];
		var response = details.response[i];
		request.requestHeaders.sort(sortHeaders);
		response.responseHeaders.sort(sortHeaders);

		template.setTemplateParam("method", request.method);
		template.setTemplateParam("url", request.url);
		
		for(var key in request.requestHeaders){
			var obj = request.requestHeaders[key];
			template.addTrPartial("requestTrArray", obj.name, obj.value);
		}

		template.setTemplateParam("statusLine", response.statusLine);
		for(var key in response.responseHeaders){
			var obj = response.responseHeaders[key];
			template.addTrPartial("responseTrArray", obj.name, obj.value);
		}
		template.setTemplateParam("requestTrParicals", template.getTrPartial("requestTrArray"));
		template.setTemplateParam("responseTrParicals", template.getTrPartial("responseTrArray"));
		var copyArea = createCopyAreaText(request, response);
		template.setTemplateParam("copyArea", copyArea);
	
		html += template.getTemplate();
	}
	document.getElementById('popup_main').innerHTML = html;

	//Create http headers in copy area.
	var $copyArea = document.getElementById("copyArea");
	$copyArea.style.cssText = "position:absolute;left:-100%";
	var copy = document.getElementById('copyBtn');
	copy.addEventListener('click', function() {
		copyClipboard($copyArea);
	});
});

function copyClipboard($copyArea) {
	document.body.appendChild(copyArea);
	copyArea.select();
	document.execCommand("copy");
	document.body.removeChild(copyArea);
}
function createCopyAreaText(request, response){
	var html = '';
	request.requestHeaders.sort(sortHeaders);
	response.responseHeaders.sort(sortHeaders);
	html += request.method + "\t" + request.url + "\n";
	html += response.statusLine + "\n";
	
	html += "Request Headers\n";
	for(var key in request.requestHeaders){
		var obj = request.requestHeaders[key];
		html += obj.name + "\t" + obj.value + "\n";
	}
	html += "Response Headers\n";
	
	for(var key in response.responseHeaders){
		var value = '';
		var obj = response.responseHeaders[key];
		html += obj.name + "\t" + obj.value + "\n";
	}
	return html;
}

