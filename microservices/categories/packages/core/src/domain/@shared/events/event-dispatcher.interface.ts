import { IEventHandler } from "./event-handler.interface";
import { IEvent } from "./event.interface";

export interface IEventDispatcher {
    notify(event: IEvent): void;
    register(eventName: string, eventHandler: IEventHandler): void;
    unregister(eventName: string, eventHandler: IEventHandler): void;
    unregisterAll(): void;

    get eventHandlers(): { [eventName: string]: IEventHandler[] };
}