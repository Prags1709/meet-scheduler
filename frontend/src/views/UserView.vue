<template>
  <div class="user-page">
    <div class="background-blur-box" v-if="isUserCreating"></div>
    <div class="user-info">
      <h3>TOTAL USERS:{{ totalUsers }}</h3>
      <button class="create-user-btn" @click="openUserCreateBox" style="font-weight: 600;">CREATE USER</button>
    </div>
    <InfoPopup v-if="isPopup" :info="notification" />
    <div class="form-wrapper create-user-popup" v-if="isUserCreating">
      <h3>CREATE NEW USER</h3>
      <div @click="closeBox" class="close">
        <img src="../assets/close.png" alt="cancel">
      </div>
      <form @submit.prevent="createNewUser">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password">
        <label for="role">Role:</label>
        <input type="text" id="role" v-model="role">
        <button type="submit">CREATE</button>
      </form>
    </div>
    <table>
      <thead>
        <th>NAME</th>
        <th>EMAIL</th>
        <th>ROLE</th>
        <th>UPDATE</th>
        <th>DELETE</th>
      </thead>
      <tbody>
        <UserTable v-for="(user, index) in userData" :key="index + user.id" :user="user"
          :setUsersDatafunction="setUsersData" />
      </tbody>
    </table>
  </div>
</template>

<script>
import InfoPopup from '../components/InfoPopup.vue';
import UserTable from '../components/UserTable.vue';
import { mapGetters } from 'vuex'

export default {
  components: { UserTable, InfoPopup },
  data() {
    return {
      userData: [],
      currentUser: this.$store.state.currentUser,
      isUserCreating: false,
      name: '',
      email: '',
      password: '',
      role: '',
      notification: {},
      isPopup: false,
    };
  },
  mounted() {
    this.setUsersData();
  },
  computed: {
    ...mapGetters({
      totalUsers: 'numberOfUsers'
    })
  },
  methods: {
    async setUsersData() {
      this.currentUser = {
        ...this.currentUser,
        name: (this.$store.state.currentUser.name).toLowerCase(),
      }
      await this.$store.dispatch('getUsersData', this.currentUser);
      this.userData = this.$store.state.allUsers;
    },
    openUserCreateBox() {
      this.isUserCreating = true
    },
    closeBox() {
      this.isUserCreating = false
    },
    async createNewUser() {
      if (this.name && this.email && this.password && this.role) {
        try {
          const newUserData = {
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role
          }

          await this.$store.dispatch('createUser', newUserData)
          this.isUserCreating = false;
          this.isPopup = true;
          this.notification = { msg: 'User Created successfully...', popupColor: 'rgb(28, 182, 74)' }
          setTimeout(() => {
            this.isPopup = false;
          }, 1000)
          this.name = '';
          this.email = '';
          this.password = '';
          this.role = ''
          this.setUsersData();
        } catch (error) {
          console.error(error);
          alert("Failed to create user, try again")
        }
      } else {
        alert("Please fill all the details")
      }
    }
  },

}
</script>
  
<style>
table {
  width: 80%;
  margin: auto;
  border-collapse: collapse;
}

table>thead {
  background-color: black;
  color: white;
}

table>thead>th {
  padding: 10px 0;
}

table>tbody>tr:nth-child(even) {
  background-color: lightgray;
}

table>tbody>tr>td {
  padding: 5px 0;
}

.user-page {
  text-align: center;
}

.user-page>.user-info {
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-page>.create-user-btn {
  margin-bottom: 20px;
  margin-top: 10px;
  background-color: black;
  border: none;
  color: white;
  padding: 10px 30px;
}

.user-page>.create-user-btn:hover {
  background-color: rgb(63, 60, 60);
}

.user-page>.create-user-popup {
  z-index: 999;
}

.background-blur-box {
  width: 100%;
  height: 90vh;
  background-size: cover;
  background-position: center;
  position: absolute;
  overflow: hidden;
  backdrop-filter: blur(3px);
  z-index: 998;
}
</style>
  