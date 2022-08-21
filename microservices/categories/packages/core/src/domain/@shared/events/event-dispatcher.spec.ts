import { EventDispatcher } from "./event-dispatcher";
import { IEventHandler } from "./event-handler.interface";
import { IEvent } from "./event.interface";

class StubEventDispatcher implements IEventHandler {
    handle(event: IEvent): void {}
}

class StubEvent implements IEvent {
    dataTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    } 
}

describe("Domain Events Test", () => {

    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new StubEventDispatcher();

        eventDispatcher.register("CategoryCreatedEvent", eventHandler);

        expect(eventDispatcher.eventHandlers["CategoryCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.eventHandlers["CategoryCreatedEvent"].length).toBe(1);

        expect(eventDispatcher.eventHandlers["CategoryCreatedEvent"][0]).toMatchObject(eventHandler);
    })

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new StubEventDispatcher();

        eventDispatcher.register("CategoryCreatedEvent", eventHandler);
        expect(eventDispatcher.eventHandlers["CategoryCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("CategoryCreatedEvent", eventHandler);

        expect(eventDispatcher.eventHandlers["CategoryCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.eventHandlers["CategoryCreatedEvent"].length).toBe(0);
    })

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new StubEventDispatcher();

        eventDispatcher.register("CategoryCreatedEvent", eventHandler);
        expect(eventDispatcher.eventHandlers["CategoryCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.eventHandlers["CategoryCreatedEvent"]).toBe(undefined);
    })

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new StubEventDispatcher();
        
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("StubEvent", eventHandler);

        const categoryUpdatedEvent = new StubEvent({});
    
        eventDispatcher.notify(categoryUpdatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler).toHaveBeenCalledTimes(1);
    })
})