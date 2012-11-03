define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/layout/StackContainer",
    "dijit/_TemplatedMixin",
    "dojo/json",
    "dojo/_base/array",
    "./_Package",
    "dojo/text!./resources/Packages.json",
    "dojo/text!./templates/Container.html"
], function(declare, lang, StackContainer, 
            _TemplatedMixin, JSON, arrayUtil, 
            _Package, packagesJSONString, template) {
    return declare([ StackContainer, _TemplatedMixin ], {
        templateString:  template,
        postCreate: function() {
            try {
                var packages = JSON.parse(packagesJSONString);
                arrayUtil.forEach(packages, lang.hitch(this, function (pack){
                    try {
                        if (!pack['package']) {
                            throw "Widget key does not found";
                        }
                        var _self = this;
                        console.debug("Require package ", pack['package']);
                        require([ pack['package']+"/Package" ], function (Package) {
                            try {
                                var packageObject = new Package();
                                if (!packageObject.isInstanceOf(_Package)) {
                                    throw "Loading package is not compatible with type _Package";
                                }
                                var pages = packageObject.getPages();
                                console.debug("Array with pages ", pages," was read from package ", pack['package']);
                                dojo.forEach(pages, function (page) {
                                    try {
                                        require([ pack['package']+"/"+page ], function (pageType){
                                            console.debug("Page loaded ", page, " and type ", pageType);
                                            var widget = new pageType();
                                            _self.addChild(widget);
                                            console.debug("Added page to the page container ", page, 
                                                          " and object ", widget);
                                        });
                                    } catch (e) {
                                        console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                                        throw e;
                                    }
                                });
                            } catch (e) {
                                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                                throw e;
                            }
                        });
                    } catch (e) {
                        console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                        throw e;
                    }
                }));
                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});