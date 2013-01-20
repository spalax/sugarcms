define([
    "dijit/Toolbar",
    "dojo/_base/declare",
    "./_PackageMixin",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Toolbar.html"
], function(Toolbar, declare, _PackageMixin, _TemplatedMixin, template) {

    return declare("main.Toolbar", [ Toolbar, _PackageMixin, _TemplatedMixin ], {
        templateString:  template
    });
});