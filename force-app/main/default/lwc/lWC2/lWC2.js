import { LightningElement ,track,wire} from 'lwc';
import {
    publish,
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext
} from 'lightning/messageService';
import sampleMessage from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class LWC2 extends LightningElement {
    
    @wire(MessageContext)
    messageContext;

    subscription = null; 

    @track message = [];

    handleClick(){
        let innerHtml=this.template.querySelector('lightning-input');
        this.message.push(
                {
                    Id: this.message.length,
                    value:innerHtml.value,
                    from:'LWC2'
                }
            );
            let payLoad={
                value1:innerHtml.value
            }  
            publish(this.messageContext,sampleMessage,payLoad); 
        innerHtml.value=undefined;
    }
    connectedCallback() {
        console.log("connected call back lwc2");
        this.subscribeToMessageChannel();
    }
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                sampleMessage,
                (message) => this.handleMessage(message)
            );
        }
    }
    handleMessage(message){
        console.log("hello sub" + message.value1);
        this.message.push(
            {
                Id: this.message.length,
                value:message.value1,
                from:'LWC1'
            }
        );
    }
    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

}