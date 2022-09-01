import { IEventHandle } from "./event-handler.interface";
import { INotificationProvider } from "domain/@shared/providers/notification.interface";
import { DomainEvents } from "domain/@shared/events";
import { CategoryEvents } from '../events'

export class GategoryNameUpdated implements IEventHandle<CategoryEvents.CategoryNameUpdated> {
  private notificationProvider: INotificationProvider;

  constructor (_notificationProvider: INotificationProvider) {
    this.setupSubscriptions();
    this.notificationProvider = _notificationProvider;
  }

  setupSubscriptions(): void {
    DomainEvents.registerDomainEventHandler(this.onCategoryNameUpdated.bind(this), CategoryEvents.CategoryNameUpdated.name);
    console.log("GategoryNameUpdated subscribed successfully")
  }

  private async onCategoryNameUpdated(event: CategoryEvents.CategoryNameUpdated): Promise<void> {
    try {
      await this.notificationProvider.sendMessage({ 
        topic: 'category.name_updated',
        message: {
          dataTimeOccurred: event.dataTimeOccurred,
          ...event.eventData, 
        }
      })
    } catch (err) {
      console.log('error on sending message = ', err)
    }
  }
}