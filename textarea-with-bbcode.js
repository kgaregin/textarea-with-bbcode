(() => {
  class TextareaWithBBCode {
    constructor(containerElement, bbcodeTags = {}, textareaAttributes = {}) {
      if (!(containerElement instanceof Node)) throw 'error: container element must be node!';
      this.__container = containerElement;
      this.__textarea = document.createElement('textarea');
      this.__bbcodeButtons = [];

      // helper functions:
      let setAttributes = (element, attrs = {}) => {
        for (let attrName in attrs) {
          element.setAttribute(attrName, attrs[attrName]);
        }
      }

      let textWithTag = (currentText, tagBegin, tagEnd, selectionStartPos, selectionEndPos) => {
      	return selectionStartPos === selectionEndPos || tagEnd === '' ?
            currentText.slice(0, selectionStartPos) +
            tagBegin +
            tagEnd +
            currentText.slice(selectionStartPos) :
            currentText.slice(0, selectionStartPos) +
            tagBegin +
            currentText.slice(selectionStartPos, selectionEndPos) +
            tagEnd +
            currentText.slice(selectionEndPos);
      }

      // tune bbcode buttons:
      for (let tag in bbcodeTags) {
        let btn = document.createElement('button');
        setAttributes(btn, {
          type: 'button',
          class: 'btn_twbbcode'
        });
        btn.innerHTML = tag;
        btn.addEventListener('click', () => {
          // console.log(this.getCursorPos());
          let currentText = this.__textarea.value;
          let tagBegin = bbcodeTags[tag][0];
          let tagEnd = bbcodeTags[tag][1];
          let selectionStartPos = this.getCursorPos().start;
          let selectionEndPos = this.getCursorPos().end;
          this.__textarea.value = textWithTag(currentText, tagBegin, tagEnd, selectionStartPos, selectionEndPos)
        });
        this.__bbcodeButtons.push(btn);
      }

      // tune textarea:
      setAttributes(this.__textarea, Object.assign({'rows': 10, class: 'textarea_twbbcode'}, textareaAttributes)) // default values go first
      if (!textareaAttributes.cols) this.__textarea.style.width = '100%'; // default behavior if cols not set

      // append everything to container:
      this.__bbcodeButtons.forEach(btn => this.__container.appendChild(btn));
      this.__container.appendChild(this.__textarea);
    }

    // crossbrowser solution from stack:
    getCursorPos() {
      let textarea = this.__textarea;
      if ("selectionStart" in textarea) {
        return {
          start: textarea.selectionStart,
          end: textarea.selectionEnd
        };
      } else if (textarea.createTextRange) {
        var sel = document.selection.createRange();
        if (sel.parentElement() === textarea) {
          var rng = textarea.createTextRange();
          rng.moveToBookmark(sel.getBookmark());
          for (var len = 0; rng.compareEndPoints("EndToStart", rng) > 0; rng.moveEnd("character", -1)) {
            len++;
          }
          rng.setEndPoint("StartToStart", textarea.createTextRange());
          for (var pos = { start: 0, end: len }; rng.compareEndPoints("EndToStart", rng) > 0; rng.moveEnd("character", -1)) {
            pos.start++;
            pos.end++;
          }
          return pos;
        }
      }
      return -1;
    }

  }

  window.TextareaWithBBCode = TextareaWithBBCode;
})();
