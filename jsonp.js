var Jsonp = function () {}
Jsonp.prototype = {
	console: function () {
		console.log("loading...");
	},
	load: function (url, callback) {
		var script = document.createElement("script");
		script.type = 'text/javascript';
		script.src = url + callback;
		document.getElementsByTagName('head')[0].appendChild(script);
		if (typeof document.attachEvent == 'undefined') {
			document.getElementsByTagName('head')[0].removeChild(script);
		}
	}
}

var jp = new Jsonp();

document.onclick = function () {
	jp.load('http://pingfan1990.sinaapp.com/javacript/wall/jsonpdata.php?name=pingfan&callback=','jp.console')
	jp.load('http://pingfan1990.sinaapp.com/javacript/wall/jsonpdata.php?name=pingfan&callback=','doing')
}

function doing(){
	console.log("yes i do...");
}