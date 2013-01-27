define([
    "dijit/layout/ContentPane"
], function(ContentPane) {
    // summary:
    //      Base ContentPane with doLayout = false by default
    //      we do not need to ContentPane to doLayouts

    return require('dojo/_base/declare')([ ContentPane ], {
            doLayout: false
    });
});