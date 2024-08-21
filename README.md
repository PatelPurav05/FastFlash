# FastFlash 

## Introduction
FastFlash is an innovative web platform designed to empower students in their academic journey by making study sessions more engaging and effective. The platform combines the traditional benefits of flashcards with a modern twist—an interactive crossword game—creating a comprehensive learning experience tailored for students aiming to reach their academic goals. Some key features include: customizable flashcards, pdf to flashcard conversion, and interactive crossword game. Students need to sign into the platform to create customized flashcards. Users can upload PDF notes directly to the platform. With the help of the Gemini API, the content is intelligently parsed and transformed into organized flashcard sets, saving users time and effort in manual creation. This feature allows students to efficiently convert their notes into personalized study aids. With the storage aspect of Firebase, these flashcards are saved to their account for future use. What sets FastFlash apart is the unique learning experience offered through an interactive crossword game. The game is designed to reinforce key concepts from users' flashcard sets in a fun and engaging manner, turning study sessions into an active learning challenge. The crossword game is dynamically generated from the content of flashcard sets, helping users retain information in an entertaining way. The interactive crossword game and the ability to turn notes into personalized flashcards in order to help students get a better understanding of their studies is what makes FastFlash unique. We used React for the frontend, and Flask for the backend. We stored information in Firebase and used the Gemini API to convert text to flashcards.

Video Link: https://drive.google.com/drive/folders/1LfNf6UY7SJ0EF9Tryh4w8GleKQHxEJn8?usp=drive_link
## Setup

### Global `.env` File
The global `.env` file is used to store all of the environment variables necessary for the Docker Container and Flask App.  
  
The global `.env` file should contain the following variables:
1. `API_KEY` - Firebase API Key

### Dependencies
##### If you are using Docker, you can skip this step, since the Docker scripts will automatically install all dependencies.  
#### Flask Backend Dependencies
To install all the dependencies required for the backend of this project, ensure you have `pip` installed. Then, navigate to the `backend` directory and run the following command in your terminal:  
  
`pip install -r requirements.txt`  
#### React Frontend Dependencies
To install all React dependencies, ensure you have Node.js and npm (Node Package Manager) installed. Then, navigate to the root directory run the following command in your terminal:  
  
`npm install`  

## Running The Project
### Use Docker
To run the project using Docker, ensure that you have Docker installed. Then, from the root directory of the project, run the following command in your terminal:  
  
`docker-compose up --build`  
  
This command will build and run all of the docker images required for this project.  
  
### Manual Startup
For manual startup, ensure that you have all of the dependencies installed and run the following commands:  
1. Next, navigate to your `backend` directory and run the following command:
     
   `flask run`
     
   By default, this should run on port 5000.
2. Finally, to start your React app, navigate to the root directory and run:
  
   `npm start`
     
#### Now, you should be good to go! Please navigate to the React application (generally available at http://localhost:3000) to use the project.
