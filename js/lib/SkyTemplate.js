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
	static TR_PARTIAL_TEMPLATE(){ 
		return '\
		<tr>\
			<th nowrap="nowrap">#{key}</th>\
			<td><input type="text" value="#{value}"></td>\
		</tr>\
		';
	}
	constructor() {
		this.tempalte = "";
		this.partials = {
			requestTrArray : [],
			responseTrArray : [],
		};
	}
	createTemplate(){
		this.tempalte = SkyTemplate.TEMPLATE();
	}
	setTemplateParam(key, value){
		this.tempalte = this.tempalte.replace("#{" + key + "}", value);
	}
	addTrPartial(label, key, value){
		var partial = SkyTemplate.TR_PARTIAL_TEMPLATE().replace("#{key}", key);
		partial = partial.replace("#{value}", value);
		this.partials[label].push(partial);
	}
	getTrPartial(label){
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
