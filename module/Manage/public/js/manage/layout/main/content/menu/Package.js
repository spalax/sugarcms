define([
        "dojo/_base/declare",
        "../package",
        "../route",
        "./list/Container",
        "./manage/Container",
        "dojo/i18n!./nls/Package"
        ], function(declare, _Package, route, ListContainer, ManageContainer, translation) {

    var menuList = declare('MenuList', [ route ], {

        getRoute: function () {
            // see: route.route::getRoute
            return '/menu';
        },

        createObject: function () {
            // see: route::createObject
            return new ListContainer();
        }
    });

    var menuManage = declare('MenuManage', [ route ], {

        getRoute: function () {
            // see: route.stack.contained::getRoute
            return '/menu/manage/:menuId';
        },

        createObject: function () {
            // see: route::createObject
            return new ManageContainer();
        }
    });

    return declare("MenuPackage", [ _Package ], {
        // summary:
        //      Menu package. Will provide to user abilities to add menus to the system
        //      and connect menus and HTML pages.

        defaultRoute: '/menu/manage/123',
        title: translation['packageTitle'],

        getRoutes: function () {
            try {
                return [menuList, menuManage];
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});