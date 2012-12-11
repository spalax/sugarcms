define([
    "dojo/_base/declare",
    "./ListAdapter"
], function(declare, ListAdapter) {
    // module:
    //      sugarcms/dgrid/_ListAdapterSelection
    return declare([ ListAdapter ], {
        //  summary:
        //      Method override in Selection

        removeSelected: function () {
            try {
                return this._list.removeSelected();
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        }
    });
});