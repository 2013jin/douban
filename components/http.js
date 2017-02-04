(function(angular) {
	'use strict';
	var http = angular.module('moviecat.service.http', []);
	http.service('HttpService', ['$window', '$document', function($window, $document) {
		// console.log($document);
		this.jsonp = function(url, data, callback) {
			if (typeof data == 'function') {
				callback = data;
			}
			var cbfuncName = 'my_json_cb_' + Math.random().toString().replace('.', '');

			var querystring = url.indexOf('?') == -1 ? '?' : '&';
			for (var key in data) {
				querystring += key + '=' + data[key] + '&';
			};

			querystring += 'callback=' + cbfuncName;
			var scriptElement = $document[0].createElement('script');
			scriptElement.src = url + querystring;
			$window[cbfuncName] = function(data) {
				callback(data);
				$document[0].body.removeChild(scriptElement);
			};
			$document[0].body.appendChild(scriptElement);
		};
		// window.$jsonp = jsonp;
	}])
})(angular);