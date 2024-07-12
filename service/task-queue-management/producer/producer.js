const { Bullclient } = require('../client/client')

class Producer {
  constructor(producer) {
    this.producer = producer;
  }

  static async insertJob(queueName, data) {
    try {
      const queue = await Bullclient.createClient(queueName)
      queue.connection.add(data, {
        attempts: 1,
        priority: 2,
        backoff: 0,
      })
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Producer;