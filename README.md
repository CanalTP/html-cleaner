# html-cleaner
Transform html to be more semantic. Useful when rendering WYSIWYG content.

| inline style | inner tag |
| --- | --- |
| font-weight: bold; | \<b> |
| font-style: italic; | \<i> |
| text-decoration: underline; | \<u> |

## Quick Start

### Get it [![gitTio](http://gitt.io/badge.svg)](http://gitt.io/component/org.kisio.htmlcleaner)
Download the latest distribution ZIP-file and consult the [Titanium Documentation](http://docs.appcelerator.com/titanium/latest/#!/guide/Using_a_Module) on how install it, or simply use the [gitTio CLI](http://gitt.io/cli):

`$ gittio install org.kisio.htmlcleaner`

### Use it

```
var htmlcleaner = require('org.kisio.htmlcleaner');`
htmlcleaner.clean('<span style="text-decoration: underline;">Test underline</span>', function(result){
    console.log(result); // <span><u>Test underline</u></span>
});
```
