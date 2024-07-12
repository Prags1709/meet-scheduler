
<template>
    <InfoPopup v-if="isPopup" :info="notification"/>
    <div style="width: 25%;" class="form-wrapper login-box">
        <h1>LOGIN HERE</h1>
        <form @submit.prevent="login">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password">
            <button type="submit">Login</button>
        </form>
    </div>
</template>
  
<script >
import InfoPopup from '../components/InfoPopup.vue';

export default {
    data() {
        return {
            email: '',
            password: '',
            notification: {},
            isPopup: false,
        };
    },
    methods: {
        async login() {
            if (this.email && this.password) {
                try {
                    const loginData = { email: this.email, password: this.password };
                    await this.$store.dispatch('loginUser', loginData);
                    this.isPopup = true;
                    this.notification = {msg:'Login successful...', popupColor:'rgb(28, 182, 74)'}
                    setTimeout(()=>{
                        this.isPopup = false;
                        this.$router.push('/home/calendar');
                    },1000)
                }
                catch (error) {
                    console.error(error);
                    this.isPopup = true;
                    this.notification = {msg:'Failed to Login, Please check you Email and Password', popupColor:'rgb(235, 73, 73)'}
                    setTimeout(()=>{
                        this.isPopup = false;
                    },1500)
                }
            }
            else {
                alert("Please fill in both email and password.");
            }
        }
    },
    components: { InfoPopup }
}
</script>

<style>
.login-box {
    height: 280px;
}
</style>