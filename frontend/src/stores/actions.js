import axios from 'axios';

const baseURL = 'http://localhost:3000/api'

const actions = {
    async loginUser({commit}, loginData){
        try {
            const res = await axios.post(`${baseURL}/user/login`, loginData)
            if(res.status == 200 && res.statusText == "OK"){
                commit('SET_CURRENT_USER', res.data.data)
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    },
    async getUsersData({commit}, currentUserdata){
        try {
            const res = await axios.get(`${baseURL}/user/userList?currentUser=${currentUserdata.name}&id=${currentUserdata.id}`)
            if(res.status == 200 && res.statusText == "OK"){
                commit('SET_USERS_DATA', res.data.data)
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    },
    async createUser({commit}, userData){
        try {
            const res = await axios.post(`${baseURL}/user/createUser`, userData)
            if(res.status !== 201){
                console.error("failed to create user");
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    },
    async getAllUserName({commit}, currentUserdata){
        try {
            const res = await axios.get(`${baseURL}/user/getAllUserName?currentUser=${currentUserdata.name}&id=${currentUserdata.id}`)
            if(res.status == 200 && res.statusText == "OK"){
                commit('SET_ALL_USERS_NAME', res.data.data)
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    },
    async updateUserData({commit}, payload){
        try {
            const {queryData ,updatedData} = payload
            const res = await axios.put(`${baseURL}/user/updateUser?user=${queryData.user}&userId=${queryData.userId}`, updatedData)
        } catch (error) {
            console.error(error);
            throw error
        }
    },
    async deleteUserData({commit}, id){
        try {
            const res = await axios.delete(`${baseURL}/user/deleteUser/${id}`)
        } catch (error) {
            console.error(error);
            throw error
        }
    },
    async createMeet({commit}, meetData){
        try {
            const res = await axios.post(`${baseURL}/meet/scheduleMeet`, meetData)
            if(res.status !== 201){
                console.error("failed to schedule meet");
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    },
    async getUpcommingMeet({commit}, currentUserdata){
        try {
            const res = await axios.get(`${baseURL}/meet/upcomming?username=${currentUserdata.name}&id=${currentUserdata.id}`)
            if(res.status == 200 && res.statusText == "OK"){
                commit('SET_UPCOMMING_MEET', res.data.data)
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    },
    async getonGoingMeet({commit}, currentUserdata){
        try {
            const res = await axios.get(`${baseURL}/meet/onGoing?username=${currentUserdata.name}&id=${currentUserdata.id}`)
            if(res.status == 200 && res.statusText == "OK"){
                commit('SET_ONGOING_MEET', res.data.data)
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    },
    async getcompletedMeet({commit}, currentUserdata){
        try {
            const res = await axios.get(`${baseURL}/meet/completed?username=${currentUserdata.name}&id=${currentUserdata.id}`)
            if(res.status == 200 && res.statusText == "OK"){
                commit('SET_COMPLETED_MEET', res.data.data)
            }
        } catch (error) {
            console.error(error);
            throw error
        }
    }
}

export default actions;