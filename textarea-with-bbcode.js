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

      // tune bbcode buttons:
      for (let tag in bbcodeTags) {
        let btn = document.createElement('button');
        setAttributes(btn, {
          type: 'button'
        })
        btn.innerHTML = tag;
        btn.addEventListener('click', () => {
          // console.log(this.getCursorPos());
          let currentText = this.__textarea.value;
          let tagBegin = bbcodeTags[tag][0];
          let tagEnd = bbcodeTags[tag][1];
          let selectionStartPos = this.getCursorPos().start;
          let selectionEndPos = this.getCursorPos().end;
          let newText = selectionStartPos === selectionEndPos || tagEnd === '' ?
            currentText.slice(0, selectionStartPos) +
            tagBegin +
            tagEnd +
            currentText.slice(selectionStartPos) :
            currentText.slice(0, selectionStartPos) +
            tagBegin +
            currentText.slice(selectionStartPos, selectionEndPos) +
            tagEnd +
            currentText.slice(selectionEndPos);
          this.__textarea.value = newText;
        });
        this.__bbcodeButtons.push(btn);
      }

      // tune textarea:
      setAttributes(this.__textarea, textareaAttributes)
      if (!textareaAttributes.cols) this.__textarea.style.width = '100%'; // default behavior if cols not set
      this.__textarea.setAttribute('rows', textareaAttributes.rows || 10); // default rows if not set

      // append everything to container:
      this.__bbcodeButtons.forEach(btn => this.__container.appendChild(btn));
      this.__container.appendChild(this.__textarea);
    }

    getCursorPos() {
      let input = this.__textarea;
      if ("selectionStart" in input) {
        return {
          start: input.selectionStart,
          end: input.selectionEnd
        };
      } else if (input.createTextRange) {
        var sel = document.selection.createRange();
        if (sel.parentElement() === input) {
          var rng = input.createTextRange();
          rng.moveToBookmark(sel.getBookmark());
          for (var len = 0; rng.compareEndPoints("EndToStart", rng) > 0; rng.moveEnd("character", -1)) {
            len++;
          }
          rng.setEndPoint("StartToStart", input.createTextRange());
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
