(function () {
	/***
		发送事件
		observer.dispatchEvent({
			action:MARKEDS.CHANGE_B,	//带入的标示
			data:{color:ranColor,x:0}	//带入的信息
		});

		监听事件
		observer.addEvent(updata);
	**/
	var ManagerEvent = function () {
		this.handlers = {};
		this.BROADCAST = "broadcast";
	}
	ManagerEvent.prototype = {
		constructor: ManagerEvent,
		addEvent: function (handler) {
			if (typeof this.handlers[ManagerEvent.BROADCAST] == "undefined") {
				this.handlers[ManagerEvent.BROADCAST] = [];
			}
			this.handlers[ManagerEvent.BROADCAST].push(handler);
		},
		dispatchEvent: function (event) {
			if (!event.target) {
				event.target = this;
			}
			if (this.handlers[event.type] instanceof Array) {
				var handlers = this.handlers[event.type];
				for (var i = 0, len = handlers.length; i < len; i++) {
					handlers[i](event);
				}
			}
		},
		removeEvent: function (type, handler) {
			if (this.handlers[type] instanceof Array) {
				var handlers = this.handlers[type];
				for (var i = 0, len = handlers.length; i < len; i++) {
					if (handlers[i] === handler) {
						break;
					}
				}
				handlers.splice(i, 1);
			}
		}
	}
	return window['observer'] = new ManagerEvent();
})();








