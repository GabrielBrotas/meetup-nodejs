
import { IDomainEvent } from "domain/@shared/events/event.interface";

export interface IEventHandle<IDomainEvent> {
  setupSubscriptions(): void;
}