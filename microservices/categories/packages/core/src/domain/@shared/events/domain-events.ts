import { AggregateRoot } from "../entity/aggregate-root";
import { IDomainEvent } from "./event.interface";

export class DomainEvents {
  private static markedAggregates: AggregateRoot<any>[] = [];
  public static handlersMap = {};

  public static findMarkedAggregateByID(id: string): AggregateRoot<any> {
    return this.markedAggregates.find(aggregate => aggregate.id == id);
  }

  public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    const isAggregateInMarkedToDispatch = !!this.findMarkedAggregateByID(aggregate.id);

    if (!isAggregateInMarkedToDispatch) {
      this.markedAggregates.push(aggregate);
    }
  }

  public static registerDomainEventHandler(
    callback: (event: IDomainEvent) => void, 
    eventClassName: string
  ): void {
      
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = [];
    }
    this.handlersMap[eventClassName].push(callback);
  }

  private static removeAggregateFromMarkedDispatchList(aggregate: AggregateRoot<any>): void {
    const index = this.markedAggregates
      .findIndex((a) => a.id == aggregate.id);

    this.markedAggregates.splice(index, 1);
  }

  public static dispatchEventsForAggregateId(id: string): void {
    const aggregate = this.findMarkedAggregateByID(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  private static dispatchAggregateEvents (aggregate: AggregateRoot<any>): void {
    aggregate.domainEvents.forEach((event: IDomainEvent) => this.dispatch(event));
  }

  private static dispatch (event: IDomainEvent): void {
    const eventClassName: string = event.constructor.name;

    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: any[] = this.handlersMap[eventClassName];
      for (let handler of handlers) {
        handler(event);
      }
    }
  }

  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  public static clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

}