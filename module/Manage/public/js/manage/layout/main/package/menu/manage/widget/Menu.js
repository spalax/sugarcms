define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/data/ItemFileWriteStore",
    "dijit/Tree",
    "dijit/tree/TreeStoreModel",
    "dijit/tree/dndSource"
], function(declare, lang, Store, Tree, TreeStoreModel, dndSource) {
 // module:
//  manage/widget/menu/manage/widget/Menu
    return declare([ Tree ], {
        // summary:
        //      Menu tree. It is implement menu tree which elements could be
        //      dragged thru branches, and will be stylized like menu with items.
        dndController: dndSource,
        betweenThreshold: 2,
        baseClass: 'menuTree',
        
        // _menuStore: [private] dojo/data/ItemFileWriteStore
        //      Store object which will be put to the TreeModelStore
        _menuStore: null,
        
        postMixInProperties: function() {
            try {
                if (this.params.store && this.params.store.isInstanceOf(Store)) {
                    this._menuStore = this.params.store;
                } else {
                    throw "Store not given or invalid store type must be ItemFileWriteStore";
                }
                
                this.model = new TreeStoreModel({store: this._menuStore, 
                                                 query: { id: "0" }});
                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        checkItemAcceptance: function () {
            try {
                return true;
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        addMenuItem: function () {
            try {
                alert("Menu item");
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        getLabel: function (item) {
            try {
                var label = this._menuStore.getLabel(item);
                return label;
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});