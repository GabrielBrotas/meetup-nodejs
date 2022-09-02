import { Consumer, Kafka, logCreator, logLevel, Producer, ProducerBatch } from 'kafkajs'
import { INotificationConsumerProvider, INotificationMessage } from './notification-provider.interface'

export class NotificationConsumerProvider implements INotificationConsumerProvider {
  private consumer: Consumer

  constructor(groupId: string, brokers: string[]) {
    this.consumer = this.createConsumer(groupId, brokers)
    this.start()
  }

  public async start(): Promise<void> {
    try {
      console.log('starting consumer')
      await this.consumer.connect()
    } catch (error) {
      console.log('Error connecting the producer: ', error)
    }
  }

  public async shutdown(): Promise<void> {
    await this.consumer.disconnect()
  }

  public async listen(topic: string, callback: (message: INotificationMessage) => Promise<void>): Promise<void> {
    await this.consumer.subscribe({ topics: [topic], fromBeginning: true,  })
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        console.log('message received')
        console.log(JSON.parse(message.value.toString()))
        await callback(JSON.parse(message.value.toString()))
          .catch(err => {console.log(`error = `, err)})
      },
  })
  }

  private createConsumer(groupdId: string, brokers: string[]): Consumer {
    const kafka = new Kafka({
      clientId: groupdId,
      brokers,
      retry: {
        retries: 3
      },
      logLevel: logLevel.INFO,
    })


    return kafka.consumer({
      groupId: groupdId,
      allowAutoTopicCreation: true,
      retry: {
        retries: 3,
      },
    })
  }

}
