class String{
	constructor(){
	}
	
	getQueryString(){
		if (1 < document.location.search.length) {
			// 最初の1文字 (?記号) を除いた文字列を取得する
			var query = document.location.search.substring(1);
			// クエリの区切り記号 (&) で文字列を配列に分割する
			var parameters = query.split('&');
			var result = new Object();

			for (var i = 0; i < parameters.length; i++) {
			// パラメータ名とパラメータ値に分割する
				var element = parameters[i].split('=');

				var paramName = decodeURIComponent(element[0]);
				var paramValue = decodeURIComponent(element[1]);
				// パラメータ名をキーとして連想配列に追加する
				result[paramName] = paramValue;
			}
			return result;
		}
		return null;
	}

	getValue(param){
		var array = getQueryString();
		if(array == null || arry(param) == null){
			return null;
		}
		this.value = arry(param);
		return this.value;
	}
}
