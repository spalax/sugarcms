define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "../Menu",
    "dijit/form/Button"
], function(declare, lang, Menu, Button) {
// module:
//      manage/widget/menus/manage/widget/menu/AddItemButton
    return declare([ Button ], {
        // summary:
        //      It is extend default button with behavior of the 
        //      button who should by click adding new item to the
        //      menu.
        
        
        // _menuStore: [private] dojo/data/ItemFileWriteStore
        //      Store object which will be put to the TreeModelStore
        _menuStore: null,
        
        constructor: function () {
            try {
                alert("Construct button");
                console.log(arguments);
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});