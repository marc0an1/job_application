Project Overview 
= 
  Description: This application is a comprehensive job application organizer and calendar management platform. It helps users track their job applications, manage their statuses, and schedule important events like interviews or deadlines.
  
  Purpose: The main goal is to streamline job-seeking efforts by consolidating application tracking, status updates, and scheduling into a single, easy-to-use platform.

Technologies and Tools
= 
  1. Front-End:
     - Angular
     - PrimeNG
     - FullCalendar
  2. Back-End:
     - Spring Boot
     - Spring Security
  3. Database:
     - MySQL
     - MySQL Workbench
  4. Chrome Extension:
     - BeautifulSoup
     - Flask
  5. Other Tools:
     - Postman for API testing
     - JWT for authentication
  6. Version Control:
     - Git and Github

Features
=
  1. Job Application Tracker:
     - Add, update, and delete job applications.
     - Filter and search job applications by status, date, or company name.
  2. Calendar Integration:
     - Schedule interviews or deadlines directly in the calendar.
     - View a snapshot of upcoming events on the dashboard.
  3. User Profile Management:
     - Update user information and passwords securely.
  4. Chrome Extension:
     - Scrape job details from job posting platforms like LinkedIn and Indeed.
  5. Secure Authentication:
     - User login and session management with JWT.

Setup and Installation Instructions
=
  1. Clone the Repository:
          complete this****
  2. Set up Database
         complete this****

  4. Install Requirements
         complete this****
  5. Front-End Setup:
     Navigate to the front-end directory:
         complete this****
  6. Back-End Setup
         complete this****

Usage
= 
  1. Users can:
     - Add new job applications using the job applicaiton form in the My Job Applications page or the Main Dashboard page.
     - Update application statuses or delete old applications.
     - Schedule interviews or events directly on the calendar through the My Calendar page.
     - View recent activities, including recently added applications or status updates.
     - Access the Chrome extension to scrape job details from supported websites.

API Endpoints
=
  1. User Endpoints:
     * POST /user/createUser: Create a new user.
     * PUT /user/updateUser: Update user information.
     * PUT /user/updatePassword: Update user password.
     
  2. Job Applications Endpoints:
     * POST /jobApplication/createJobApplication: Add a job application.
     * PUT /jobApplication/updateJobApplication: Update a job application.
     * DELETE /jobApplication/deleteJobApplication/{id}: Delete a job application.
     
  4. Event Endpoints
     * POST /event/createEvent: Create a new event.
     * GET /event/getEvents: Get all events for the current user.
     * PUT /event/updateEvent: Update an existing event.
     * DELETE /event/deleteEvent/{id}: Delete an event.

Contributors
= 

* Nicolas Astros (@nicolitoo)
* Marco Chaparro ()
* Martin Archila ()
* Alejandro Morales ()

Future Enhancements
=


Known Issues
=
     
       
    
