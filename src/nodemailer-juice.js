'use strict';

var juice = require('juice');

var plugin = function(options) {
    options = options || {};

    return function(mail, done) {
        var handler = new InlineCss(options);
        handler.process(mail, done);
    };
};

function InlineCss(options) {
    this._options = {};

    // create a shallow copy of the passed options
    Object.keys(options || {}).forEach(function(key) {
        this._options[key] = options[key];
    }.bind(this));
}

InlineCss.prototype.process = function(mail, done) {
    var self = this;

    // Nothing to inline if the mail does not have HTML content
    if (!mail || !mail.data || !mail.data.html) {
        return done();
    }

    mail.resolveContent(mail.data, 'html', function(err, html) {
        if (err) {
            return done(err);
        }
        juice.juiceResources(html, self._options, function(err, inlinedHtml) {
            if (err) {
                return done(err);
            }
            mail.data.html = inlinedHtml;
            done(); 
        });
  
    }.bind(this));
};

module.exports = plugin;
