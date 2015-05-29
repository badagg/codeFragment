/*
* ������� ������λ��
* �÷���
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
						document.selection.clear(); //���ѡ��
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
				var oFragment = range.createContextualFragment(html), //�Ѳ�������ת��ΪDocumentFragment
					oLastNode = oFragment.lastChild; //���������༭����λ��
				range.insertNode(oFragment);
				range.setEndAfter(oLastNode); //�ѱ༭���ŵ����ǲ�������֮��
				range.setStartAfter(oLastNode);
				selection.removeAllRanges(); //�������ѡ��Ҫ�����ǲ����������ղŵ��ı�����ѡ��״̬
				selection.addRange(range); //��������
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
