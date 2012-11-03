define([
    "dojo/_base/declare",
    "../../_PageWidgetsContainer",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/Container.html"
], function(declare, _PageWidgetsContainer, _TemplatedMixin, _WidgetsInTemplateMixin, template) {
    return declare([ _PageWidgetsContainer, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        templateString: template
    });
});