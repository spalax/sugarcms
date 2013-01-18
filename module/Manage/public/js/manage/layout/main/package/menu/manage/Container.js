define([
    "dojo/_base/declare",
    "../../_PageWidgetsScope",
    "./widget/Menu",
    "dojo/data/ItemFileWriteStore",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Container.html"
], function(declare, _PageWidgetsScope, Menu, 
            Store, _TemplatedMixin, template) {
    // module:
    //      manage/widget/menu/manage/Container
    return declare([ _PageWidgetsScope, _TemplatedMixin ], {
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
                this._menuStore = new Store({url: "/manage/menu/"+this.menuId});
                this._menu = new Menu({store: this._menuStore});
                
                this.addChild(this._menu);
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});