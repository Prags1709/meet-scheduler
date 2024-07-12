const {User} = require("../sequelize/models");
const UserValidator = require("../validator/user-validator");
const UserPresenter = require('../presenter/user-presenter');
const Producer = require('../task-queue-management/producer/producer')
const {queueNames} = require('../task-queue-management/constent/queueNames')

class UserController {
    static async list(req, res, next){
        try {
            const queryParams = req.query;
            const filterValidation = new UserValidator('list');
            if(!filterValidation.validate(queryParams)){
                res.code(400).send({ errors: filterValidation.errors });
            }else{
                const usersData = []
                const usersList = await User.getAllUser(queryParams);
                usersList.forEach((userListData) => {
                    usersData.push(new UserPresenter(userListData).toJSON())
                })
                res.send({data: usersData})
            }
        } catch (error) {
            logger.error(error)
        }
    }

    static async getUserName(req, res, next){
        try {
            const queryParams = req.query;
            const filterValidation = new UserValidator('list');
            if(!filterValidation.validate(queryParams)){
                res.code(400).send({ errors: filterValidation.errors });
            }else{
                const data = queryParams;
                const userData = [];
                const userList = await User.getUserNameWithoutCurrentUser(data);
                userList.forEach((user) => {
                    userData.push(new UserPresenter(user).toJSONNameAndId())
                })
                res.send({data: userData});
            }
        } catch (error) {
            console.error(error);
        }
    }

    static async createUser(req, res, next){
        try {
            const queryParams = req.query;
            const payload = req.body
            const filterValidation = new UserValidator('list');
            if(!filterValidation.validate({...queryParams, ...payload})){
                res.code(400).send({ errors: filterValidation.errors });
            }else{
                const data = { ...payload , created_at:new Date(), updated_at:new Date()}
                await User.createUser(data)
                res.code(201).send({message: "user data has been created"})
            }
        } catch (error) {
            logger.error(error)
        }
    }

    static async loginUser(req, res, next){
        try {
            const queryParams = req.query;
            const payload = req.body
            const filterValidation = new UserValidator('list');
            if(!filterValidation.validate({...queryParams, ...payload})){
                res.code(400).send({ errors: filterValidation.errors });
            }else{
                const userList = await User.fineUserByEmailAndPassword(payload);
                const userData = new UserPresenter(userList).toJSON()
                res.send({data: userData})
            }
        } catch (error) {
            logger.error(error)
        }
    }

    static async updateUser(req, res, next){
        try {
            const queryParams = req.query;
            const payload = req.body;
            const filterValidation = new UserValidator('list');
            if(!filterValidation.validate({...queryParams, ...payload})){
                res.code(400).send({ errors: filterValidation.errors });
            }else{
                await User.updateUserData({...payload, updated_at:new Date()}, queryParams)
                res.send({message: `${queryParams.user} data has been updated`})
            }
        } catch (error) {
            logger.error(error)
        }
    }

    static async deleteUser(req, res, next){
        try {
            const id = req.params.id;
            const queryParams = {id};
            const filterValidation = new UserValidator('list');
            if(!filterValidation.validate(queryParams)){
                res.code(400).send({ errors: filterValidation.errors });
            }else{
                await User.deleteUserById(id)
                res.send({message: `user data has been deleted`})
            }
        } catch (error) {
            logger.error(error)
        }
    }

    static async doerCreateUser(req, res, next){
        try {
            const queryParams = req.query;
            const payload = req.body
            console.log('payload: ', payload);
            // const filterValidation = new UserValidator('list');
            // if(!filterValidation.validate({...queryParams, ...payload})){
            //     res.code(400).send({ errors: filterValidation.errors });
            // }else{
            //     const options = {
            //       priority:1,
            //       attempts: 1,
            //     };
            //     //await Producer.insertJob(payload, options)
            //     await Producer.insertJob('create-user-detail', payload)
            //     res.code(201).send({message: "Job added successfully"})
            // }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserController