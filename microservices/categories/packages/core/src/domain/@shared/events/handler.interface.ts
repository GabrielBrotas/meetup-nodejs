import { IDomainEvent } from "./event.interface";

export interface IHandle<IDomainEvent> {
  setupSubscriptions(): void;
}