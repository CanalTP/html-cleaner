var chai = require('chai');
var assert = chai.assert;
var htmlCleaner = require('./../index');

describe('htmlCleaner', function() {
    it('should add bold tag', function(done) {
        var data = '<span style="font-weight: bold;">Test de gras</span>';
        htmlCleaner.clean(data, function(result) {
            assert.equal(result, '<span><b>Test de gras</b></span>');
            done();
        });
    });

    it('should add italic tag', function(done) {
        var data = '<span style="font-style: italic;">Test italique</span>';
        var result = htmlCleaner.clean(data, function(result) {
            assert.equal(result, '<span><i>Test italique</i></span>');
            done();
        });
    });

    it('should add underline tag', function(done) {
        var data = '<span style="text-decoration: underline;">Test underline</span>';
        var result = htmlCleaner.clean(data, function(result) {
            assert.equal(result, '<span><u>Test underline</u></span>');
            done();
        });
    });

    it('should add all tags', function(done) {
        var data = '<span style="font-weight: bold; font-style: italic; text-decoration: underline;">Test de gras et italique</span>';
        var result = htmlCleaner.clean(data, function(result) {
            assert.equal(result, '<span><u><i><b>Test de gras et italique</b></i></u></span>');
            done();
        });
    });

    it('should work with any tag', function(done) {
        var data = '<p style="font-weight: bold;">Test de gras</p>';
        var result = htmlCleaner.clean(data, function(result) {
            assert.equal(result, '<p><b>Test de gras</b></p>');
            done();
        });
    });

    it('should remove converted style and keep others', function(done) {
        var data = '<span style="font-style: italic; color: red;">Test italique</span>';
        htmlCleaner.clean(data, function(result) {
            assert.equal(result, '<span style="color: red;"><i>Test italique</i></span>');
            done();
        });
    });

    it('should remove empty style', function(done) {
        var data = '<span style="font-style: italic;">Test italique</span>';
        htmlCleaner.clean(data, function(result) {
            assert.equal(result, '<span><i>Test italique</i></span>');
            done();
        });
    });

    it('should use autoclose when no children', function(done) {
        var data = '<br/>';
        htmlCleaner.clean(data, function(result) {
            assert.equal(result, '<br/>');
            done();
        });
    });

    it('should target correct node', function(done) {
        var data = '<span style="font-style: italic;">Test italique<span style="font-weight: bold;">Test gras</span></span>';
        htmlCleaner.clean(data, function(result) {
            assert.equal(result, '<span><i>Test italique<span><b>Test gras</b></span></i></span>');
            done();
        });
    });
});