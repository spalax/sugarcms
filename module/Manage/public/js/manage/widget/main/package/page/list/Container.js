define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "../../_PageWidgetsScope",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/Container.html",
    "dijit/form/Button",
    "./widget/Grid"
], function(declare, array, _PageWidgetsScope, _TemplatedMixin, 
            _WidgetsInTemplateMixin, template) {
    // module:
    //      manage/widget/main/package/page/list/Container
    return declare([ _PageWidgetsScope, _TemplatedMixin, _WidgetsInTemplateMixin], {
        //  summary:
        //      List container. Contains widgets who responsible for
        //      displaying list of pages.
        templateString: template,
        deletePageLabel: 'Delete Page',
        baseClass: 'pageList',
        
        _onDeletePage: function () {
            try {
                this.gridWidget.grid.removeSelected();
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});