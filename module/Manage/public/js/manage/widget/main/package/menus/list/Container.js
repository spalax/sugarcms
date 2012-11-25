define([
    "dojo/_base/declare",
    "dijit/_Widget",
    "dijit/_Contained",
    "dojo/Evented",
    "../../_PageWidgetsContainer",
    "dojo/store/JsonRest",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Container.html"
], function(declare, _Widget, Evented, _Contained, _PageWidgetsContainer, 
            Store, _TemplatedMixin, templateContainer) {
    // module:
    //      manage/widget/menus/list/Container
    return declare([ _PageWidgetsContainer, Evented, _TemplatedMixin ], {
        //  summary:
        //      Menu list container. It is container widget which will be displayed
        //      and load widgets, it is responsibility only load contained widgets
        templateString: templateContainer,
        
        baseClass: 'menus list',
        
        // _store: [private] dojo/store/JsonRest
        //      Contains object who contains all the menus
        //      provided by back-end
        _store: null,
        
        postMixInProperties: function () {
            try {
                this._store = new Store({url: "/manage/menus.json/"});
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        postCreate: function() {
            try {
                this._store.query();
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});