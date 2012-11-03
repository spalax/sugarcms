define([
    "dojo/_base/declare",
    "../../_PageWidgetsContainer",
    "dojo/store/JsonRest",
    "dojo/json",
    "dojox/grid/DataGrid",
    "dojo/data/ObjectStore",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./resources/Structure.json",
    "dojo/text!./templates/Container.html"
], function(declare, _PageWidgetsContainer, JsonRest, JSON, DataGrid, 
             ObjectStore, _TemplatedMixin, _WidgetsInTemplateMixin, structureJSONString, template) {
    return declare([ _PageWidgetsContainer, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        templateString: template,
        
        baseClass: 'RoutesList',
        
        // _grid: [private] dojox/grid/DataGrid
        //      Grid object initialized on postCreate
        _grid: null,
        
        postCreate: function() {
            try {
                var structure = JSON.parse(structureJSONString);
                var routesStore = new JsonRest({target:"/manage/routes.json/"});
                var objectStore = new ObjectStore({objectStore: routesStore});
                this._grid = new DataGrid({store: objectStore,
                                           structure: structure}, 
                                           this.gridNode);
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        onShow: function () {
            try {
                this._grid.startup();
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});