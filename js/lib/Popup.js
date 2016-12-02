'use strict'
class Popup {
	constructor() {
	}
	run() {
		chrome.tabs.query({active: true, lastFocusedWindow : true}, (tabs) => {
			if(tabs === void 0 || tabs.length === 0 || tabs[0] === void 0){
				document.getElementById('popup_main').innerHTML = "Failed tabs";
				return;	
			}
			let tab = tabs[0];
			let headersDetails =  chrome.extension.getBackgroundPage().background.getHeadersDetails();
			let details = headersDetails[tab.id];
			if(details === void 0){
				document.getElementById('popup_main').innerHTML = "Failed details";
				return;
			}
			document.getElementById('popup_main').innerHTML = this.createHtml(details);
			
			//Create http headers in copy area.
			let $copyArea = document.getElementById("copyArea");
			$copyArea.style.cssText = "position:absolute;left:-100%";
			let copy = document.getElementById('copyBtn');
			copy.addEventListener('click', () => {
				this.copyClipboard($copyArea);
			});
		});
	}
	createHtml(details){
		let responseLength = details.response.length;
		let html = '';
		for(let i=0; i<responseLength; i++){
			let popupTable = new PopupTable(details);
			html += popupTable.createHtml(i);
		}
		return html;
	}
	copyClipboard($copyArea) {
		document.body.appendChild(copyArea);
		copyArea.select();
		document.execCommand("copy");
		document.body.removeChild(copyArea);
	}
}
