import { AggregateRoot } from "../../entity/aggregate-root";
import { IDomainEvent } from "../event.interface";
import { DomainEvents } from '../domain-events'

class StubDomainEvent extends IDomainEvent {}

class StubEntity extends AggregateRoot<{prop1: string}> {
  update() {
    this.addDomainEvent(new StubDomainEvent({prop1: 'test'}))
  }
}


describe("Domain Events Unit Tests", () => {

  beforeEach(() => {
    DomainEvents.clearHandlers()
    DomainEvents.clearMarkedAggregates()
  })

  it("should mark aggregator to dispatch", () => {
    const arrange = { prop1: "prop1 value" };
    const entity = new StubEntity(arrange);

    entity.update()

    expect(entity.domainEvents.length).toBe(1);

    const entityToDispatch = DomainEvents.findMarkedAggregateByID(entity.id)
    expect(entityToDispatch).toEqual(entity)
  });

  it("should register domain event handler", () => {
    const callback = (event) => {console.log(event)} 
    DomainEvents.registerDomainEventHandler(
      callback,
      StubDomainEvent.name
    )

    expect(DomainEvents.handlersMap[StubDomainEvent.name].length).toBe(1)
    expect(DomainEvents.handlersMap[StubDomainEvent.name][0]).toEqual(callback)
  });

  it("should dispatch events handler", () => {
    const arrange = { prop1: "prop1 value" };
    const entity = new StubEntity(arrange);
    entity.update()

    const callback = jest.fn() 

    DomainEvents.registerDomainEventHandler(
      callback,
      StubDomainEvent.name
    )

    DomainEvents.dispatchEventsForAggregateId(entity.id)

    expect(callback).toBeCalled()
    expect(DomainEvents.handlersMap[StubDomainEvent.name].length).toBe(1)
    expect(entity.domainEvents.length).toEqual(0)

    

  })
});
