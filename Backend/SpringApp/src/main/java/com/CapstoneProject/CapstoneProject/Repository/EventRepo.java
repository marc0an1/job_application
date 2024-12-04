package com.CapstoneProject.CapstoneProject.Repository;

import com.CapstoneProject.CapstoneProject.Model.Event;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface EventRepo extends CrudRepository<Event, Integer> {

    List<Event> findByUsername(String username);

    Event findByEventID(int eventID);
}
