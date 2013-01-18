define([
        "dojo/_base/declare",
        "dijit/layout/ContentPane",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "dijit/form/TextBox",
        "dojo/request",
        "dojo/Evented",
        "./component/Response",
        "dojo/text!./templates/Form.html"
        ], function(declare, ContentPane, _TemplatedMixin,
                     _WidgetsInTemplateMixin, TextBox, request, Evented,
                     Response, template) {

    return declare([ ContentPane, Evented, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        // summary:
        //      This is class for displaying login Form
        // events:
        //      This class produce events
        //      LoginSuccess and LoginFailed
        templateString: template,

        _onErrorHandler: function () {
            // summary:
            //      Error back function called if some thing gone wrong in
            //      callback or request was fail
            try {

            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },

        _onLoginHandler: function (/*Object*/ data) {
            // summary:
            //      Success back function called if request
            //      successfully executed

            try {
                var responseObject = new Response(data);
                if (responseObject.isSuccess()) {
                    console.debug('Login success >>>', data, responseObject);
                    this.emit('LoginSuccess');
                } else {
                    console.debug('Login failed >>>', data, responseObject);
                    this.emit('LoginFailed');
                }
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },

        _onLogin: function () {
            // summary: 
            //      Called every time when user click on the button in Template
            // tags: 
            //      private
            try {
                var buttonNode = this.buttonNode;

                request.post('/manage/login.json',
                             { data: { login: this.loginNode.get('value'),
                                       password: this.passwordNode.get('value')},
                               handleAs: 'json'})
                        .then(require('dojo/_base/lang').hitch(this, this._onLoginHandler),
                              this._onErrorHandler)
                        .always(function () {
                                  try {
                                      buttonNode.cancel();
                                  } catch (e) {
                                      console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                                      throw e;
                                  }
                              });
                
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});