type ITopicTypes = 'category.name_updated'

export type ISendMessageDTO = {
  topic: ITopicTypes;
  message: Record<string, any>;
  headers?: Record<string, any>;
}

export interface IEventingProvider {
  sendMessage(data: ISendMessageDTO): Promise<void>;
}