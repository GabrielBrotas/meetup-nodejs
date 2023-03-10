export type INotificationMessage = Record<string, any>

export interface INotificationConsumerProvider {
  listen(
    topic: string, 
    handler: (message: INotificationMessage) => Promise<void>
  ): Promise<void>
}
