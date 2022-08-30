import { IDomainEvent } from "domain/@shared/events/event.interface";

export namespace CategoryEvents {
    
    export class CategoryUpdated implements IDomainEvent {
        public dataTimeOccurred: Date;
        public eventData: Record<string, string>;
    
        constructor(id: string, name: string) {
            this.dataTimeOccurred = new Date();
            this.eventData = {
                id,
                name
            };
        }    
    }

}
