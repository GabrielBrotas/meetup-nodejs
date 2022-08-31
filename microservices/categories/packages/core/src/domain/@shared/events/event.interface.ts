export abstract class IDomainEvent {
  public dataTimeOccurred: Date;
  public eventData: Record<string, string>;

  constructor(metadata: Record<string, string>) {
    this.dataTimeOccurred = new Date();
    this.eventData = metadata;
  }
}
