import { CategoryNameUpdated } from "domain/categories/events/handlers";
import { NotificationProducerProvider } from "../../@shared/providers";
import "dotenv/config";

const kafkaBrokers = process.env.kafka_brokers
  ? process.env.kafka_brokers.split(",")
  : undefined;
const clientId = process.env.kafka_clientID;

const notificationProvider = new NotificationProducerProvider(
  clientId,
  kafkaBrokers
);

const categoryNameUpdated = new CategoryNameUpdated(notificationProvider);
categoryNameUpdated.setupSubscriptions();
