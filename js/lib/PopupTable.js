'use strict'

class PopupTable{
	constructor(details) {
		this.template = SkyTemplate.getInstance();
		this.template.init();
		this.template.addPartialsKey('requestTrArray', []);
		this.template.addPartialsKey('responseTrArray', []);
		this.details = details;
	}
	createHtml(index){
		this.template.createTemplate();
		let request = this.details.request[index];
		let response = this.details.response[index];
		request.requestHeaders.sort(this.sortHeaders);
		response.responseHeaders.sort(this.sortHeaders);

		this.template.setTemplateParam("method", request.method);
		this.template.setTemplateParam("url", request.url);
		
		for(let key in request.requestHeaders){
			let obj = request.requestHeaders[key];
			this.template.addKeyValuePartial("requestTrArray", obj.name, obj.value);
		}

		this.template.setTemplateParam("statusLine", response.statusLine);
		for(let key in response.responseHeaders){
			let obj = response.responseHeaders[key];
			this.template.addKeyValuePartial("responseTrArray", obj.name, obj.value);
		}
		this.template.setTemplateParam("requestTrParicals", this.template.getKeyValuePartial("requestTrArray"));
		this.template.setTemplateParam("responseTrParicals", this.template.getKeyValuePartial("responseTrArray"));
		let copyArea = this.createCopyAreaText(request, response);
		this.template.setTemplateParam("copyArea", copyArea);

		return this.template.getTemplate();	
	}		
	createCopyAreaText(request, response){
		let html = '';
		request.requestHeaders.sort(this.sortHeaders);
		response.responseHeaders.sort(this.sortHeaders);
		html += request.method + "\t" + request.url + "\n";
		html += response.statusLine + "\n";
		
		html += "Request Headers\n";
		for(let key in request.requestHeaders){
			let obj = request.requestHeaders[key];
			html += obj.name + "\t" + obj.value + "\n";
		}
		html += "Response Headers\n";
		
		for(let key in response.responseHeaders){
			let value = '';
			let obj = response.responseHeaders[key];
			html += obj.name + "\t" + obj.value + "\n";
		}
		return html;
	}
	sortHeaders(_a, _b) {
		let a = _a.name.toLowerCase();
		let b = _b.name.toLowerCase();
		if(a < b)return -1;
		if(a > b)return 1;
		return 0;
	}
}
