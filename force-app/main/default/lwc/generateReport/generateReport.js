import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class GenerateReport extends LightningElement {

    @api recordId;

    get options() {
        return [
            { label: 'A', value: 'A'},
            { label: 'B', value: 'B'},
            { label: 'C', value: 'C'}
        ];
    }

    closeQuickAction() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    generateReport() {
        this.dispatchEvent(new CustomEvent('close'));
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success',
            message: 'Report generated',
            variant: 'success'
        }));
    }

}

