import { CategoryNameUpdatedListener } from "application/meeting/listeners/category-name-updated.handler";
import { notificationConfig } from "infra/@shared/config/notification";
import { NotificationConsumerProvider } from "infra/@shared/providers/NotificationProvider/notification-provider";
import { MeetingRepository } from "infra/meetings/repository/sequelize";

export function setupMeetingListeners() {
  const meetingsRepository = MeetingRepository.getInstance()

  const notificationConsumerProvider = new NotificationConsumerProvider(
    notificationConfig.clientId, 
    notificationConfig.kafkaBrokers
  )
  
  new CategoryNameUpdatedListener(meetingsRepository, notificationConsumerProvider).listen()
}
