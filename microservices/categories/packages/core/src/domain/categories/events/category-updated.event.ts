import { IEvent } from "domain/@shared/events/event.interface";

export class ProductCreatedEvent implements IEvent {
    dataTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }    
}