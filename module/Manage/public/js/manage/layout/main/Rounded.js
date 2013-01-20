define([
    "../StackContainer",
    "dojo/_base/declare",
    "./_PackageMixin",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Rounded.html"
], function(StackContainer, declare, _PackageMixin, _TemplatedMixin, template) {
    return declare('main.Rounded', [ StackContainer, _PackageMixin, _TemplatedMixin ], {
        templateString:  template
    });
});