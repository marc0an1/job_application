package com.CapstoneProject.CapstoneProject.Controller;

import com.CapstoneProject.CapstoneProject.Model.Event;
import com.CapstoneProject.CapstoneProject.Service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event")
@CrossOrigin("*")
public class EventController {

    @Autowired
    private EventService service;

    @PostMapping("/createEvent")
    public ResponseEntity<Event> CreateEvent(@RequestBody Event event) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return service.createEvent(authentication.getName(), event.getEventTitle(), event.getEventCategory(), event.getEventDate());
    }

    @GetMapping("/getEvents")
    public ResponseEntity<List<Event>> getEvents() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return service.getEvents(username);
    }

    @PutMapping("/updateEvent")
    public ResponseEntity<Event> updateEvent(@RequestBody Event event) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return service.updateEvent(event.getEventID(), username, event.getEventTitle(), event.getEventCategory(), event.getEventDate());
    }

    @DeleteMapping("/deleteEvent")
    public ResponseEntity<Event> deleteEvent(@RequestBody Event event) {
        return service.deleteEvent(event.getEventID());
    }
}
