import { LightningElement } from 'lwc';

export default class ChildLifeHooks extends LightningElement {
    connectedCallback() {
        console.log("child connected callback");
        throw new Error("this is error occurred in child");
    }
}