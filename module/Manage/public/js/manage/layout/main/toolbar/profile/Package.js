define(["dojo/_base/declare",
        "dojo/_base/lang",
        "../package",
        "../../route",
        "dijit/form/DropDownButton",
        "./dropdown/Container"],
    function(declare, lang, _Package, route, DropDownButton, DropDownContainer) {

    var entryRoute = declare("EntryRoute", [ route.route ], {
            getRoute: function () {
                // see: route.route::getRoute
                return '/my/profile';
            }
        });

    return declare("ProfilePackage", [ DropDownButton, _Package ], {
        // summary:
        //      Profile package. Will provide user abilities to configure
        //      his profile.

        iconClass: 'icon profile',
        dropDown: new DropDownContainer(),

        postMixInProperties: function () {
            try {
                var entry = new entryRoute();
                entry.on('handle', lang.hitch(this, 'openDropDown'));
                this.routes.push(entry);

                this.inherited(arguments);
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        }
    });
});