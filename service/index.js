const fastify = require('fastify')({logger: true});
const cors = require('@fastify/cors')
const {sequelize} = require('./config/db');
const Consumer = require('./task-queue-management/consumer/consumer')

fastify.register(cors);
fastify.register(require('./routes/user'), {prefix: '/api/user'});
fastify.register(require('./routes/meet-details'), {prefix: '/api/meet'});

fastify.get("/",async (req, res)=>{
    res.send("Welcome")
})

fastify.listen({ port: 3000 },async () => {
    try {
        await sequelize.authenticate()
        Consumer.listenConsumer()
        console.log("Connection successfull");
    } catch (error) {
        fastify.log.error(error)
    }
    console.log("port running at 3000");
})
