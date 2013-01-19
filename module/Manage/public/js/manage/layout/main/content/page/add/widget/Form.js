define([
    "dojo/_base/declare",
    "dijit/form/Form",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/Form.html",
    "dojo/i18n!../../nls/Add",
    "dijit/Editor",
    "dijit/form/TextBox",
    "dijit/_editor/plugins/AlwaysShowToolbar",
    "dojox/editor/plugins/LocalImage"
], function(declare, Form, _WidgetsInTemplateMixin, template, translation) {

    return declare([ Form, _WidgetsInTemplateMixin ], {
        //  summary:
        //      Form widget for adding page to the CMS database


        templateString: template,

        // _t: [const] Object
        //      Contains dictionary with translations
        _t: translation,

        postCreate: function() {
            try {
                
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});