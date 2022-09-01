import { GategoryNameUpdated } from 'domain/categories/events/handlers';
import { NotificationProvider } from '../../@shared/providers';

const kafkaBrokers = process.env.kafka_brokers.split(',')

const notificationProvider = new NotificationProvider(
    process.env.kafka_clientID,
    kafkaBrokers
)

new GategoryNameUpdated(notificationProvider)