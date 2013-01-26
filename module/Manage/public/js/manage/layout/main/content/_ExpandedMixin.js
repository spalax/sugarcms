define([
    "require",
    "dojo/_base/declare",
    "dojo/_base/array",
    "dijit/_Widget"
], function(_require, declare, array, _Widget) {
    return declare('_ExpandedMixin', [ _Widget ], {
        // summary:
        //      This is base class for widgets who will be preparing as pages.

        // _expansions: [private] Array
        _setExpansionsAttr: function (/*array[_ExpansionMixin] */ expansions) {
            // summary:
            //      Deprecated setter, should be changed to _expansionsSetter,
            //      but first need to check is now setters could work correctly
            //      with dijit.layout.ContentPane.
            try {
                console.debug("Add new expansions >>>", expansions);
                alert("Adding expansions");

                this._expansions = [];
                var _self = this;
                array.forEach(expansions, function (expansionType){
                    console.debug("Expansion type >>", expansionType.prototype);
                    var expansion = new expansionType({'targetInstance': _self});
                    console.debug("Expansion created type >>", expansion);
                    if (!expansion.isInstanceOf(_require('./_ExpansionMixin'))) {
                        throw new TypeError('Invalid type of expansion in _ExpandedMixin');
                    }
                    _self._expansions.push(expansion);
                });
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        }
    });
});