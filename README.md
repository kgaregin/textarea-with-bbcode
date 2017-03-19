# textarea-with-bbcode
Textarea with very simple bbcode supporting, written in module style with ES6. 

How to use: just create a new instance of TextareaWithBBCode on container DOM element with options.
```js
let containerElement = document.querySelector('.textarea_bbcode');
let bbcodeTags = {
	buttonName: ['tagBegin', 'tagEnd'],
	buttonName: ['tagBegin', 'tagEnd'],
	buttonName: ['tagBegin', 'tagEnd']
	... // any amount of buttons. If tag goes without ending just leave empty string ''.
}
let textareaAttributes = {
	cols: 10,
	... // any textarea attribute. If column number (cols) not specified
			// textarea width will be 100% to fill parent.
}
new TextareaWithBBCode(containerElement, bbcodeTags, textareaAttributes); 
// container element always required. Everything else is optional.
```

Additional example of usage may also be found inside example.html