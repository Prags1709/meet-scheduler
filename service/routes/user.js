const UserController = require("../controller/user-controller")

class clientIndex {
    static async getRoutes(fastify){
        fastify.get('/userList', UserController.list);//?currentUser=prags&id=1
        fastify.get('/getAllUserName', UserController.getUserName)//?currentUser=prags&id=1
        fastify.post('/createUser', UserController.createUser);
        fastify.post('/login', UserController.loginUser)
        fastify.put('/updateUser', UserController.updateUser); //?user=lol&userId=3
        fastify.delete('/deleteUser/:id', UserController.deleteUser)

        fastify.post('/doerCreateUser', UserController.doerCreateUser)
    }
}

module.exports = clientIndex.getRoutes;