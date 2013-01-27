define([
    "require",
    "dojo/_base/declare",
    "dijit/_Widget"
], function(_require, declare, _Widget) {
    return declare('_ExpansionMixin', [_Widget], {
        // summary:
        //      This is base class for widgets who will be used as extensions
        //      for content container and one of it is routes

        // _targetInstance: [private] _ExpandedMixin
        _targetInstance: null,

        postCreate: function () {
            try {
                if (!this._targetInstance) {
                    throw new Error('Target instance must be defined');
                }

                this.inherited(arguments);
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        _setTargetInstanceAttr: function (targetInstance) {
            // summary:
            //      Set instance where expansion will be attached
            try {
                console.debug("Target instance is >>>", targetInstance,
                              "Current instance is >>>", this);

                if (!targetInstance.isInstanceOf(_require('./_ExpandedMixin'))) {
                    throw new TypeError('Target instance inside ExtensionMixin has' +
                                        ' invalid or incompatible type');
                }

                this._targetInstance = targetInstance;
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        _getTargetInstanceAttr: function () {
            // summary:
            //      Return instance of the host widget
            // returns:
            //      _ExpandedMixin
            // tags:
            //      protected
            try {
                return this._targetInstance;
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        }
    });
});