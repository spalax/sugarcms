define([
    "dojo/_base/declare",
    "dijit/layout/ContentPane",
    "dijit/_Contained"
], function(declare, ContentPane, _Contained) {
    return declare([ ContentPane, _Contained ], {
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