<template>
  <InfoPopup v-if="isPopup" :info="notification"/>
  <div class="form-wrapper" style="width: 30%;">
    <h1>Creater Your Meet</h1>
    <form @submit.prevent="scheduleMeet">
      <label for="subject">Add a title:</label>
      <input type="text" id="subject" v-model="subject">
      <label for="creator">Creator:</label>
      <input type="text" id="creator" readonly v-model="creator">
      <label for="userSelect">Meet with:</label>
      <select id="userSelect" v-model="meetWith">
        <option v-for="user in users" :key="user.id" :value="(user.name).toLowerCase() + -user.id">{{
          (user.name).toLowerCase() }}</option>
      </select>
      <label for="date">Date:</label>
      <input type="date" id="date" v-model="date">
      <label for="time">Start Time:</label>
      <input type="time" id="startTime" v-model="startTime" @input="updateEndTime">
      <label for="time">End Time:</label>
      <input type="time" id="endTime" v-model="endTime">
      <button type="submit">Schedule Meet</button>
    </form>
  </div>
</template>
  
<script>
import InfoPopup from '../components/InfoPopup.vue';

export default {
    data() {
        return {
            creator: (this.$store.state.currentUser.name).toLowerCase(),
            creatorId: this.$store.state.currentUser.id,
            subject: '',
            meetWith: '',
            attendeeId: 0,
            date: '',
            startTime: '',
            endTime: '',
            notification: {},
            isPopup: false,
        };
    },
    computed: {
        users() {
            return this.$store.state.allUserName;
        }
    },
    methods: {
        updateEndTime() {
            if (this.startTime) {
                const [startHours, startMinutes] = this.startTime.split(':').map(Number);
                const endHours = startHours + Math.floor((startMinutes + 30) / 60);
                const endMinutes = (startMinutes + 30) % 60;
                this.endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
            }
            else {
                this.endTime = '';
            }
        },
        async scheduleMeet() {
            if (this.creator && this.creatorId && this.subject && this.meetWith && this.date && this.startTime && this.endTime) {
                try {
                    const attendee = this.meetWith.split("-");
                    this.meetWith = attendee[0];
                    this.attendeeId = Number(attendee[1]);
                    const meetData = {
                        created_by: this.creator,
                        creater_id: this.creatorId,
                        subject: this.subject,
                        meet_with: this.meetWith,
                        attendee_id: this.attendeeId,
                        date: this.date,
                        startTime: this.startTime,
                        endTime: this.endTime
                    };
                    await this.$store.dispatch('createMeet', meetData);
                    this.isPopup = true;
                    this.notification = {msg:'Meet Created successfully...', popupColor:'rgb(28, 182, 74)'}
                    setTimeout(()=>{
                        this.isPopup = false;
                        this.$router.push('/home/calendar');
                    },1000)
                }
                catch (error) {
                    console.error(error);
                    this.isPopup = true;
                    this.notification = {msg:'Failed to create meet, try again.', popupColor:'rgb(235, 73, 73)'}
                    setTimeout(()=>{
                        this.isPopup = false;
                    },1500)
                }
            }
            else {
                alert("Please fill all the details");
            }
        }
    },
    mounted() {
        const currentUserData = { name: this.creator, id: this.creatorId };
        this.$store.dispatch('getAllUserName', currentUserData);
    },
    components: { InfoPopup }
}
</script>

<style>
.form-wrapper {
  width: 25%;
  margin: auto;
  padding: 30px 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(213, 218, 219);
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  z-index: 999;
}

.form-wrapper > .close {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

.form-wrapper > .close > img{
  width: 20px;
}

.form-wrapper > h1,
.form-wrapper > h3 {
  text-align: center;
}

.form-wrapper > form {
  display: flex;
  flex-direction: column;
}

.form-wrapper > form > label {
  font-size: 18px;
  margin-top: 5px;
  text-align: left;
}

.form-wrapper > form >input,
.form-wrapper > form > select,
.form-wrapper > form > button {
  padding: 10px;
  font-size: medium;
}

.form-wrapper > form > button  {
  margin-top: 20px;
  background-color: black;
  border: none;
  color: white;
  font-weight: 600;
}

.form-wrapper > form > button:hover {
  background-color: rgb(63, 60, 60);
}

</style>
  