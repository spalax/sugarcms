define([
    "dojo/_base/declare",
    "../route"
], function(declare, route) {
    return declare("ContentRoute", [ route ], {
        // summary:
        //      Mixin handle situation when route will
        //      be added as a child of ContentContainer

        _moduleSetter: function (module) {
            // summary:
            //      Set module, it is must be
            //      valid path to the dojo declared
            //      module. Then it is will be loaded
            //      and put to the module parameter
            try {
                this.instanceType = require(module);
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        getInstance: function () {
            // summary:
            //      Get module instance which will should
            //      be displayed
            try {
                return new this.instanceType();
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        }
    });
});