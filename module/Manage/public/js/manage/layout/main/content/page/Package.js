define([
        "dojo/_base/declare",
        "../package",
        "../route",
        "./list/Container",
        "./add/Container",
        "dojo/i18n!./nls/Package"
], function(declare, _Package, route, ListContainer, AddContainer, translation) {

    var pageList = declare([ route ], {
        getRoute: function () {
            // see: route.route::getRoute
            return '/page';
        },

        createObject: function () {
            // see: route::createObject
            return new ListContainer();
        }
    });

    var pageAdd = declare([ route ], {
        routeClass: AddContainer,
        getRoute: function () {
            // see: route.route::getRoute
            return '/page/add';
        },

        createObject: function () {
            // see: route::createObject
            return new AddContainer();
        }
    });

    return declare("PagePackage", [ _Package ], {
        // summary:
        //      Menu package. Will provide to user abilities to add menus to the system
        //      and connect menus and HTML pages.
        defaultRoute: '/page',
        title: translation['packageTitle'],

        getRoutes: function () {
            try {
                return [pageList, pageAdd];
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        }
    });
});