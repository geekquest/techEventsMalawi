// models/Event.js
class Event {
  constructor(eventData) {
    this.id = eventData.id;
    this.userId = eventData.user_id;
    this.formId = eventData.form_id;
    this.topic = eventData.topic;
    this.message = eventData.message;
    this.image = eventData.image;
    this.venue = eventData.venue;
    this.duration = eventData.duration;
    this.date = new Date(eventData.date);
    this.time = eventData.time;
    this.active = Boolean(eventData.active);
    this.slug = eventData.slug;
    this.timeTo = eventData.time_to;
    this.createdAt = new Date(eventData.created_at);
    this.updatedAt = new Date(eventData.updated_at);
  }

  isActive() {
    return this.active === 1;
  }

  getFormattedTime() {
    return this.time;
  }
  getFormattedDate() {
    return `${this.date.getFullYear()}-${(this.date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${this.date.getDate().toString().padStart(2, "0")}`;
  }
}

export default Event;
