import 'dotenv/config'

export const notificationConfig = {
  kafkaBrokers: process.env.kafka_brokers ? process.env.kafka_brokers.split(',') : undefined,
  groupId: process.env.kafka_groupId
} 