import { EventHandler } from "./domain-events";
import { IDomainEvent } from "./event.interface";

class StubEntity extends EventHandler<{ prop1: string; prop2: number }> {}

class StubDomainEvent extends IDomainEvent {}

describe("Domain Events Unit Tests", () => {
  it("should add domain event", () => {
    const arrange = { prop1: "prop1 value", prop2: 10 };
    const entity = new StubEntity(arrange);

    expect(entity.props).toStrictEqual(arrange);
    const domainEvent = new StubDomainEvent({ prop1: "new value" });
    entity.addDomainEvent(domainEvent);

    expect(Object.values(entity.domainEvents).length).toEqual(1);
    expect(entity.domainEvents["StubDomainEvent"]).toEqual(domainEvent);
  });

  it("should delete a domain event", () => {
    const arrange = { prop1: "prop1 value", prop2: 10 };
    const entity = new StubEntity(arrange);

    expect(entity.props).toStrictEqual(arrange);
    const domainEvent = new StubDomainEvent({ prop1: "new value" });
    entity.addDomainEvent(domainEvent);
    entity.deleteDomainEvent("StubDomainEvent")

    expect(Object.values(entity.domainEvents).length).toEqual(0);
    expect(entity.domainEvents["StubDomainEvent"]).toBeFalsy();
  });
});
