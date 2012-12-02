define([
    "dojo/_base/declare",
    "dijit/form/Form",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/Form.html"
], function(declare, Form, _WidgetsInTemplateMixin, template) {
    // module:
    //      manage/widget/main/package/page/add/widget/Form
    return declare([ Form, _WidgetsInTemplateMixin ], {
        //  summary:
        //      Form widget for adding page to the CMS database
        templateString: template,
        
        postCreate: function() {
            try {
                
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});