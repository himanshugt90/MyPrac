public class triggerHandlerOnTopX {

    public static void updateOpp(List<Top_X_Designation__c> topXList){
        
        map<Id,Boolean> oppList=new map<Id,Boolean>();
        List<Opportunity> op=new List<Opportunity>();
        set<Id> oppIds=new set<Id>();
        
        for(Top_X_Designation__c topx:topXList){
            
            if( topx.Type__c=='Contract Flow Down/Handoff' && topx.Document_Attached__c && !trigger.isdelete){
                oppList.put(topx.Opportunity__c, true);
            }else{
                oppList.put(topx.Opportunity__c, false);
            }
            
            oppIds.add(topx.Opportunity__c);
        }
        
        for(Opportunity o:[select Id,Handoff_Attached__c from Opportunity where Id in : oppIds ]){
            
            o.Handoff_Attached__c= oppList.get(o.Id);
            op.add(o);
        }
        update op;
    }
}