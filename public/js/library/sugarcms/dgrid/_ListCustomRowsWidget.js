define([
    "dojo/_base/declare",
    "dijit/registry",
    "dojo/_base/array",
    "dgrid/OnDemandGrid"
], function(declare, registry, array, Grid) {
    // module:
    //     sugarcms/grid/_ListCutomRowsWidget

    return declare([ Grid ], {
        //  summary:
        //      Grid widget mixin. Will provide ability to
        //      clear memory from widgets created by custom row formatter.
        //      This widget should be mixed in only if you have own created
        //      widgets inside body of row.
        removeRow: function (node) {
            try {
                this.inherited(arguments);
                array.forEach(registry.findWidgets(node),function (widget){
                    widget.destroyRecursive && widget.destroyRecursive();
                });
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});