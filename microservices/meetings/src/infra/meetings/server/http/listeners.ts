import { CategoryNameUpdatedListener } from "application/meeting/listeners/category-name-updated.handler";
import { notificationConfig } from "infra/@shared/config/notification";
import { NotificationConsumerProvider } from "infra/@shared/providers/NotificationProvider/notification-provider";
import { MeetingRepository } from "infra/meetings/repository/sequelize";

export async function setupMeetingListeners() {
  const meetingsRepository = MeetingRepository.getInstance()

  const notificationConsumerProvider = new NotificationConsumerProvider(
    notificationConfig.groupId, 
    notificationConfig.kafkaBrokers
  )
  await notificationConsumerProvider.start()
  
  const categoryNameUpdatedListener = new CategoryNameUpdatedListener(meetingsRepository, notificationConsumerProvider)
  categoryNameUpdatedListener.listen()
}
