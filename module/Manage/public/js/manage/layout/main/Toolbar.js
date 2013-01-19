define([
    "dijit/Toolbar",
    "dojo/_base/declare",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Toolbar.html"
], function(Toolbar, declare, _TemplatedMixin, template) {

    return declare( [ Toolbar, _TemplatedMixin ], {
        templateString:  template
    });
});