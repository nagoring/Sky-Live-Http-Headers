let _instance = null;
class SkyTemplate {
	static TEMPLATE(){
		return '\
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
		<textarea id="copyArea">#{copyArea}</textarea>\
		';
	}
	static KEY_VALUE_PARTIAL(){ 
		return '\
		<tr>\
			<th nowrap="nowrap">#{key}</th>\
			<td><input type="text" value="#{value}"></td>\
		</tr>\
		';
	}
	static getInstance(){
		if(_instance === null){
			_instance = new SkyTemplate();
		}
		return _instance;
	}
	constructor() {
		this.tempalte = "";
		this.partials = {};
		this.sourceTemplate = SkyTemplate.TEMPLATE();
		this.sourceKeyValuePartial = SkyTemplate.KEY_VALUE_PARTIAL();
	}
	init(){
		this.tempalte = "";
		this.partials = {};
	}
	setSourceTemplate(template){
		this.sourceTemplate = template;
	}
	setSourceKeyValuePartial(partial){
		this.sourceKeyValuePartial = partial;
	}
	addPartialLabel(label, value){
		this.partials[label] = value;
	}
	createTemplate(){
		this.tempalte = this.sourceTemplate;
	}
	setTemplateParam(key, value){
		this.tempalte = this.tempalte.replace("#{" + key + "}", value);
	}
	addKeyValuePartial(label, key, value){
		var partial = this.sourceKeyValuePartial.replace("#{key}", key);
		partial = partial.replace("#{value}", value);
		this.partials[label].push(partial);
	}
	getKeyValuePartial(label){
		var trTags = "";
		var length = this.partials[label].length;
		for(var i=0;i<length;i++){
			trTags += this.partials[label][i];
		}
		return trTags;
	}
	getTemplate(){
		return this.tempalte;
	}
}
