import { INotificationProducerProvider, ISendMessageDTO } from 'domain/@shared/providers/notification.interface'
import { Kafka, logLevel, Producer } from 'kafkajs'

export class NotificationProducerProvider implements INotificationProducerProvider {
  private producer: Producer
  isRunning: boolean = false

  constructor(clientId: string, brokers: string[]) {
    this.producer = this.createProducer(clientId, brokers)
    this.start()
  }

  public async start(): Promise<void> {
    if(!this.producer) return
    try {
      console.log("Trying to connect producer")
      await this.producer.connect()
      console.log("Producer connected")

      this.isRunning = true
    } catch (error) {
      console.log('Error connecting the producer: ', error)
      this.isRunning = false
    }
  }

  public async shutdown(): Promise<void> {
    await this.producer.disconnect()
    this.isRunning = false
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
    console.log({clientId, brokers})
    if(!clientId || !brokers) {
      console.error("Invalid clientId and brokers combination.")
      return;
    }

    console.log("Creating kafka instance...")
    const kafka = new Kafka({
      clientId,
      brokers,
      retry: {
        maxRetryTime: 10000,
        initialRetryTime: 1000,
        factor: 0.2,
        multiplier: 2,
        retries: Infinity
      },
      logLevel: logLevel.ERROR,
    })
    console.log("Kafka instance created")

    return kafka.producer()
  }

}
