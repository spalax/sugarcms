define([
    "dijit/layout/TabContainer"
], function(TabContainer) {
    // summary:
    //      Base TabContainer with doLayout = false by default
    //      we do not need to TabContainer to doLayouts

    return require('dojo/_base/declare')([ TabContainer ], {
            doLayout: false
    });
});