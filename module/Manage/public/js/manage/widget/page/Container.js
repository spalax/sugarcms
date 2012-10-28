define([
    "dojo/_base/declare",
    "dijit/layout/StackContainer",
    "manage/widget/routes/page/List",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Container.html"
], function(declare, 
             StackContainer, 
             RoutesList, 
             _Templated, 
             template) {
    return declare([ StackContainer, _Templated ], {
        templateString:  template,
        
        postCreate: function() {
            try {
                this.inherited(arguments);
                console.log("Post create pageContainer loading Routes list");
                this.addChild(new RoutesList());
                console.log("Loaded");
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});