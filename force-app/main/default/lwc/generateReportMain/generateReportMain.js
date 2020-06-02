import { LightningElement, api } from 'lwc';

import mainOppHasNumber from '@salesforce/apex/GenerateReportController.mainOppHasNumber';

export default class GenerateReportMain extends LightningElement {

    @api recordId;
    @api sobjectName;
    oppHasNumber;

    connectedCallback() {
        mainOppHasNumber({ accountId : this.recordId })
            .then(result => {
                this.oppHasNumber = result;
                console.log('generateReportMain result: ' + result);
                
            })
            .catch(error => {
                console.log('error in generateReportMain in connectedCallback');
            });
    }

    numberAdded() {
        this.oppHasNumber = true;
    }

    closeQuickAction() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}