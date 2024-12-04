package com.CapstoneProject.CapstoneProject.Model;


import jakarta.persistence.*;

@Entity
@Table(name="event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id")
    private int eventID;

    @Column(name = "user_name")
    private String username;

    @Column(name = "event_title")
    private String eventTitle;

    @Column(name = "event_category")
    private String eventCategory;

    @Column(name = "event_date")
    private String eventDate;


     public Event(String username, String eventTitle, String eventCategory, String eventDate) {
        this.username = username;
        this.eventTitle = eventTitle;
        this.eventCategory = eventCategory;
        this.eventDate = eventDate;
    }

    public Event(int eventID, String eventTitle, String eventCategory, String eventDate) {
        this.eventID = eventID;
        this.eventTitle = eventTitle;
        this.eventCategory = eventCategory;
        this.eventDate = eventDate;
    }

    public Event(int eventID, String username, String eventTitle, String eventCategory, String eventDate) {
        this.eventID = eventID;
        this.username = username;
        this.eventTitle = eventTitle;
        this.eventCategory = eventCategory;
        this.eventDate = eventDate;
    }

    public Event() {

    }

    public int getEventID() {
        return eventID;
    }

    public void setEventID(int eventID) {
        this.eventID = eventID;
    }

    public String getEventTitle() {
        return eventTitle;
    }

    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }

    public String getEventCategory() {
        return eventCategory;
    }

    public void setEventCategory(String eventCategory) {
        this.eventCategory = eventCategory;
    }

    public String getEventDate() {
        return eventDate;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
