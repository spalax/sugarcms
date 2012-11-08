define([
    "dojo/_base/declare",
    "../../_PageWidgetsContainer",
    "./widget/Tree",
    "dojo/data/ItemFileWriteStore",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Container.html"
], function(declare, _PageWidgetsContainer, Tree, 
            Store, _TemplatedMixin, template) {
    // module:
    // manage/widget/menu/list/Container
    return declare([ _PageWidgetsContainer, _TemplatedMixin ], {
        //  summary:
        //      Menu list container. It is container widget which will be displayed
        //      and load widgets, it is responsibility only load contained widgets
        templateString: template,
        
        baseClass: 'MenuList',
        
        postCreate: function() {
            try {
                var tree = new Tree({store: new Store({url: "/manage/menus.json/"})});
                this.addChild(tree);
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        onShow: function () {
            try {
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});