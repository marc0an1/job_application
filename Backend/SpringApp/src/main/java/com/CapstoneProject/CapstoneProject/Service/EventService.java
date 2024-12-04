package com.CapstoneProject.CapstoneProject.Service;

import com.CapstoneProject.CapstoneProject.Model.Event;
import com.CapstoneProject.CapstoneProject.Repository.EventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepo repo;

    public ResponseEntity<Event> createEvent(String username, String eventTitle, String eventCategory, String eventDate) {
        Event event = new Event(username, eventTitle, eventCategory, eventDate);
        repo.save(event);
        return ResponseEntity.status(HttpStatus.CREATED).header("Success", "The event has been created").body(event);
    }

    public ResponseEntity<List<Event>> getEvents(String username) {
        List<Event> events = repo.findByUsername(username);
        return ResponseEntity.status(HttpStatus.OK).header("Success", "The events have been retrieved").body(events);
    }

    public ResponseEntity<Event> updateEvent(int eventID, String username, String eventTitle, String eventCategory, String eventDate) {
        Event event = new Event(eventID, username, eventTitle, eventCategory, eventDate);
        if(repo.findByEventID(eventID) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Error", "The event does not exist").body(event);
        }
        repo.save(event);
        return ResponseEntity.status(HttpStatus.OK).header("Success", "The event has been updated").body(event);
    }

    public ResponseEntity<Event> deleteEvent(int eventID) {
        Event event = repo.findByEventID(eventID);
        if(event == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).header("Error", "The event does not exist").body(event);
        }
        repo.delete(event);
        return ResponseEntity.status(HttpStatus.OK).header("Success", "The event has been deleted").body(event);
    }
}
