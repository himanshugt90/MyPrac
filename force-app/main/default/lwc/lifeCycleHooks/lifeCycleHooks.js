import { LightningElement } from 'lwc';
// import template1 from './lifeCycleHooks.html';
// import template2 from './lifeCycleHooks2.html';
export default class LifeCycleHooks extends LightningElement {
    temp='temp1';
    constructor(){
        super();
        console.log("parent constructor");
    }
    
    connectedCallback() {
        console.log("parent connected callback");
    }

    renderedCallback(){
        console.log("parent render callback");
    }
    // render(){
    //     console.log("parent render");
    //     if(this.temp==='temp1'){
    //         return template1;
    //     }else if(this.temp==='temp2'){
    //         return template2;
    //     }
    // }
    disconnectedCallback() {
        console.log("parent disconnected");
    }
    handleClick(){
        if(this.temp==='temp1'){
            this.temp='temp2';
        }else if(this.temp==='temp2'){
            this.temp='temp1';
        }
    }
    errorCallback(error,stack){
        console.log("error callback");
        alert("error caught - "+error);
    }
}