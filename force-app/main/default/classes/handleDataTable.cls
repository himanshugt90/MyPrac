public with sharing class handleDataTable {
    
    @AuraEnabled
    public static List<Account>  fetchData(){

        return [select Id,Name from Account];

    }
    @AuraEnabled
    public static Map<String,List<String>> deleteData(List<String> ids){
        
        List<Account> accList=[SELECT ID, NAME FROM ACCOUNT WHERE ID IN :ids];
        List<String> deleteIds=new List<String>();
        List<String> errorIds=new List<String>();
        Map<String,List<String>> listRecords=new Map<String,List<String>>();

        Database.DeleteResult[] srList= Database.delete(accList,false);
        for(Database.DeleteResult sr: srList){
            if(sr.isSuccess()){
                System.debug('Deleted -- '+sr.getId());
                deleteIds.add(sr.getId());

            }
            else{
                errorIds.add(sr.getId());
                for(Database.Error err : sr.getErrors()) {
                    System.debug('The following error has occurred.');                    
                    System.debug(err.getStatusCode() + ': ' + err.getMessage());
                    System.debug('Account fields that affected this error: ' + err.getFields());
                }
            }
        }
        listRecords.put('succuess',deleteIds);
        listRecords.put('error',errorIds);

        return listRecords;
    }
}
