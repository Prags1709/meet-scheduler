<template>
  <div>
    <nav class="navbar">
      <img src="../assets/communication.png" alt="">
      <div class="route-box">
          <router-link v-if="isAdmin" to="/home/user">User</router-link>
          <router-link to="/home/scheduleMeet">Schedule Meet</router-link>
          <router-link to="/home/calendar">Calendar</router-link>
      </div>
      <div class="user-info">
        <li>
          <div class="user-name"><h1>{{ currentUser.name[0] }}</h1></div>
          <ul class="tooltip">
            <li><p class="current-user-name">Hi, {{ currentUser.name }}</p></li>
            <li><button @click="logout" class="logout">LOGOUT</button></li>
          </ul>
        </li>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data(){
    return {
      currentUser: this.$store.state.currentUser,
    }
  },
  computed: {
    isAdmin(){
      return this.currentUser.role == "ADMIN"
    }
  },
  methods: {
    logout(){
      if(confirm('Are you sure, Do you want to Logout?')){
        this.$router.push('/');
      }
    }
  }
};
</script>

<style>
nav {
  display: flex;
  align-items: center;
  background-color: black;
  padding: 10px;
  margin-bottom: 20px;
  position: relative;
}

nav .route-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

nav a.router-link-exact-active {
  color: aqua;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  font-size: large;
}

nav img {
  width: 50px;
  cursor: pointer;
}

nav .user-info {
  position: absolute;
  right: 15px;
}

nav .user-info li{
  list-style: none;
  padding: 2px;
  position: relative;
}

nav .user-name {
  border: none;
  color: white;
  cursor: pointer;
  background-color: white;
  width: 40px;
  height: 40px;
  color: red;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tooltip {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(213, 218, 219);
  color: black;
  position: absolute;
  right: 0;
  top: 45px;
  padding: 25px;
  visibility: hidden;
  border-radius: 5px;
  z-index: 999;
}

li:hover ul.tooltip {
  visibility: visible;
}

.tooltip .current-user-name {
  margin-bottom: 10px;
  font-size: medium;
}

.tooltip .logout {
  margin: 0%;
  background-color: black;
  color: white;
  padding: 5px 8px;
  border-radius: 5px;
  cursor: pointer;
}

.tooltip .logout:hover {
  background-color: rgb(53, 51, 51);
}

a,
.green {
  text-decoration: none;
  color: white;
  transition: 0.4s;
  font-weight: 600;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}
</style>