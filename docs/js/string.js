function String(){
}

String.prototype = {
	getValue : function(param){
		var array = getQueryString();
		if(array == null || arry(param) == null){
			return null;
		}
		this.value = arry(param);
		return this.value;
	}
}

function getQueryString(){
	if (1 < document.location.search.length) {
		// �ŏ���1���� (?�L��) ����������������擾����
		var query = document.location.search.substring(1);
		// �N�G���̋�؂�L�� (&) �ŕ������z��ɕ�������
		var parameters = query.split('&');
		var result = new Object();

		for (var i = 0; i < parameters.length; i++) {
			// �p�����[�^���ƃp�����[�^�l�ɕ�������
			var element = parameters[i].split('=');

			var paramName = decodeURIComponent(element[0]);
			var paramValue = decodeURIComponent(element[1]);
			// �p�����[�^�����L�[�Ƃ��ĘA�z�z��ɒǉ�����
			result[paramName] = paramValue;
		}
		return result;
	}
	return null;
}
