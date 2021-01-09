trigger TriggerOnAccount on Account (After insert, before insert, before update,after undelete) {
   /* if(trigger.isAfter && trigger.isInsert){
        triggerOnAccountHandler.accountInsert(trigger.new);
    }
    if((trigger.isBefore && (trigger.isInsert || trigger.isUpdate)) || (trigger.isUndelete && trigger.isAfter)){
        
        triggerOnAccountHandler.handleDuplicateAccount(trigger.new);
    }*/
    if(trigger.isBefore){
        triggerOnAccountHandler.populateSalesRep(trigger.new);
	}
}