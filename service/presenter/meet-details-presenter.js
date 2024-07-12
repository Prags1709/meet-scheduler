

class MeetDetailsPresenter {
    constructor(model){
        this.model = model
    }

    toJSON() {
       const meetData = this.model;
       return {
        id: Number(meetData.id) || 1,
        created_by: (meetData.created_by || '').toUpperCase(),
        creater_id: Number(meetData.creater_id) || 1,
        meet_with: (meetData.meet_with || '').toUpperCase(),
        attendee_id: Number(meetData.attendee_id) || 1,
        subject: (meetData.subject || '').toUpperCase(),
        date: (meetData.date || ''),
        startTime: (meetData.startTime || ''),
        endTime: (meetData.endTime || ''),
       } 
    }
}

module.exports = MeetDetailsPresenter