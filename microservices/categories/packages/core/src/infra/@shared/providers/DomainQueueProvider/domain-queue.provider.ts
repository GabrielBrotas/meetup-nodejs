import { IDomainQueue } from "domain/@shared/events/domain-queue.interface";
import { Queue } from "bullmq";

export class EventingProvider implements IDomainQueue {
  async save(queueName: string, metadata: Record<string, any>): Promise<void> {
    const myQueue = new Queue('foo')
    
  }
}
