The Task

 

MERN Stack Application Development TaskObjective:

Develop a web application using the MERN stack (MongoDB, Express, React with TypeScript, and Node.js). The application must utilize Redux (Core)/Redux Toolkit (RTK) for state management. Optionally, React Server Components may be used where applicable.

RequirementsScreens

The application should consist of two screens with distinct routes:

1. Launches Table Screen

Fetch and display the latest 30 launches from the SpaceX API v4, sorted by date from newest to oldest.
Show only the following fields for each launch:
flight_number
name
A relevant date field (e.g., date_utc)
Display the data in a tabular format.
Include a "Save" button next to each row to allow saving that launch to a local MongoDB database.
2. Saved Launches Screen

Fetch and display the saved launches from the database in a card layout.
Each card must include a "Remove" button to delete the corresponding launch from the database.
Development Guidelines

All server/database interactions must be handled through Redux core library or Redux Toolkit (RTK), with a clean separation of concerns.
Use TypeScript throughout the project. The use of any type is strictly prohibited.
Ensure proper layout spacing, padding, and visual separation between components for a clean and usable UI.
Include appropriate loading indicators, error handling, and user notifications to enhance the user experience.
You may use any third-party libraries or UI templates to reduce boilerplate and accelerate development.
Restrictions

Use of AI assistance is strictly prohibited.
Do not use tools such as ChatGPT, Claude, DeepSeek, GitHub Copilot, or any other AI-based assistance at any stage of the project.
Submissions must reflect your own skills and understanding.
You may refer to official documentation, StackOverflow, and other reputable developer forums.
Any use of AI-generated or assisted code will result in immediate disqualification.