define([
    "require",
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/aspect",
    "dijit/_Widget"
], function(_require, declare, array, aspect, _Widget) {
    return declare('_ExpandedMixin', [ _Widget ], {
        // summary:
        //      This is base class for widgets who will be preparing as pages.

        // _expansions: [private] Array

        _setExpansionsAttr: function (/*array[_ExpansionMixin] */ expansions) {
            // summary:
            //      Deprecated setter, should be changed to _expansionsSetter,
            //      but first need to check is now setters could work correctly
            //      with dijit.layout.ContentPane
            try {
                console.debug("Setting new expansions >>>", expansions);
                this._expansions = [];
                var _self = this;
                array.forEach(expansions, function (expansionType){
                    try {
                        var expansion = new expansionType({'targetInstance': _self});
                        console.debug("Expansion created >>", expansion);
                        if (!expansion.isInstanceOf(_require('./_ExpansionMixin'))) {
                            throw new TypeError('Invalid type of expansion in _ExpandedMixin');
                        }
                        _self._expansions.push(expansion);
                    } catch (e) {
                        console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                        throw e;
                    }
                });

                this._processExpansions();
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        _processExpansions: function () {
            // summary:
            //      Called for processing array of
            //      all prepared expansions, and attaching
            //      them to the hosted widget.
            try {
                var _self = this;
                array.forEach(this._expansions, function (expansion){
                    _self.attachExpansion(expansion);
                });
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        attachExpansion: function (/*_ExpansionMixin*/ expansion) {
            // summary:
            //      Method created to give possibilities to
            //      attach expansion to the place in the expandable
            //      widget.

            /* Override */
        }
    });
});