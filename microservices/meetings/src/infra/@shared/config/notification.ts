import 'dotenv/config'

export const notificationConfig = {
  kafkaBrokers: process.env.kafka_brokers.split(','),
  clientId: process.env.kafka_clientID
} 