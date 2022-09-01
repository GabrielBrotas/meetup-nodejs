import { DomainEvents } from "../events";
import { IDomainEvent } from "../events/event.interface";
import { Entity } from "./entity";

export abstract class AggregateRoot<T> extends Entity<T> {

  private _domainEvents: IDomainEvent[] = [];

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent (domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEvents.markAggregateForDispatch(this);
  }

  public clearEvents (): void {
    this._domainEvents = []
  }
}