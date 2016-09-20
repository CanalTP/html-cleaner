var htmlparser = require('htmlparser');

var tags = {
    b: 'font-weight: bold;',
    i: 'font-style: italic;',
    u: 'text-decoration: underline;',
};

function convertStylesToTags(element) {
    if (element.attribs && element.attribs.style !== void 0) {
        for (tag in tags) {
            if (element.attribs.style.match(tags[tag])) {
                element.attribs.style = element.attribs.style.replace(tags[tag], '');
                var currentChildren = element.children || [];
                element.children = [{
                    raw: tag,
                    data: tag,
                    type: 'tag',
                    name: tag,
                    children: currentChildren,
                },];
            }
        }

        if (element.attribs.style.match(/^\s*$/)) {
            delete element.attribs.style;
        }
    }
}

function composeHtml(dom) {
    var html = '';
    dom.forEach(function(element) {
        if (element.type === 'tag') {
            convertStylesToTags(element);
            var children = element.children || [];
            var attribs = '';
            for (attr in element.attribs) {
                attribs += ' ' + attr + '="' + element.attribs[attr].trim() + '"';
            }
            html += '<' + element.name + attribs;
            if (children.length > 0) {
                html += '>' + composeHtml(children) + '</' + element.name + '>';
            } else {
                html += '/>';
            }
        } else if (element.type === 'text') {
            html += element.data;
        }
    });
    return html;
}

module.exports = {
    clean: function(data, callback) {
        var handler = new htmlparser.DefaultHandler(function(error, dom) {
            if (!error) {
                if (callback) {
                    callback(composeHtml(dom));
                }
            }
        });
        var parser = new htmlparser.Parser(handler);
        parser.parseComplete(data);
    },
};
