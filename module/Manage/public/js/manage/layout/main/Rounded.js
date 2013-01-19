define([
    "../StackContainer",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/router",
    "dijit/_TemplatedMixin",
    "dojo/json",
    "dojo/text!./templates/Rounded.html"
], function(StackContainer, declare, lang, array, router, _TemplatedMixin, JSON, template) {
    return declare('main.Rounded', [ StackContainer, _TemplatedMixin ], {
        templateString:  template
    });
});