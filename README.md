Project Overview 
= 
  Description: This application is a comprehensive job application organizer and calendar management platform. It helps users track their job applications, manage their statuses, and schedule important events like interviews or deadlines.
  
  Purpose: The main goal is to streamline job-seeking efforts by consolidating application tracking, status updates, and scheduling into a single, easy-to-use platform.

Directory Structure
=

Below is the breakdown of the project's directory structure and its components:

CAPSTONEANGULAR/
│
├── .venv/                  # Virtual environment for Python dependencies
│
├── job_application/        # Root project directory
│   ├── .vscode/            # VS Code workspace and settings
│   ├── Additional Documents/  
│   │   └── ...             # Any supplementary documents or references  
│   ├── Backend/            # Contains all backend code (Spring Boot)
│   │   ├── src/            # Java source code files
│   │   ├── pom.xml         # Maven configuration file for dependencies
│   │   └── application.properties # Backend configuration (database, server port, etc.)
│   │
│   ├── Database/           # SQL schema and data for the project
│   │   ├── schema.sql      # SQL script to create tables and seed data
│   │   └── ...             # Any additional SQL scripts
│   │
│   ├── extension/          # Chrome extension codebase
│   │   ├── manifest.json   # Configuration file for Chrome extensions
│   │   ├── popup.html      # HTML file for the extension popup
│   │   ├── popup.js        # JavaScript functionality for the extension
│   │   └── styles.css      # CSS styling for the extension
│   │
│   ├── Front-end/          # Angular frontend code
│   │   ├── src/            # Frontend source code (components, services, routing)
│   │   ├── angular.json    # Angular project configuration file
│   │   ├── package.json    # Node.js project dependencies
│   │   └── index.html      # Main entry point for the frontend
│   │
│   ├── README.md           # Documentation and usage instructions
│   └── requirements.txt    # Python dependencies (if applicable)



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
     - BeautifulSoup (for web scraping algorithm)
     - Flask (to serve as backend for chrome extension)
  5. Other Tools:
     - Postman for API testing
     - JWT for authentication
  6. Version Control:
     - Git and Github
    
Installation Guide
=
  1. Clone the Repository:

      - To clone the repository, simply click the green "Code" button at the top of the page and select your desired method.

  2. Set up Database

      - To set up the database a path should be specified in the application properties and the following lane of code should be changed
      according to necessities:

         ```
            spring.jpa.hibernate.ddl-auto=none
         ```

         - If this configuration is set the none the hibernate module will not attempt to change or verify the database.
         - If this configuration is set to Update the hibernate module will update any existing schema to match the current mapings (It will only add new tables columns
         if they dont exist. But wont make any change to existing data)
         - If this configuration is set to create the hibernate module will drop the existing schema and create a new one with the specified mapings.
         - If this configuration is set to validate the hibernate module will throw an error if the existing schema does not match the mappings.

  4. Install Requirements

      - Once cloned, go to the project and open up a new Terminal, so you can cd to the Frontend with the following command: 
         
         ```
         cd .\Front-end\sakai-ng-master\
         ```

      - Once you've successfully inside that directory, run this command:
          
          ```
          npm install
          ```

      - That command will install "npm" which is necessary for the projects Frontend to run. The Backend should not require any excess installation.

  5. Front-End Setup:

     Navigate to the front-end directory:
      - to launch the Frontend, simply open a new Terminal and use this command:
         * cd .\Front-end\sakai-ng-master\
      - Once inside the directory, copy and paste the command below:

      ```
         ng serve
      ```

      - That command will run the backend, but in order for the application to work properly, you'll need to have the backend running first.

  6. Back-End Setup

      - Before you launch the Backend, you'll want to change the information in the application.properties file. This file can be found here:

         ` Backend > SpringApp > src > main > resources`

      - Once in the file, you'll see some of the fields have a commented out duplicate below them, thats meant for an example of what should be changed. 
         - For "spring.datasource.url:", you'll need to replcae "capstone" we the name of the database that you've set. If you set it to run at a different port other thatn "3306", you'll have to change that number as well.
         
         - For "spring.datasource.password" and "spring.datasource.username", you'll want to change those to the username and password that you set for the database.

      - After you've edited the "application.properties" file, open a **SEPARATE** new Terminal aside from the one you used to launch the Frontend. Once open, you'll have to cd into the SpringApp directory using this command:

         ```
          cd .\Backend\SpringApp\
         ```

      - Once you're inside this directory, you can run the command below to launch the Springboot backend:

         ```
          mvn spring-boot:run
         ```
      - Once that's done you'll be set to test the application.

User Manual
=
- Login and Registration
  * Login: Use your registered credentials to access the dashboard.
  * Register: Create a new account by filling in the required fields.

- Dashboard
  * View and overview of job applications, recent activities, and upcoming events.

- MyJobApplications
  * Add new job applications by clicking on the "Add Job Application" button.
  * Edit or delete existing applications.
 
- Calendar
  * View scheduled events and upcoming intervies.
  * Add, edit, or delete events directly from the calendar.

- Edit User
  * Update personal information, including first name, last name, email, and phone number.
  * Change your password securely.
 
- Chrome Extension
  * CLick on the Extensions icon in Chrome and then click on Manage Extensions.
  * Click on the `Developer Mode` toggle bar, then click on load unpacked.
  * Select the folder 'extension' from the capstoneAngular folder downloaded after cloning the repository.
  * Login to the dashboard once or twice until the extension is able to recognize that you are logged in.
  * Go to Indeed or Linkedin without logging in and select a job posting.
  * Click on the extension and click on the 'Save Job' button, you should receive a "Job application saved successfully" message pop up if it worked. 
  * Go back to the My Job Applications page in the website and check if the job application has been added to the list of job applications associated with your account.

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
* Marco Chaparro (@marc0an1)
* Martin Archila (@MartinArchila)
* Alejandro Morales (@AlejandroMorales0)

Future Enhancements
=
THESE ARE SOME SAMPLE ENHANCEMENTS, NEED TO ADD ALL THE ACTUAL ENHANCEMENTS***
* Implement notifications for upcoming interviews and deadlines.
* Add an analytics page to provide insights into job application progress.
* Mobile responsiveness and progressive web app (PWA) support.

     
       
    
