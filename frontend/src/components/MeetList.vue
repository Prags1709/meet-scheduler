<template>
    <tr>
        <td>{{ meetWith }}</td>
        <td>{{ meetData.subject }}</td>
        <td>{{ (meetData.date).split('T')[0] }}</td>
        <td>{{ (meetData.startTime).slice(0, 5)+'-'+(meetData.endTime).slice(0, 5) }}</td>
        <td v-if="isCompletedData"><button>JOIN</button></td>
    </tr>
    
</template>

<script>
export default {
    props: ["meetData", "isCompletedData"],
    computed: {
        meetWith(){
            return this.meetData.meet_with !== this.$store.state.currentUser.name?this.meetData.meet_with : this.meetData.created_by
        } 
    }
}
</script>