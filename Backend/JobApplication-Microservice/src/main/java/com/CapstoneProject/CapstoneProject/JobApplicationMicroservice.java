package com.CapstoneProject.CapstoneProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class JobApplicationMicroservice {

	public static void main(String[] args) {
		SpringApplication.run(JobApplicationMicroservice.class, args);
	}

}
