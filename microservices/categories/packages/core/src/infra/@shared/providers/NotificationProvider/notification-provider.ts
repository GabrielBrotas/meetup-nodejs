import { INotificationProvider, ISendMessageDTO } from 'domain/@shared/providers/notification.interface'
import { Kafka, logCreator, logLevel, Producer, ProducerBatch } from 'kafkajs'

export class NotificationProvider implements INotificationProvider {
  private producer: Producer

  constructor(clientId: string, brokers: string[]) {
    this.producer = this.createProducer(clientId, brokers)
  }

  public async start(): Promise<void> {
    try {
      await this.producer.connect()
    } catch (error) {
      console.log('Error connecting the producer: ', error)
    }
  }

  public async shutdown(): Promise<void> {
    await this.producer.disconnect()
  }

  public async sendMessage({ topic, message, headers }: ISendMessageDTO): Promise<void> {
    await this.producer.send({
      topic,
      messages: [
        { 
          value: JSON.stringify(message),
          headers: headers ? headers : {},
        },
      ]
    })
  }

  private createProducer(clientId: string, brokers: string[]) : Producer {
    const kafka = new Kafka({
      clientId,
      brokers,
    })

    return kafka.producer()
  }

}
