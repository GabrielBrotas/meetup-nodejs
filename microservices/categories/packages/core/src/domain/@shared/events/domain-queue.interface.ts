export interface IDomainQueue {
    save(queueName: string, metadata: Record<string, any>): Promise<void>
}