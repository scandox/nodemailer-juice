'use strict';

var chai = require('chai');
var inLineCss = require('../src/nodemailer-juice');
var expect = chai.expect;

describe('nodemailer-juice tests', function() {

    it('should inline styles from stylesheets within the html', function(done) {
        var plugin = inLineCss();
        var mail = {
            data: {
                html: '<style>div{color:red}</style><div>They say Napoleon was colour blind and blood to him as green as grass</div>'
            },
            resolveContent: function(obj, key, cb) {
                cb(null, obj[key]);
            }
        };
        plugin(mail, function(err) {
            expect(err).to.not.exist;
            expect(mail.data.html).to.equal(
                '<div style="color: red;">They say Napoleon was colour blind and blood to him as green as grass</div>'
            );
            done();
        });
    });

    it('should inline styles from external stylesheets linked within the html', function(done) {
        var plugin = inLineCss();
        var mail = {
            data: {
                html: '<link href="test/style.css" rel="stylesheet"><div>They say Napoleon was colour blind and blood to him as green as grass</div>'
            },
            resolveContent: function(obj, key, cb) {
                cb(null, obj[key]);
            }
        };
        plugin(mail, function(err) {
            expect(err).to.not.exist;
            expect(mail.data.html).to.equal(
                '<div style="color: red;">They say Napoleon was colour blind and blood to him as green as grass</div>'
            );
            done();
        });
    });

    it('should respect juice options', function(done) {
        var plugin = inLineCss({ removeStyleTags: false });
        var mail = {
            data: {
                html: '<style>div{color:red}</style><div>They say Napoleon was colour blind and blood to him as green as grass</div>'
            },
            resolveContent: function(obj, key, cb) {
                cb(null, obj[key]);
            }
        };
        plugin(mail, function(err) {
            expect(err).to.not.exist;
            expect(mail.data.html).to.equal(
                '<style>div{color:red}</style><div style="color: red;">They say Napoleon was colour blind and blood to him as green as grass</div>'
            );
            done();
        });
    });
 
    it('should return an error', function(done) {
        var plugin = inLineCss();
        var mail = {
            data: {
                html: 'test'
            },
            resolveContent: function(obj, key, cb) {
                cb(new Error('fail'));
            }
        };
        plugin(mail, function(err) {
            expect(err).to.exist;
            done();
        });
    });
});
