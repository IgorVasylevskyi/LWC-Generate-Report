public with sharing class GenerateReportController {

    @AuraEnabled
    public static void fillNumber(String sobjectName, String recordId, String invoiceNumber) {

        System.debug('oppId: ' + recordId);
        System.debug('sobjectName: ' + sobjectName);
        System.debug('invoiceNumber: ' + invoiceNumber);
        Opportunity opp = new Opportunity();

        if (sobjectName == 'Opportunity') {
            
            opp = [
                SELECT 
                    Id, Name, Invoicing_Item_Number__c 
                FROM 
                    Opportunity 
                    WHERE Id = :recordId
                ];

            opp.Invoicing_Item_Number__c = invoiceNumber;
        } else if (sobjectName == 'Account') {
            System.debug('in account');
            opp = [
                SELECT 
                    Id, Name, Invoicing_Item_Number__c 
                FROM 
                    Opportunity
                WHERE 
                    AccountId = :recordId
                    AND Is_Main__c = TRUE
                    LIMIT 1
            ];
            opp.Invoicing_Item_Number__c = invoiceNumber;
            System.debug('opp: ' + opp);
        }

        update opp;
    }

    @AuraEnabled
    public static Boolean mainOppHasNumber(String accountId) {

        List<Opportunity> opps = [
                                SELECT 
                                    Id, Name, Invoicing_Item_Number__c 
                                FROM 
                                    Opportunity 
                                WHERE 
                                    AccountId = :accountId 
                                    AND Is_Main__c = TRUE
                                ];

        System.debug('opps.size: ' + opps.size());
        if(opps.size() == 1 && opps[0].Invoicing_Item_Number__c != null) {

            return true;
        } else if (opps.size() == 0) {

            throw new AuraHandledException('Account doesn`t have main opportunity');
        }

        return false;
    }
}
