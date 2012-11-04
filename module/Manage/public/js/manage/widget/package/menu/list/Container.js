define([
    "dojo/_base/declare",
    "../../_PageWidgetsContainer",
    "dojo/store/JsonRest",
    "dojo/json",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/Container.html"
], function(declare, _PageWidgetsContainer, JsonRest, JSON, 
             _TemplatedMixin, _WidgetsInTemplateMixin, template) {
    return declare([ _PageWidgetsContainer, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        templateString: template,
        
        baseClass: 'MenuList',
        
        postCreate: function() {
            try {
                var menuStore = new JsonRest({target:"/manage/menu.json/"});
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        onShow: function () {
            try {
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});