define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dgrid/List"
], function(declare, dom, _Widget, _TemplatedMixin, List) {
    // module:
    //      sugarcms/dgrid/ListAdapter
    return declare([ _Widget, _TemplatedMixin ], {

        //  summary:
        //      List widget for displaying all available pages
        //      as list

        // templateString: [const] String
        //         Default template for the current widget
        //         it is required because we need registering
        //         domNode in dijit registry for normal behavior
        //         inside dijit._Container
        templateString: "<div data-dojo-attach-point='domNode'></div>",

        //  list: [protected] dgrid/List
        //          Original Adaptee, used for invoking real behavior.
        //
        list: null,

        postMixInProperties: function () {
            try {
                if (!this._list) {
                    throw "List must be defined as parameter for this Adapter";
                }

                if (!this._list instanceof List) {
                    throw "Lrid must be an instance of dgrid/List";
                }
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },

        postCreate: function () {
            //  summary:
            //      Replacing _Widget domNode with list domNode
            try {
                dom.place(this._list.domNode, this.domNode);
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },

        startup: function () {
            // summary:
            //      Manually call startup for DGrid class
            try {
                this._list.startup();
                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },

        refresh: function () {
            // summary:
            //      Proxy for refresh in List
            try {
               return this._list.refresh();
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        destroy: function () {
            // summary:
            //      Manually destroy created list
            try {
                if (!this._list.destroy) {
                    console.warn("List does not have destroy recursive, it is might be a risk of memory leak");
                } else {
                    this._list.destroy();
                }
                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});