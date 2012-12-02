define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dgrid/List"
], function(declare, dom, _Widget, _TemplatedMixin, List) {
    // module:
    //      manage/widget/main/package/page/list/widget/_DGridWidgetAdapter
    return declare([ _Widget, _TemplatedMixin ], {
        //  summary:
        //      Grid widget for displaying all available pages
        //      as list
        
        templateString: "<div data-dojo-attach-point='domNode'></div>",
        
        // 
        grid: null,
        
        postMixInProperties: function () {
            try {
                if (!this.grid) {
                    throw "Grid must be defined as parameter for this Adapter";
                }
                
                if (!this.grid instanceof List) {
                    throw "Grid must be an instance of dgrid/List";
                }
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        postCreate: function () {
            //  summary:
            //      Replacing _Widget domNode with grid domNode
            try {
                dom.place(this.grid.domNode, this.domNode);
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        startup: function () {
            // summary:
            //      Manually call startup for DGrid class
            try {
                this.grid.startup();
                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        destroy: function () {
            // summary:
            //      Manually destroy created grid
            try {
                if (!this.grid.destroy) {
                    console.warn("Grid does not have destroy recursive, it is might be a risk of memory leak");
                } else {
                    this.grid.destroy();
                }
                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});