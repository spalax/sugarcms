define([
    "dojo/_base/declare",
    "../../_PageWidgetsScopeMixin",
    "./widget/Menu",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/data/ItemFileWriteStore",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Container.html"
], function(declare, _PageWidgetsScopeMixin, Menu, array, lang,
            Store, _TemplatedMixin, template) {
    // module:
    //      manage/widget/menu/manage/Container
    return declare([ _PageWidgetsScopeMixin, _TemplatedMixin ], {
        //  summary:
        //      Menu manage container. Will load the widgets who will be responsible
        //      for displaying specific menu tree.
        templateString: template,
        
        baseClass: 'menu manage',
        
        // _menuStore: [private] dojo/data/ItemFileWriteStore
        //      Write store who containes all available menus and items
        _menuStore: null,
        
        // _menu: [private] ./widget/Menu
        //      Menu tree displayed in the front of user, and open
        //      possibilities to change item order.
        _menu: null,
        
        // menuId: Integer
        //      Identifier of the menu to display
        menuId: 0,

        _setMenuIdAttr: function (menuId) {
            // summary:
            //      Creating store with data from back-end and initialize Menu widget
            //      with requested data.
            try {
                this._menuStore = new Store({url: "/manage/menu/"+menuId});
                this._menu = new Menu({store: this._menuStore});
                array.forEach(this.getChildren(), lang.hitch(this, function (child){
                    this.removeChild(child);
                    child.destroyRecursive();
                }));
                this.addChild(this._menu);
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        }
    });
});