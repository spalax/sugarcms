define([
    "dojo/_base/declare",
    "dijit/_Widget",
    "dijit/_Contained",
    "../../_PageWidgetsScopeMixin",
    "dojo/store/JsonRest",
    "../../_ExpandedMixin",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Container.html"
], function(declare, _Widget, _Contained, _PageWidgetsScopeMixin,
            JsonRest, _ExpandedMixin, _TemplatedMixin, templateContainer) {

    return declare([ _ExpandedMixin, _PageWidgetsScopeMixin, _TemplatedMixin ], {
        //  summary:
        //      Menu list container. It will load all menus and it is
        //      views
        templateString: templateContainer,
        
        baseClass: 'menu list',
        
        // _store: [private] dojo/store/JsonRest
        //      Contains object who contains all the menus
        //      provided by back-end
        _store: null,
        
        postMixInProperties: function () {
            try {
                this._store = new JsonRest({url: "/manage/menu/"});
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