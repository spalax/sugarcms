define([
        "dojo/_base/declare"
        ], function(declare) {
// module:
//      manage/component/Response
    return declare(null, {
        // summary:
        //      This is class for standardize Response
        // description:
        //      If you want have standardized response which would have a type.
        //      You should use this type.
        //      Your back-end will return some JSON data in some format, you can
        //      you can extend this Response class and you will be able to use
        //      this class with other components in the system.
        
        // data: [protected] Object
        //      Contains object with data
        data: null,
        
        constructor: function (data) {
            try {
                this.assertSchema(data);
                this.data = data;
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        assertSchema: function (data) {
            // summary:
            //      method should be overloaded in children 
            //      who wants to declare own schema
            // tag:
            //      abstract, protected
            throw "Method assertSchema must be overloaded";
        }
    });
});