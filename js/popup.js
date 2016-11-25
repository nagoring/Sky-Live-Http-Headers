var TEMPLATE = '\
<table class="table table-striped table-inverse sky-margin-zero">\
	<thead class="thead-inverse">\
	<tr>\
		<th class="sky-th-main"><input type="text" value="#{method} #{url}"><br>#{statusLine}</th>\
		<th class="sky-th-main"><button class="btn btn-primary" name="Copy" id="copyBtn">Copy</button></th>\
	</tr>\
	</thead>\
</table>\
<table class="table table-striped table-inverse sky-margin-zero">\
	<tr>\
		<th class="sky-th-rr" colspan=2>Request Headers</th>\
	</tr>\
	<tbody>\
	#{requestTrParicals}\
	</tbody>\
</table>\
<table class="table table-striped table-inverse sky-margin-zero">\
	<tr>\
		<th class="sky-th-rr" colspan=2>Response Headers</th>\
	</tr>\
	<tbody>\
	#{responseTrParicals}\
	</tbody>\
</table>\
<textarea id="copy_area">#{copyArea}</textarea>\
';
var thisTemplate = '';
var TR_PARTIAL_TEMPLATE = '\
	<tr>\
		<th nowrap="nowrap">#{key}</th>\
		<td><input type="text" value="#{value}"></td>\
	</tr>\
';
var thisPartials  = {
	requestTrArray : [],
	responseTrArray : [],
};
function sortHeaders(_a, _b) {
    var a = _a.name.toLowerCase();
	var b = _b.name.toLowerCase();
	if(a < b)return -1;
	if(a > b)return 1;
	return 0;
}

chrome.tabs.getSelected(null, function (tab) {

	var headersDetails =  chrome.extension.getBackgroundPage().headersDetails;
	var details = headersDetails[tab.id];
	if(details === void 0){
		document.getElementById('popup_main').innerHTML = "";
		return;
	}
	var requestLength = details.request.length;
	var responseLength = details.response.length;
	var html = '';
	var key = '';
	for(var i=0; i<responseLength; i++){
		createTemplate();
		var request = details.request[i];
		var response = details.response[i];
		request.requestHeaders.sort(sortHeaders);
		setTemplateParam("method", request.method);
		setTemplateParam("url", request.url);
		
		for(var key in request.requestHeaders){
			var value = '';
			var obj = request.requestHeaders[key];
			addTrPartial("requestTrArray", obj.name, obj.value);
		}
		for(var key in response.responseHeaders){
			var value = '';
			var obj = response.responseHeaders[key];
			addTrPartial("responseTrArray", obj.name, obj.value);
		}
		setTemplateParam("requestTrParicals", getTrPartial("requestTrArray"));
		setTemplateParam("responseTrParicals", getTrPartial("responseTrArray"));
		html += getTemplate();
	}
	document.getElementById('popup_main').innerHTML = html;

	
	
});

function setTemplateParam(source, dest){
	thisTemplate = thisTemplate.replace("#{" + source + "}", dest);
};
function addTrPartial(label, key, value){
	;
	var partial = TR_PARTIAL_TEMPLATE.replace("#{key}", key);
	partial = partial.replace("#{value}", value);
	thisPartials[label].push(partial);
};
function getTrPartial(label){
	var trTags = "";
	var length = thisPartials[label].length;
	for(var i=0;i<length;i++){
		trTags += thisPartials[label][i];
	}
	return trTags;
};
function createTemplate(){
	thisTemplate = TEMPLATE;
}
function getTemplate(){
	return thisTemplate;
}
function saveToClipboard(str) {
	var textArea = document.createElement("textarea");
	textArea.style.cssText = "position:absolute;left:-100%";

	document.body.appendChild(textArea);

	textArea.value = str;
	textArea.select();
	document.execCommand("copy");

	document.body.removeChild(textArea);
}
// function copyOnclick(){
// 	alert("aaaaaaaaaaaa");
// }
// window.onload = function(){
	// var $copyBtn = document.getElementById("copyBtn");
	// $copyBtn.addEventListener("click", function(){
	// });
// }
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('test');
	link.innerText = "FFFFFFFF";
    // onClick's logic below:
    link.addEventListener('click', function() {
    	var element = document.getElementById('test');
		element.innerText = "ZZZZZZZZZZ";
    });
});