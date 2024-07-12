const {redisConfig} = require('../../config/redis-config')
const Bull = require('bull');

class Bullclient {
    constructor(queueName){
        this.queueName = queueName,
        this.connection = new Bull(this.queueName, redisConfig)
    }

    static async createClient(queueName){
        return new Bullclient(queueName)
    }
}

module.exports = {Bullclient}