const mutations = {
    SET_CURRENT_USER(state, user){
        state.currentUser = user;
    },
    SET_USERS_DATA(state, userData){
        state.allUsers = userData
    },
    SET_ALL_USERS_NAME(state, userData){
        state.allUserName = userData
    },
    SET_UPCOMMING_MEET(state, meetData){
        state.upCommingMeet = meetData
    },
    SET_ONGOING_MEET(state, meetData){
        state.ongingMeet = meetData
    },
    SET_COMPLETED_MEET(state, meetData){
        state.completedMeet = meetData;
    }
}

export default mutations;