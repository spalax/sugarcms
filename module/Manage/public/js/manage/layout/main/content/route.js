define([
    "dojo/_base/declare",
    "../route"
], function(declare, route) {

    return declare([route.route, route.container, route.custominstance], {
        // summary:
        //      Mixin handle situation when route will
        //      be added as a child of ContentContainer
    });
});