'use strict'
describe("Popup. Windows: Must option chrome --allow-file-access-from-files. Mac: Execute sudo chrome.", () => {
	var test;

	beforeEach(() => {
		jasmine.getFixtures().fixturesPath = 'spec/fixtures';
		loadFixtures("popup_fixture.html");
		test = new Popup();
	});

	it("should be run() Failed tabs", () => {
		test.run();
		expect(document.getElementById('popup_main').innerHTML).toEqual("Failed tabs");
	});

	it("should be run() Failed details", () => {
		chrome.tabs.tabs = [];
		chrome.tabs.tabs.push({name: "tokyo"});
		test.run();
		expect(document.getElementById('popup_main').innerHTML).toEqual("Failed details");
	});

	it("should be run() normal pattern", () => {
		let detail = {
			request : [{
				method: "GET",
				url: "http://nagoring.com",
				requestHeaders: [
					{name : "ZZZ", value : 'XXX'},
					{name : "Accept-Language", value : 'ja'},
					{name : "Accept-Encoding", value : 'gzip'},
				]
			}],
			response :[{
				statusLine: "HTTP/1.1 200 OK",
				responseHeaders: [
					{name : "Content-Type", value : 'text/html'},
					{name : "Content-Encoding", value : 'gzip'},
				]
			}]
		};
		chrome.extension.details = [];
		chrome.extension.details[1] = detail;
		chrome.tabs.tabs = [];
		chrome.tabs.tabs.push({id: 1});
		let template = SkyTemplate.getInstance();
		template.setSourceTemplate("#{method}:#{url};#{statusLine};#{requestTrParicals};#{responseTrParicals};");
		template.setSourceKeyValuePartial("#{key}+#{value},");
		test.run();

		let requestTrParicals = "Accept-Encoding+gzip,Accept-Language+ja,ZZZ+XXX,";
		let responseTrParicals = "Content-Encoding+gzip,Content-Type+text/html,";
		expect(document.getElementById('popup_main').innerHTML).toEqual("GET:http://nagoring.com;HTTP/1.1 200 OK;" + requestTrParicals + ";" + responseTrParicals + ";");
	});
});
