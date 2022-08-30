import { IEventHandler } from "domain/@shared/events/event-handler.interface";
import { CategoryEvents } from "./events";


export namespace CategoryHandlers {
    
    export class SendEmailWhenCategoryUpdatedHandler implements IEventHandler<CategoryEvents.CategoryUpdated> {
        handle(event: CategoryEvents.CategoryUpdated): void {
            console.log(`SendEmailWhenCategoryUpdatedHandler: ${JSON.stringify(event)}`);
        }
    }
}
