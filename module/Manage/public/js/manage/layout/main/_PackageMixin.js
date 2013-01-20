define([
    "require",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dijit/_Widget"
], function(_require, declare, lang, array, _Widget) {
    return declare([ _Widget ], {
        // packages: Array
        //      Array of packages ready to be registered
        //      with current container,

        postCreate: function () {
            // summary:
            //      Processing given array of packages types
            try {

                if (!lang.isArray(this.packages)) {
                    throw "Packages must be defined for container";
                }

                console.debug("All packages in package MIXIN >>>", this.packages);

                array.forEach(this.packages, lang.hitch(this, function (newPackage){
                    if (!newPackage.isInstanceOf(_require('./package'))) {
                        throw "Invalid _Package type in _PackageMixin";
                    }
                    this.registerNewPackage(newPackage);
                }));

                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        },

        registerNewPackage: function (/*package*/ newPackage) {
            // summary:
            //      Register new package
            // tags:
            //      protected
            try {
                console.warn("Package stand to register >>> ", newPackage);
                newPackage.register();

                if (!this.isInstanceOf || !this.isInstanceOf(_require('dijit/_Container'))) {
                    throw "Container must be declared and it is must be an instance of" +
                        " dijit/Container";
                }

                this.addChild(newPackage);
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});