const MeetDetailsController = require("../controller/meet-details-controller")

class clientIndex {
    static async getRoutes(fastify){
        fastify.get('/upcomming', MeetDetailsController.upcommingMeetList);//username=levi&id=11
        fastify.get('/completed', MeetDetailsController.completedMeetList);//username=levi&id=11
        fastify.get('/onGoing', MeetDetailsController.onGoingMeetList);//username=levi&id=11
        fastify.post('/scheduleMeet', MeetDetailsController.createMeet);
        fastify.put('/reschedule', MeetDetailsController.rescheduledMeet); 
        fastify.delete('/delete/:id', MeetDetailsController.deleteMeet)
        
        fastify.get('/play', MeetDetailsController.joinPlay);
    }
}

module.exports = clientIndex.getRoutes;