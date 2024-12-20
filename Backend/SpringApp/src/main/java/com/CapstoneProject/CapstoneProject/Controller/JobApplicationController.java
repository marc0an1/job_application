package com.CapstoneProject.CapstoneProject.Controller;

import com.CapstoneProject.CapstoneProject.Model.JobApplication;
import com.CapstoneProject.CapstoneProject.Service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobApplication")
@CrossOrigin("*")
public class JobApplicationController {

    @Autowired
    private JobApplicationService service;

    @PostMapping("/createJobApplication")
    public ResponseEntity<JobApplication> createJobApplication(@RequestBody JobApplication jobApplication) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return service.createJobApplication(authentication.getName(), jobApplication.getCompanyName(), jobApplication.getJobDescription(), jobApplication.getDateApplied(), jobApplication.getStatus(), jobApplication.getNotes());
    }

    @GetMapping("/getJobApplications")
    public ResponseEntity<List<JobApplication>> getJobApplications() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return service.getJobApplications(username);
    }

    @PutMapping("/updateJobApplication")
    public ResponseEntity<JobApplication> updateJobApplication(@RequestBody JobApplication jobApplication) {
        return service.updateJobApplication(jobApplication.getApplicationID(), jobApplication.getCompanyName(), jobApplication.getJobDescription(), jobApplication.getDateApplied(), jobApplication.getStatus(), jobApplication.getNotes());
    }

//    @PostMapping("/scrapeJobApplication")
//    public ResponseEntity<JobApplication> scrapeJobApplication(@RequestBody JobApplication jobApplication) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String username = authentication.getName(); // Get username from token
//
//        return service.createJobApplication(
//                username,
//                jobApplication.getCompanyName(),
//                jobApplication.getJobDescription(),
//                jobApplication.getDateApplied(),
//                jobApplication.getStatus(),
//                jobApplication.getNotes()
//        );
//    }



    @DeleteMapping("/deleteJobApplication")
    public ResponseEntity<JobApplication> deleteJobApplication(@RequestBody JobApplication jobApplication) {
        return service.deleteJobApplication(jobApplication.getApplicationID());
    }

}
