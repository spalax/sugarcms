define([
    "dojo/_base/declare",
    "dijit/_Widget",
    "dijit/_Container",
    "dijit/_Contained",
    "dijit/_TemplatedMixin",
    "./widget/Form",
    "dojo/Evented",
    "dojo/text!./templates/Container.html"
], function(declare, _Widget, _Container,
             _Contained, _TemplatedMixin, LoginForm,
             Evented, template) {

    return declare([ _Widget, _Container, Evented, _Contained, _TemplatedMixin ], {
        // summary:
        //      This is container for displaying login page with
        //      all it is states.
        //      This container produce events LoginSuccess and LoginFailed
        templateString: template,

        postCreate: function () {
            try {
                var loginForm = new LoginForm();

                loginForm.on('LoginSuccess', require('dojo/_base/lang').hitch(this, 'emit', 'LoginSuccess'));
                loginForm.on('LoginFailed', require('dojo/_base/lang').hitch(this, 'emit', 'LoginFailed'));

                this.addChild(loginForm);
                this.inherited(arguments);
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});