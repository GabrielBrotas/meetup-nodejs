import { Consumer, Kafka, logCreator, logLevel, Producer, ProducerBatch } from 'kafkajs'
import { INotificationConsumerProvider, INotificationMessage } from './notification-provider.interface'

export class NotificationConsumerProvider implements INotificationConsumerProvider {
  private consumer: Consumer
  isRunning: boolean = false

  constructor(groupId: string, brokers: string[]) {
    this.consumer = this.createConsumer(groupId, brokers)
  }

  public async start(): Promise<void> {
    if(!this.consumer) return
    try {
      console.log('starting consumer')
      await this.consumer.connect()
      console.log('consumer started')
      this.isRunning = true
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

  private createConsumer(groupId: string, brokers: string[]): Consumer {
    console.log({groupId, brokers})
    if(!groupId || !brokers) {
      console.error("Invalid groupId and brokers combination.")
      return;
    }

    console.log("Creating kafka instance...")

    const kafka = new Kafka({
      clientId: groupId,
      brokers,
      retry: {
        maxRetryTime: 10000,
        initialRetryTime: 1000,
        factor: 0.2,
        multiplier: 2,
        retries: Infinity
      },
      logLevel: logLevel.INFO,
    })

    console.log("Kafka instance created")

    return kafka.consumer({
      groupId: groupdId,
      allowAutoTopicCreation: true,
      retry: {
        maxRetryTime: 10000,
        initialRetryTime: 1000,
        factor: 0.2,
        multiplier: 2,
        retries: Infinity
      }
    })
  }
}
