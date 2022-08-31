import { Entity } from "../entity";
import { IDomainQueue } from "./domain-queue.interface";
import { IDomainEvent } from "./event.interface";

export abstract class EventHandler<T> extends Entity<T> {
  private _domainEvents: { [eventName: string]: IDomainEvent } = {};

  addDomainEvent(event: IDomainEvent): void {
    const eventName = event.constructor.name;

    this._domainEvents[eventName] = event;
  }

  deleteDomainEvent(eventName: string): void {
    if (!this._domainEvents[eventName]) return;
    delete this._domainEvents[eventName];
  }

  async commitDomainEvents(provider: IDomainQueue): Promise<void> {
    for (const eventName of Object.keys(this._domainEvents)) {
      const metadata = this._domainEvents[eventName];

      await provider.save(eventName, metadata);
    }
  }

  get domainEvents(): { [eventName: string]: IDomainEvent } {
    return this._domainEvents;
  }
}
