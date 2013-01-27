define([
    "dojo/_base/declare",
    "../../../../ContentPane",
    "../../_ExpansionMixin"
], function(declare, ContentPane, _ExpansionMixin) {
    return declare("PageExpanderNextTest", [ ContentPane, _ExpansionMixin ], {

        title: 'Next Test Title',
        content: 'Next test COntent Pane',

        postCreate: function () {
            try {
                console.debug("Instance in expander is >>>", this.get('targetInstance'));
                this.inherited(arguments);
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        }
    });
});