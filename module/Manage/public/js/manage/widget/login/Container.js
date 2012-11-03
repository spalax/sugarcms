define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/layout/StackContainer",
    "dijit/_TemplatedMixin",
    "./Form",
    "dojo/text!./templates/Container.html"
], function(declare, lang, StackContainer, 
             _TemplatedMixin, Form, template) {
// module:
//      manage/widget/login/Container
    return declare([ StackContainer, _TemplatedMixin ], {
        templateString: template,
        
        // summary:
        //      This is container for displaying login page with 
        //      all it is states.
        postCreate: function () {
            try {
                this.addChild(new Form());
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});