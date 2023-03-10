/*

  Listener
    repository
    consumer

    subscribe()
    action()

  infra
    create consumer()
    listener(repository, consumer)


*/

import { IListenerHandler } from "application/dto/listener";
import { IMeetingRepository } from "domain/meetings/repository";
import { INotificationConsumerProvider } from "infra/@shared/providers/NotificationProvider/notification-provider.interface";
import { CATEGORY_NAME_UPDATED } from "./topics";

export class CategoryNameUpdatedListener implements IListenerHandler {
  public readonly meetingsRepository: IMeetingRepository.Repository
  public readonly notificationConsumerProvider: INotificationConsumerProvider

  constructor(
    meetingsRepository: IMeetingRepository.Repository, 
    notificationConsumerProvider: INotificationConsumerProvider
  ) {
    this.meetingsRepository = meetingsRepository
    this.notificationConsumerProvider = notificationConsumerProvider
  }
  
  async listen(): Promise<void> {
    await this.notificationConsumerProvider.listen(CATEGORY_NAME_UPDATED, async (message) => {
      console.log(`update ${message.id} name to ${message.name}`)
      await this.meetingsRepository.updateCategoriesName(message.id, message.name)
      console.log('message handled successfully')
    })
  }
}