define([
    "dijit/layout/StackContainer"
], function(StackContainer) {
    // summary:
    //      Base StackContainer with doLayout = false by default
    //      we do not need to StackContainer to doLayouts

    return require('dojo/_base/declare')([ StackContainer ], {
            doLayout: false
    });
});