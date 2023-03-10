
export interface IListenerHandler {
  listen(topic: string): Promise<void>
}