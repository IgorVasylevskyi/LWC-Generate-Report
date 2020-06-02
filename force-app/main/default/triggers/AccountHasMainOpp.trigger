trigger AccountHasMainOpp on Opportunity (before insert, before update) {

    Set<Id> accIds = new Set<Id>();
    for (Opportunity opp : (List<Opportunity>) Trigger.new){
        accIds.add(opp.AccountId);
    }

    Map<Id, Account> accMap = new Map<Id, Account>([
                                                    SELECT 
                                                        Id, Name, Main_Opportunities__c 
                                                    FROM 
                                                        Account 
                                                        WHERE Id IN :accIds
                                                    ]);

    if (Trigger.isInsert) {
        for(Opportunity opp : Trigger.new) {
            Account parentAcc = accMap.get(opp.AccountId);
            
            if(parentAcc != null){
                if(opp.Is_Main__c == true && opp.AccountId != null && parentAcc.Main_Opportunities__c >= 1) {

                    opp.addError('Parent Account already has main Opportunity (before insert)');
                } 
            }
        }
    }

    if(Trigger.isUpdate) {
        
        for(Opportunity opp : Trigger.new) {
            Opportunity oldOpp = Trigger.oldMap.get(opp.Id);
            Account parentAcc = accMap.get(opp.AccountId);
            
            if(parentAcc != null){
                if(opp.Is_Main__c == true 
                    && oldOpp.Is_Main__c == false 
                    && parentAcc.Main_Opportunities__c >= 1) {
                    
                        opp.addError('Parent Account already has main Opportunity (before update)');
                }
            }
        }
    }

}