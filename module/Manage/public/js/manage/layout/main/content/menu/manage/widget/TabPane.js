define([
    "dojo/_base/declare",
    "../../../../../ContentPane",
    "dojo/data/ItemFileWriteStore",
    "./Menu"
], function(declare, ContentPane, Store, Menu) {
    // summary:
    //      TabPane it is a content pane which shown in TabContainer
    //      inside MenuContainer. It is override onShow method with
    //      behavior to creating MenuTree inside the content pane

    return declare([ ContentPane ], {
            // _menu: [private] ./Menu
            _menu: null,

            postMixInProperties: function () {
                try {
                    if (!this.menuId) {
                        throw new Error('MenuId must be defined');
                    }
                    this.inherited(arguments);
                } catch (e) {
                     console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                     throw e;
                }
            },

            onShow: function () {
                // summary:
                //      Create MenuTree inside ContentPane
                try {
                    this._menu && this._menu.destroyRecursive();
                    this._menu = new Menu({store: new Store({url: "/manage/menu/"+this.menuId})});
                    this.attr('content', this._menu.domNode);
                } catch (e) {
                    console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                    throw e;
                }
            }
    });
});