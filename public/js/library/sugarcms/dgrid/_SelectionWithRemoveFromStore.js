define([
    "dojo/_base/declare",
    "dgrid/_StoreMixin",
    "dgrid/Selection"
], function(declare, _StoreMixin, Selection) {
    // module:
    //     sugarcms/dgrid/_SelectionRemoveFromStore

    return declare([ _StoreMixin, Selection ], {
        //  summary:
        //      Expanded selection for removeSelected rows from store
        removeSelected: function () {
            // summary:
            //      Remove all selected rows in the list from store
            try {
                for (id in this.selection) {
                    this.selection[id] === true &&
                    this.store && this.store.remove &&
                    this.store.remove(id);
                }
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});