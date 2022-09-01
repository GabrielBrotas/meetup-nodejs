import { GategoryNameUpdated } from 'domain/categories/events/handlers';
import { NotificationProvider } from '../../@shared/providers';
import 'dotenv/config'

const kafkaBrokers = process.env.kafka_brokers.split(',')
const clientId = process.env.kafka_clientID

console.log(kafkaBrokers, clientId)

const notificationProvider = new NotificationProvider(
    clientId,
    kafkaBrokers
)

new GategoryNameUpdated(notificationProvider)
