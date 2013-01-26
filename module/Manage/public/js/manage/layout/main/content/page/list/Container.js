define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "../../_PageWidgetsScopeMixin",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Container.html",
    "dojo/i18n!../nls/List",
    "./widget/Grid",
    "dijit/form/Button"
], function(declare, array, lang, _PageWidgetsScopeMixin, _TemplatedMixin,
            template, translation, Grid, Button) {
    return declare([ _PageWidgetsScopeMixin, _TemplatedMixin ], {
        //  summary:
        //      List container. Contains widgets who responsible for
        //      displaying list of pages.
        templateString: template,
        baseClass: 'pageList',
        
        postCreate: function () {
            try {
                this._gridWidget = new Grid({'class': this.baseClass+'Grid'});

                this.addChild(new Button({label: translation['removeSelectedButton'],
                                          'class': this.baseClass+'DeletePage',
                                          'onClick': lang.hitch(this, '_onDeletePage')}));

                this.addChild(this._gridWidget);
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        refresh: function () {
            try {
                this._gridWidget.refresh();
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },
        
        _onDeletePage: function () {
            try {
                this._gridWidget.removeSelected();
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});