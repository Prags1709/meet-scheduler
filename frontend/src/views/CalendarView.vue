<template>
  <div class="calendar-page">
    <button :class="{'upcomming-meet-active':upcommingBtnStatus}" @click="setUpcommingMeetData">Upcomming Meet</button>
    <button :class="{'on-going-meet-active':onGoingBtnStatus}" @click="setOnGoingMeetData">On Going Meet</button>
    <button :class="{'completed-meet-active':completedBtnStatus}" @click="setCompletedMeetData">Completed Meet</button>
    <table v-if="isMeetScheduled">
      <thead>
        <th>MEET WITH</th>
        <th>SUBJECT</th>
        <th>DATE</th>
        <th>MEET TIME</th>
        <th v-if="isCompletedData">JOIN</th>
      </thead>
      <tbody>
        <MeetList v-for="(meet, index) in meetListdata" :key="index" :meetData="meet" :isCompletedData="isCompletedData"/>
      </tbody>
    </table>
    <h1 v-else>No Meeting Scheduled</h1>
  </div>
</template>
  
<script>
import MeetList from '../components/MeetList.vue';

export default {
  components: {
    MeetList
  },
  data() {
    return {
      meetListdata: [],
      currentUser: this.$store.state.currentUser,
      upcommingBtnStatus: true,
      onGoingBtnStatus:false,
      completedBtnStatus: false,
      isCompletedData: true,
    }
  },
  mounted() {
    this.setUpcommingMeetData();
  },
  computed: {
    isMeetScheduled(){
      return this.meetListdata.length > 0
    }
  },
  methods: {
    async setUpcommingMeetData() {
      this.isCompletedData = true;
      this.upcommingBtnStatus = true;
      this.onGoingBtnStatus = false;
      this.completedBtnStatus = false;
      await this.$store.dispatch('getUpcommingMeet', this.currentUser);
      this.meetListdata = this.$store.state.upCommingMeet;
    },
    async setOnGoingMeetData(){
      this.isCompletedData = true;
      this.upcommingBtnStatus = false;
      this.onGoingBtnStatus = true;
      this.completedBtnStatus = false;
      await this.$store.dispatch('getonGoingMeet', this.currentUser);
      this.meetListdata = this.$store.state.ongingMeet;
    },
    async setCompletedMeetData() {
      this.isCompletedData = false;
      this.upcommingBtnStatus = false;
      this.onGoingBtnStatus = false;
      this.completedBtnStatus = true;
      await this.$store.dispatch('getcompletedMeet', this.currentUser)
      this.meetListdata = this.$store.state.completedMeet;
    }
  }
}
</script>

<style>
.calendar-page{
  text-align: center;
}

.calendar-page > .upcomming-meet-active,
.calendar-page > .upcomming-meet-active:hover{
  background-color: rgb(28, 182, 74);
}

.calendar-page > .on-going-meet-active, 
.calendar-page > .on-going-meet-active:hover {
  background-color: rgb(21, 148, 21);
}

.calendar-page > .completed-meet-active,
.calendar-page > .completed-meet-active:hover {
  background-color: rgb(21, 148, 21);
}
button {
  cursor: pointer;
  margin: 0 10px 20px 0;
  border: none;
  padding: 10px 20px;
  font-size: medium;
  background-color: black;
  color: white;
  border-radius: 10px;
  font-weight: 600;
}

button:hover {
  background-color: rgb(63, 60, 60);
}

table > tbody > tr > td {
  height: 40px;
}

table > tbody > tr > td > button {
  border: 1px solid blue;
  background-color: blue;
  color: white;
  border-radius: 5px;
  padding: 3px 8px;
  font-size: 15px;
}

table > tbody > tr > td > button:hover {
  color: blue;
  background-color: white;
  border: 1px solid blue;
}
</style>
  