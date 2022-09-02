import { GategoryNameUpdated } from 'domain/categories/events/handlers';
import { NotificationProducerProvider } from '../../@shared/providers';
import 'dotenv/config'

const kafkaBrokers = process.env.kafka_brokers.split(',')
const clientId = process.env.kafka_clientID

console.log(kafkaBrokers, clientId)

const notificationProvider = new NotificationProducerProvider(
    clientId,
    kafkaBrokers
)

new GategoryNameUpdated(notificationProvider)
