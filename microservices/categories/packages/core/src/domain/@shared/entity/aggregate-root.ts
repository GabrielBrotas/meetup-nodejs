import { IDomainEvent } from "../events/event.interface";
import { Entity } from "./entity";

export abstract class AggregateRoot<T> extends Entity<T> {

    private _domainEvents: IDomainEvent[] = [];
  
    get domainEvents(): IDomainEvent[] {
      return this._domainEvents;
    }
  
    protected addDomainEvent (domainEvent: IDomainEvent): void {
      this._domainEvents.push(domainEvent);
      
      // Add this aggregate instance to the DomainEventHandler's list of
      // 'dirtied' aggregates 
      //   DomainEvents.markAggregateForDispatch(this);
    }
  
    public clearEvents (): void {
      this._domainEvents = []
    }
  
    // private logDomainEventAdded (domainEvent: IDomainEvent): void {
    // }
}