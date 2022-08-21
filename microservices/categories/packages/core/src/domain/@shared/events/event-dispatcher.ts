import { IEventDispatcher } from "./event-dispatcher.interface";
import { IEventHandler } from "./event-handler.interface";
import { IEvent } from "./event.interface";

export class EventDispatcher implements IEventDispatcher {
    private _eventHandlers: { [eventName: string]: IEventHandler[] } = {};

    notify(event: IEvent): void {
        const eventName = event.constructor.name;

        if(!this._eventHandlers[eventName]) return;

        this._eventHandlers[eventName].forEach(eventHandler => {
            eventHandler.handle(event);
        })
    }

    register(eventName: string, eventHandler: IEventHandler<IEvent>): void {
        if(!this._eventHandlers[eventName]) {
            this._eventHandlers[eventName] = []
        }

        this._eventHandlers[eventName].push(eventHandler)
    }

    unregister(eventName: string, eventHandler: IEventHandler<IEvent>): void {
        if(!this.eventHandlers[eventName]) return;
        const indexOfEvent = this.eventHandlers[eventName].indexOf(eventHandler);
        
        if(indexOfEvent == -1) return;
        this.eventHandlers[eventName].splice(indexOfEvent, 1);
    }

    unregisterAll(): void {
        this._eventHandlers = {}
    }

    get eventHandlers(): { [eventName: string]: IEventHandler[] } {
        return this._eventHandlers
    }

}