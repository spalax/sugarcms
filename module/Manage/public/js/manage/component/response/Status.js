define([
        "dojo/_base/declare",
        "manage/component/Response"
        ], function(declare, Response) {
// module:
//      manage/component/response/Status
    return declare([ Response ], {
        // summary:
        //      This type standard for all Status responses
        // description:
        //      This type should be used if your back-end return to you 
        //      data which contains status only. Like {status: 0}
        
        getStatus: function () {
            // summary:
            //      Return status from data object
            try {
                return this.data.status;
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
                if (typeof(data['status']) == 'undefined') {
                    throw "Invalid response format";
                }
            } catch (e) {
                console.error(this.declaredClass+" "+arguments.callee.nom, arguments, e);
                throw e;
            }
        }
    });
});