const { Bullclient } = require('../client/client')

class Consumer {

    static async listenConsumer() {
        try {
            const queue = await Bullclient.createClient('create-user-detail')
            queue.connection.process(async (job) => {
                console.log(job.data);

                new Promise((res) => {
                    setTimeout(() => {
                        console.log("HELLO");
                    }, 5000)
                })
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Consumer;