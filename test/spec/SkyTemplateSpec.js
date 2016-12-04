describe("SkyTemplate", () => {
	var template;

	beforeEach(() => {
		template = SkyTemplate.getInstance();
		template.init();
	});

	it("should get template", () => {
		template.setSourceTemplate("<table></table>");
		template.createTemplate();
		expect(template.getTemplate()).toEqual("<table></table>");
	});
	
	it("should has been changed value by setTemplateParam", () => {
		template.setSourceTemplate("<table>#{method}:#{action}</table>");
		template.createTemplate();
		template.setTemplateParam('method', 'GET');
		template.setTemplateParam('action', 'http://123456789');
		expect(template.getTemplate()).toEqual("<table>GET:http://123456789</table>");
	});

	it("should get KeyValue partial", () => {
		template.addPartialLabel('requestTrArray', []);
		template.setSourceKeyValuePartial("<tr><th>#{key}</th><td>#{value}</td></tr>");
		template.createTemplate();
		template.addKeyValuePartial('requestTrArray', 'Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
		expect(template.getKeyValuePartial('requestTrArray')).toEqual("<tr><th>Accept</th><td>text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8</td></tr>");
	});

	it("should get template and KeyValue partial", () => {
		template.addPartialLabel('requestTrArray', []);
		template.setSourceTemplate("<table>#{partial}</table>");
		template.setSourceKeyValuePartial("<tr><th>#{key}</th><td>#{value}</td></tr>");
		template.createTemplate();
		template.addKeyValuePartial('requestTrArray', 'Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
		template.setTemplateParam('partial', template.getKeyValuePartial('requestTrArray'));
		expect(template.getTemplate()).toEqual("<table><tr><th>Accept</th><td>text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8</td></tr></table>");
	});
});
