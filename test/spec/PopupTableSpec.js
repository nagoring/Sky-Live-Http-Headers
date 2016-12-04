describe("PopupTable", () => {
	var test;

	beforeEach(() => {
		let details = {
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
		test = new PopupTable(details);
	});

	it("should be createHtml", () => {
		test.template.setSourceTemplate("#{method}:#{url};#{statusLine};#{requestTrParicals};#{responseTrParicals};");
		test.template.setSourceKeyValuePartial("#{key}+#{value},");

		let requestTrParicals = "Accept-Encoding+gzip,Accept-Language+ja,ZZZ+XXX,";
		let responseTrParicals = "Content-Encoding+gzip,Content-Type+text/html,";
		expect(test.createHtml(0)).toEqual("GET:http://nagoring.com;HTTP/1.1 200 OK;" + requestTrParicals + ";" + responseTrParicals + ";");
	});

	it("should be createCopyAreaText", () => {
		test.template.setSourceTemplate("#{method}:#{url};#{statusLine};#{requestTrParicals};#{responseTrParicals};");
		test.template.setSourceKeyValuePartial("#{key}+#{value},");

		let requestTrParicals = "Accept-Encoding+gzip,Accept-Language+ja,ZZZ+XXX,";
		let responseTrParicals = "Content-Encoding+gzip,Content-Type+text/html,";
		let index = 0;
		let request = test.details.request[index];
		let response = test.details.response[index];
		let copyAreaText = test.createCopyAreaText(request, response);
		expect(copyAreaText).toEqual("GET\thttp://nagoring.com\nHTTP/1.1 200 OK\nRequest Headers\nAccept-Encoding\tgzip\nAccept-Language\tja\nZZZ\tXXX\nResponse Headers\nContent-Encoding\tgzip\nContent-Type\ttext/html\n");
	});

	it("should be sortHeaders", () => {
		expect(test.sortHeaders({name: "yokohamashi"}, {name: "chiyodaku"})).toEqual(1);
		expect(test.sortHeaders({name: "chiyodaku"}, {name: "yokohamashi"})).toEqual(-1);
		expect(test.sortHeaders({name: "chiyodaku"}, {name: "chiyodaku"})).toEqual(0);
	});
});
