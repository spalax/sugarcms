define([
    "dojo/_base/declare",
    "dijit/layout/ContentPane",
    "../../_ExpansionMixin"
], function(declare, ContentPane, _ExpansionMixin) {
    return declare("PageExpanderTest", [ ContentPane, _ExpansionMixin ], {
        postCreate: function () {
            try {
                alert("Post create in expander");
                console.debug("Instance in expander is >>>", this.get('targetInstance'));
                this.inherited(arguments);
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        }
    });
});