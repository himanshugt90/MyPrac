trigger triggerOnTopx on Top_X_Designation__c (after insert, after update,after delete) {
    
    if(trigger.isInsert || trigger.isUpdate){
        	triggerHandlerOnTopX.updateOpp(trigger.new);

    }
    if(trigger.isdelete){
        	triggerHandlerOnTopX.updateOpp(trigger.old);

    }
}