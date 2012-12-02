define([
    "dojo/_base/declare",
    "../../_PageWidgetsContainer",
    "dojo/store/JsonRest",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Container.html"
], function(declare, _PageWidgetsContainer, 
            JsonStore, _TemplatedMixin, template) {
    // module:
    //      manage/widget/main/package/page/add/Container
    return declare([ _PageWidgetsContainer, _TemplatedMixin ], {
        //  summary:
        //      Add container. Contains widgets who responsible
        //      for adding pages to the system.
        templateString: template,
        
        baseClass: 'page add',
        
        postMixInProperties: function () {
            // summary:
            //      Declaring menuId as required constuctor's parameter
            try {
                if (!this.menuId) {
                    throw "Identifier of the menu must be defined";
                }
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        postCreate: function() {
            // summary:
            //      Creating store with data from back-end and initialize Menu widget
            //      with requested data.
            try {
                this._menuStore = new JsonRest({url: "/manage/page.json"});
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});