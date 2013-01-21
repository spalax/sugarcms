define([
    "../TabContainer",
    "dojo/_base/declare",
    "./_PackageMixin"
], function(TabContainer, declare, _PackageMixin) {

    return declare('main.Content', [ TabContainer, _PackageMixin ], {
        style :"width: 500px; height: 200px;",
        tabPosition: "left-h"
    });
});