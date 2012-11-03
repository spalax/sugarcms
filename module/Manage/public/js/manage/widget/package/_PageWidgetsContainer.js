define([
    "dojo/_base/declare",
    "dijit/layout/ContentPane",
    "dijit/_Container",
    "dijit/_Contained"
], function(declare, ContentPane, _Container, _Contained) {
 // module:
 //  manage/widget/package/_PageWidgetsContainer
    return declare([ ContentPane, _Container, _Contained ], {
        // summary:
        //      This is base class for widgets who will be preparing as pages.
        onShow: function () {
            //  summary:
            //      This method will be called every time when current container
            //      will be appearing in main container as current
        },
        
        onHide: function () {
            // summary:
            //      This method will be called every time when current container
            //      will be disappearing in main container as current
        }
    });
});