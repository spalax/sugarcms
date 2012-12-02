define([
    "dojo/_base/declare",
    "dojo/string",
    "dojo/dom-attr",
    "manage/component/dgrid/Adapter",
    "dojo/store/JsonRest",
    "dojo/store/Observable", 
    "dojo/store/Cache",
    "dojo/store/Memory",
    "put-selector/put",
    "dgrid/OnDemandGrid", 
    "dgrid/Keyboard", 
    "dgrid/Selection",
    "dojo/text!./templates/_GridRenderRow.html"
], function(declare, string, domAttr, Adapter, JsonRest, Observable, 
            Cache, Memory, put, Grid, Keyboard, Selection,
            renderRowTemplate) {
    // module:
    //      manage/widget/main/package/page/list/widget/Grid
    var _store = Observable(Cache(JsonRest({
        target: "/manage/page/",
        idProperty: "id"
    }), Memory()));
    
    var _Grid = declare([ Grid, Keyboard, Selection ], {
        //  summary:
        //      Grid widget for displaying all available pages
        //      as list
        
        store: _store,
        
        columns: {
            id: {label: 'Id'},
            title: {label: 'Title'},
            descr: {label: 'Description'}
        },
        
        showHeader: false,
        
        renderRow: function (obj, options) {
            // summary: 
            //      Returning HTML for rendering each row
            try {
                return domAttr.set(put("div"), 'innerHTML', string.substitute(renderRowTemplate, {obj: obj}));
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        removeSelected: function () {
            // summary:
            //      Remove all selected items in the grid
            try {
                for (id in this.selection) {
                    this.selection[id] === true && _store.remove(id);
                };
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
    
    return declare([ Adapter ], {
        // summary: 
        //      Adapter for displaying dGrid as widget for made possibilities to
        //      use dGrid with dijit._Container
        
        postMixInProperties: function () {
            try {
                this.grid = new _Grid();
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});