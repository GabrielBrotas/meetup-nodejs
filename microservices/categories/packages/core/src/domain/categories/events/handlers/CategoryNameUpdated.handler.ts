import { IEventHandle } from "./event-handler.interface";
import { INotificationProducerProvider } from "domain/@shared/providers/notification.interface";
import { DomainEvents } from "domain/@shared/events";
import { CategoryEvents } from "../events";

export class CategoryNameUpdated
  implements IEventHandle<CategoryEvents.CategoryNameUpdated>
{
  private notificationProvider: INotificationProducerProvider;

  constructor(_notificationProvider: INotificationProducerProvider) {
    this.notificationProvider = _notificationProvider;
  }

  setupSubscriptions(): void {
    DomainEvents.registerDomainEventHandler(
      this.onCategoryNameUpdated.bind(this),
      CategoryEvents.CategoryNameUpdated.name
    );
    console.log("CategoryNameUpdated subscribed successfully");
  }

  private async onCategoryNameUpdated(
    event: CategoryEvents.CategoryNameUpdated
  ): Promise<void> {
    try {
      await this.notificationProvider.sendMessage({
        topic: "category.name_updated",
        message: {
          dataTimeOccurred: event.dataTimeOccurred,
          ...event.eventData,
        },
      });
    } catch (err) {
      console.log("error on sending message = ", err);
    }
  }
}
