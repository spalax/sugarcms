define([
    "dojo/_base/declare",
    "../../_PageWidgetsScopeMixin",
    "dojox/layout/GridContainer",
    "../../../../TabContainer",
    "../../_ExpandedMixin",
    "./widget/TabPane",
    "dojo/store/JsonRest",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Container.html"
], function(declare, _PageWidgetsScopeMixin,
            GridContainer, TabContainer, _ExpandedMixin,
            TabPane, JsonRest,
            _TemplatedMixin, template) {
    return declare("MenuManageContainer", [ _ExpandedMixin, _PageWidgetsScopeMixin, _TemplatedMixin ], {
        //  summary:
        //      Menu manage container. Will load the widgets who will be responsible
        //      for displaying specific menu tree.
        templateString: template,
        
        baseClass: 'menu manage',
        
        // _menuStore: [private] dojo/data/ItemFileWriteStore
        //      Write store who contains all available menus and items
        _menuStore: null,

        // _listStore: [private] dojo/store/JsonRest
        //      Json Rest store contains all available menus
        //      from backend
        _listStore: null,

        
        // menuId: Integer
        //      Identifier of the menu to display
        menuId: 0,

        postCreate: function () {
            try {
                this._listStore = new JsonRest({target: "/manage/menu"});

                this._tabContainer = new TabContainer({},
                                                      this.tabContainerWidget);
                this._container = new GridContainer({nbZones: 1,
                                                     hasResizableColumns: false,
                                                     doLayout: false,
                                                     acceptTypes: ['ContentPane']},
                                                    this.gridContainerWidget);
                var _self = this;

                this._listStore.query().forEach(function (menu){
                    var _contentPane = new TabPane({title: menu.label,
                                                    menuId: menu.id });
                    _self._tabContainer.addChild(_contentPane);
                });
                this.inherited(arguments);
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        attachExpansion: function (expansion) {
            // see: _ExpandedMixin::attachExpansion
            try {
                console.debug("Attaching expansion to menu manage >>>", expansion);
                if (!expansion.isInstanceOf(require('dijit/layout/ContentPane'))) {
                    throw new TypeError('Expansion must be an instance of ContentPane');
                }
                this._container.addChild(expansion);
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        }
    });
});