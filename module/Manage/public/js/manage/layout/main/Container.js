define([
    "require",
    "dijit/_Widget",
    "dijit/_Contained",
    "dijit/_Container",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/router",
    "dijit/_TemplatedMixin",
    "dojo/json",
    "./Content",
    "./Rounded",
    "./Toolbar",
    "dojo/text!./resources/packages/Content.json",
    "dojo/text!./resources/packages/Rounded.json",
    "dojo/text!./resources/packages/Toolbar.json",
    "dojo/text!./templates/Container.html"
], function(_require, _Widget, _Contained, _Container, declare, lang, array, router,
            _TemplatedMixin, JSON, ContentContainer,
            RoundedContainer, ToolbarContainer,
            contentPackagesJSONString, roundedPackagesJSONString,
            toolbarPackagesJSONString, template) {
    return declare([ _Widget, _Contained, _Container, _TemplatedMixin ], {
        templateString:  template,

        postCreate: function() {
            // summary:
            //      Parse JSON files with predefined package configurations.
            //      Collecting routes from package files.
            try {
            	var packages = this._getPackages(JSON.parse(toolbarPackagesJSONString));
                var container = new ToolbarContainer({packages: packages});
                this.addChild(container);
                console.debug("Loaded ToolbarContainer with routes", packages);

                packages = this._getPackages(JSON.parse(roundedPackagesJSONString)),
                container = new RoundedContainer({packages: packages});

                this.addChild(container);
                console.debug("Loaded RoundedContainer with packages", packages);

                packages = this._getPackages(JSON.parse(contentPackagesJSONString)),
                container = new ContentContainer({packages: packages});
                this.addChild(container);
                console.debug("Loaded ContentContainer with packages", packages);

                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        },

        _getPackages: function (jsonPackages) {
            // summary:
            //      Walking thru packages array and
            //      extracting routes from every package.
            //      Collect them and return.
            // returns:
            //      Array of collected routes
            try {
                var packages = [];
                array.forEach(jsonPackages, lang.hitch(this, function (pack){
                    try {
                        if (!pack['package']) {
                            throw "Widget key does not found";
                        }
                        console.debug("Require package ", pack['package']);
                        require([ pack['package']+"/package" ], lang.hitch(this, function (Package) {
                            try {
                                var packageObject = new Package({routeParams: pack['routes']});
                                if (!packageObject.isInstanceOf(_require('./package'))) {
                                    throw "Loading package is not compatible with type _Package";
                                }
                                packages.push(packageObject);
                            } catch (e) {
                                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                                throw e;
                            }
                        }));
                    } catch (e) {
                        console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                        throw e;
                    }
                }));
                return packages;
            } catch (e) {
                 console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                 throw e;
            }
        },

        onShow: function () {
            // summary:
            //      In this startup will starting up StackContainer
            //      and router will be starting as well.
            try {
                this.inherited(arguments);
                router.startup();
            } catch (e) {
                console.error(this.declaredClass + " " + arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});