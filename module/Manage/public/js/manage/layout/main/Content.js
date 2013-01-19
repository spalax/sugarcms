define([
    "../StackContainer",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/router",
    "dojo/hash",
    "dojo/on",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Content.html"
], function(StackContainer, declare, lang, array, router, hash,
            on, _TemplatedMixin, template) {

    return declare('main.Content', [ StackContainer, _TemplatedMixin ], {
        templateString:  template
    });
});