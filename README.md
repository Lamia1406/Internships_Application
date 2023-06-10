# Internship Management System

The Internship Management Application is a web-based platform that simplifies the internship application process for all parties involved. It provides an intuitive interface, enabling students to easily browse and apply for available internships directly through the application. Additionally, it offers features to track the status of their applications, providing transparency and convenience.
The application aims to streamline the internship experience by reducing administrative burdens and improving overall efficiency. By leveraging this platform, students can easily explore internship opportunities, submit applications, and stay informed about the progress of their applications. Simultaneously, the application helps internship providers and administrators efficiently manage and evaluate incoming applications.

With its user-friendly interface and comprehensive functionality, the Internship Management Application offers a seamless and efficient solution for both students and organizations involved in the internship process.

## Features

- User Authentication: The website requires users to log in to access features tailored to their roles, ensuring authorized access to sensitive data.

- Internship Listings: Comprehensive listings display available internships, providing students with a wide range of options to choose from.

- Internship Management: Administrators can create, modify, and delete internship posts, including details such as title, description, requirements, and duration.

- Application Management: Students can manage their internship applications through the application, including submitting applications, tracking status, and receiving notifications for updates or changes.

- Application Submission: Students can directly apply for internships by filling out and submitting application forms through the application.

- Application Review: Internship applications submitted by students are reviewed and evaluated, with statuses updated to "accepted" or "rejected" accordingly.

- Internship Progress Tracking: Users can track the progress of their internship applications, including offer status and monitoring progress throughout the internship experience.

- Reporting and Analytics: The website provides universities with reporting and analytics tools to track the success of their internship programs, including the number of internships offered and the number of students securing internships.

- Notifications: Users receive notifications to facilitate effective communication between all parties involved and avoid any miscommunication.

## Installation

To get started with the Internship Management Application, follow the steps below:

1. Clone the repository:

$ git clone https://github.com/Lamia1406/Internships_Application.git
$ cd Internship_Application

2. Install dependencies:
The application has separate client-side (React) and server-side (Node.js) dependencies. Install the dependencies for both parts of the application.
- Install server-side dependencies
$ cd Backend
$ npm install

- Install client-side dependencies
$ cd ../Frontend
$ npm install

3. Set up the MongoDB database:
Ensure that you have MongoDB installed and running on your system. Update the database connection configuration in the index.js file of the Backend folder

4. Start the development servers:
In separate terminal windows, start the development servers for the client and server parts of the application.

- Start the server development server
$ cd Backend
$ npm start

- Start the client development server
$ cd ../Frontend
$ npm start

5. Access the application:
Open a web browser and visit http://localhost:3000 to access the Internship Management Application.
Note: If port 3000 is already in use by another application, React may prompt you with options to switch to an alternative port. Make sure to follow the instructions provided in the terminal if you need to use a different port.