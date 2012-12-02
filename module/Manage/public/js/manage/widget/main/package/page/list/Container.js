define([
    "dojo/_base/declare",
    "../../_PageWidgetsContainer",
    "dojo/store/JsonRest",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Container.html"
], function(declare, _PageWidgetsContainer, 
            JsonRest, _TemplatedMixin, template) {
    // module:
    //      manage/widget/main/package/page/list/Container
    return declare([ _PageWidgetsContainer, _TemplatedMixin ], {
        //  summary:
        //      List container. Contains widgets who responsible for
        //      displaying list of pages.
        templateString: template,
        
        baseClass: 'page list',
        
        postMixInProperties: function () {
            
        },
        
        postCreate: function() {
            // summary:
            //      Creating store with data from back-end and initialize Container widget
            //      with requested data.
            try {
                this._listStore = new JsonRest({url: "/manage/page"});
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});