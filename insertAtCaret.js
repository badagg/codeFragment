/*
* 插入表情 定义光标位置
* 用法：
* $("#xxx").insertAtCaret("str");
* 
*/
(function ($) {
	$.fn.extend({
		insertAtCaret: function (html) {
			var self = this;
			var ta = $(this)[0];

			if (ta.onbeforedeactivate) {
				var ieRangeBookMark;
				ta.attachEvent('onbeforedeactivate', function () {
					ieRangeBookMark = self.getRange().selection.getBookmark();
				});
				ta.attachEvent('onactivate', function () {
					self.getRange().selection.moveToBookmark(ieRangeBookMark);
				});
			} else {
				$(ta).bind('keyup mouseup', function () {
					self.saveLastRange();
				});
			}

			ta.focus();
			self.setLastRange();
			if (document.selection) {
				var c = document.selection.createRange();
				if (c) {
					if (document.selection.type.toLowerCase() != "none") {
						document.selection.clear(); //清除选中
					}
					c.pasteHTML(html);
					c.collapse(false);
					c.select();
				}
			} else {
				var range = this.getRange().range,
					selection = this.getRange().selection;
				if (!range) {
					ta.innerHTML += html;
					self.saveLastRange();
					return this;
				}
				var oFragment = range.createContextualFragment(html), //把插入内容转变为DocumentFragment
					oLastNode = oFragment.lastChild; //用于修正编辑光标的位置
				range.insertNode(oFragment);
				range.setEndAfter(oLastNode); //把编辑光标放到我们插入内容之后
				range.setStartAfter(oLastNode);
				selection.removeAllRanges(); //清除所有选择，要不我们插入的内容与刚才的文本处于选中状态
				selection.addRange(range); //插入内容
			}
			self.saveLastRange();
		},
		saveLastRange: function () {
			this.getRange() && (this.lastRange = this.getRange().range);
		},
		setLastRange: function () {
			if (this.lastRange && this.getRange()) {
				var selection = this.getRange().selection;
				if (selection.removeAllRanges) {
					selection.removeAllRanges();
					selection.addRange(this.lastRange);
				}
			}
		},
		getRange: function () {
			var selection = (window.getSelection) ? window.getSelection() : document.selection;
			if (!selection) {
				return null;
			}
			try {
				var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
				var text = window.getSelection ? range : range.text;
				var rangeNode = null;
				if (range.commonAncestorContainer) {
					rangeNode = range.commonAncestorContainer;
				} else {
					if (range.parentElement)
						rangeNode = range.parentElement();
				}
				return {
					node: rangeNode,
					range: range,
					text: text,
					selection: selection
				}
			} catch (e) {
				return null;
			}
		}
	})
})(jQuery);
