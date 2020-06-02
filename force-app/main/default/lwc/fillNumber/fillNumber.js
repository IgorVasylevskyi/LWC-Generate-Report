import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import fillNumber from '@salesforce/apex/GenerateReportController.fillNumber';


export default class FillNumber extends LightningElement {

    @api recordId;
    @api sobjectName;
    invoiceNumber;
    
    handleSave(){
        this.addNumber();
    }

    inputChanged(event){
        this.invoiceNumber = event.target.value;
    }

    addNumber(){
        
        fillNumber({ sobjectName : this.sobjectName, recordId : this.recordId, invoiceNumber : this.invoiceNumber })
            .then( () => {
                this.dispatchEvent(new CustomEvent('close'));
                this.dispatchEvent(new ShowToastEvent({
                    title : 'Success',
                    message : 'Invoicing item number added',
                    variant : 'success' 
                }));
                this.dispatchEvent(new CustomEvent('recordChange'));
                console.log('number added');
            })
            .catch(error => {
                this.dispatchEvent(new ShowToastEvent({
                    title : 'Error',
                    message : 'Error when adding invoicing item number',
                    variant : 'error'
                }));
                console.log('error: ' + JSON.stringify(error));
            });
    }

    closeQuickAction(){
        this.dispatchEvent(new CustomEvent('close'));
    }

}