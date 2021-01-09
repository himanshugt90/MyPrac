public class triggerOnAccountHandler {
    public static void accountInsert(List<Account> accList){
        if(trigger.IsExecuting){
            List<Contact> conList=new List<Contact>();
            //acc.id, 5
            map<Id,Decimal> dataMap=new map<Id,Decimal>(); 
            for(Account ac:accList){
                //Contact con=new Contact(LastName='himanshu',AccountId=ac.Id);
                dataMap.put(ac.Id, ac.Total_Contacts__c);
                
            } 
            for(Id ids:dataMap.keySet()){
                for(integer i=0;i<dataMap.get(ids);i++){
                    Contact con=new Contact(LastName='himanshu '+i,AccountId=ids);
                    conList.add(con);
                }
            }
            Database.SaveResult[] srList=Database.insert(conList);
            for(Database.SaveResult sr:srList){
                if(sr.isSuccess()){
                    System.debug('inserted Id '+ sr.getId());
                }
                else{
                    System.debug('error--'+sr.getErrors());
                }
            }
            
        }
        
    }
    public static void handleDuplicateAccount(List<Account> accList){
        
        set<String> accNameList=new set<String>();
        for(Account ac:accList){
            accNameList.add(ac.Name);    
        }
        List<String> accNames=new List<String>();
        for(Account ac:[select Name from Account where Name in : accNameList]){
            accNames.add(ac.Name);
        }
        for(Account ac:accList){
            Boolean match=accNames.contains(ac.Name);
            if(match){
                ac.Name.addError('Account name already exist');
            }
        }
        
        
    }
    public static void populateSalesRep(List<Account> accList){
        
        set<Id> ownerIds=new set<Id>();
        for(Account ac:accList){
            ownerIds.add(ac.OwnerId);
        }
        Map<Id,User> dataMap=new Map<Id,User>([select Id,Name from User where Id in :ownerIds]);
        
        for(Account ac:accList){
            User u=dataMap.get(ac.OwnerId);
            ac.Sales_Rep__c=u.Name;
        }
    }  
}