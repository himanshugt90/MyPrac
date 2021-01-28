import { LightningElement,wire ,track} from 'lwc';
import getAccounts from '@salesforce/apex/handleDataTable.fetchData';
import deleteAccounts from '@salesforce/apex/handleDataTable.deleteData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Delete', name: 'delete' },
];
const columns = [
    { label: 'Name', fieldName: 'Name' },
    // { label: 'Website', fieldName: 'website', type: 'url' },
    // { label: 'Phone', fieldName: 'phone', type: 'phone' },
    // { label: 'Balance', fieldName: 'amount', type: 'currency' },
    // { label: 'Close At', fieldName: 'closeAt', type: 'date' },
    // {
    //     type: 'action',
    //     typeAttributes: { rowActions: actions },
    // },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];


export default class LightningDataTableDemo extends LightningElement {

    @track dataList=[];
    @track columnsList=columns;
    selectedTableRows=[];
    accountsIds=[];
    bulkAccountIds=[];
    
    connectedCallback(){
        this.getAccountsData();
    }
    
    handleRowAction(event){
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        
        console.log("click on row "+ actionName);
        switch (actionName) {
            case 'delete':
                this.deleteRow(row);
                break;
        
            default:
                break;
        }
    }

    getSelectedRecords(event){
        const selectedRows = event.detail.selectedRows;
        console.log("selected row - "+ JSON.stringify(selectedRows));

        for(let i=0;i<selectedRows.length;i++){
            this.selectedTableRows.push(selectedRows[i].Id);
        }
    }

    getAccountsData(){
        getAccounts()
            .then(result => {

                this.dataList=result;
                console.log("data loaded");
            })
            .catch(error => {
                console.error("error -- "+error);
            });
    }

    deleteRow(row){
        console.log(JSON.stringify(row));
        this.accountsIds.push(row.Id);

        console.log("row is going to delete - "+ JSON.stringify(this.accountsIds));
        this.handleDeleteAccount(this.accountsIds);

        
    }

    handleBulkDelete(){
        this.handleDeleteAccount(this.selectedTableRows);
    }

    handleDeleteAccount(accounts){
        deleteAccounts({ids: accounts})
            .then(result => {
                console.log("deleted - " + JSON.stringify(result));
                console.log("refreshing data in table");

                let deleteAcc=[];
                let errorAcc=[];
                
                if(result){
                    if(result.succuess.length>0){
                        this.dispatchEvent(new ShowToastEvent({
                            title: 'Successfull Deleted',
                            message: JSON.stringify(result.succuess),
                            variant: 'success'
                        }));
                    }
                    if(result.error.length>0){
                        this.dispatchEvent(new ShowToastEvent({
                            title: 'Error in delete',
                            message: JSON.stringify(result.error),
                            variant: 'error'
                        }));
                    }
                }
                
                this.selectedTableRows=[];
                this.accountsIds=[];
                this.getAccountsData();
            })
            .catch(error => {
                console.error("error -- "+error);
            });
    }
}