define(["dojo/_base/declare",
        "dojo/_base/lang",
        "../package",
        "../../route",
        "dijit/form/DropDownButton",
        "./dropdown/Container"],
    function(declare, lang, _Package, route, DropDownButton, DropDownContainer) {

    return declare("ProfilePackage", [ DropDownButton, _Package ], {
        // summary:
        //      Profile package. Will provide user abilities to configure
        //      his profile.

        iconClass: 'icon profile',
        dropDown: new DropDownContainer(),

        getRoute: function (/*Object*/ routeParams) {
            // summary:
            //      Factory method, created
            //      for provide abilities to overload
            //      in children.
            // tags:
            //      protected
            try {
                var routeObject = new route(routeParams);
                routeObject.on('handle', lang.hitch(this, 'openDropDown'));
                return routeObject;
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});