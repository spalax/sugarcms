define([
        "dojo/_base/declare",
        "manage/component/Response"
        ], function(declare, Response) {
// module:
//      manage/component/response/StatusMessage
    return declare([ Response ], {
        // summary:
        //      This type standard for all StatusMessage responses
        // description:
        //      This type should be used if your back-end return to you 
        //      data which contains status and message. Like {status: 0, message: "All goes right!"}
        
        getMessage: function () {
            // summary:
            //      Return message from data object
            try {
                return this.data.message; // String
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        getStatus: function () {
            // summary:
            //      Return status from data object
            try {
                switch (this.data.status) {
                    case 0: 
                        return 'success'; //String
                    case 1:
                        return 'error'; //String
                }
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        },
        
        assertSchema: function (data) {
            // summary:
            //      method asserting valid structure of the data object
            // tag:
            //      protected
            try {
                if (typeof(data['status']) == 'undefined' || typeof(data['message']) == 'undefined') {
                    throw "Invalid response format";
                }
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});