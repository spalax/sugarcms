define([
        "dojo/_base/declare",
        "../package",
        "dojo/i18n!./nls/Package"
        ], function(declare, _Package, translation) {

    return declare("MenuPackage", [ _Package ], {
        // summary:
        //      Menu package. Will provide to user abilities to add menus to the system
        //      and connect menus and HTML pages.

        defaultRoute: '/menu/manage/123',
        title: translation['packageTitle']
    });
});