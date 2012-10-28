define([
    "dojo/_base/declare",
    "manage/widget/page/_Page",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/List.html"
], function(declare, _Page, _TemplatedMixin, _WidgetsInTemplateMixin, template) {
    return declare([ _Page, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        templateString: template,
        
        postCreate: function() {
            try {
                alert("Routes list loaded");
                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});