import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import fillNumber from '@salesforce/apex/GenerateReportController.fillNumber';

export default class FillNumberInsideAcc extends LightningElement {
    
    @api recordId;
    @api sobjectName;
    invoiceNumber;

    inputChanged(event) {
        this.invoiceNumber = event.target.value;
    }

    handleSave(){
        fillNumber({ sobjectName : this.sobjectName, 
                    recordId : this.recordId, 
                    invoiceNumber : this.invoiceNumber })
            .then( () => {
                console.log('invoiceNumber: ' + this.invoiceNumber);
                
                //this.dispatchEvent(new CustomEvent('close'));
                this.dispatchEvent(new CustomEvent('numberadded'));
                this.dispatchEvent(new ShowToastEvent({
                    title: 'Success',
                    message: 'Invoicing item number added to main opportunity',
                    variant: 'success'
                }));
            })
            .catch( error => {
                console.log('error in fillNumberInsideAcc: ' + JSON.stringify(error));
            });
    }

    closeQuickAction() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}