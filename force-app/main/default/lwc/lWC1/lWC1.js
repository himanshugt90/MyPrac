import { LightningElement,track,wire } from 'lwc';
import {
    MessageContext,
    publish,
    subscribe,
    unsubscribe
} from 'lightning/messageService';
import SampleMessageDemo from '@salesforce/messageChannel/SampleMessageChannel__c';

/* https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_salesforce_modules */
export default class LWC1 extends LightningElement {

    @wire(MessageContext)
    messageContext;
    @track message = [];
    subscription=null;

    connectedCallback(){
        if(!this.subscription){
            this.subscription=subscribe(this.messageContext,
                SampleMessageDemo,
                (message) => this.handleMessage(message)
                );
        }
    }
    handleMessage(message){
        console.log("lwc 1 "+message.value1);
        this.message.push(
            {
                Id: this.message.length,
                value:message.value1,
                from:'LWC2'
            }
        );
    }

    handleClick(){
        let innerHtml=this.template.querySelector('lightning-input');
        this.message.push(
                {
                    Id: this.message.length,
                    value:innerHtml.value,
                    from:'LWC1'
                }
            );
         let payLoad={
             value:innerHtml.value
         }   
        publish(this.messageContext,SampleMessageDemo,payLoad);
        
        innerHtml.value=undefined;
    }

    disconnectedCallback() {
        this.unSubscribeChannel();
    }
    unSubscribeChannel(){
        unsubscribe(this.subscription);
        this.subscription=null;
    }
}