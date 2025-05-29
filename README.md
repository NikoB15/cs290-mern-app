# Full Stack MERN App
Niko Bransfield  
Oregon State University  
CS290 Portfolio Project  
Completed 2024-03-17

## Overview
A single-page application that tracks exercises completed by the user. The frontend app uses React; the backend REST API is written using Node and Express. A MongoDB database was used for persistence.

## Data
Data for the application was stored in a MongoDB collection named `exercises`. Each document in the collection had the following properties:
- name (String) - The name of the exercise
- reps (Number) - The number of times the exercise was performed
- weight (Number) - The weight of the weights used for the exercise
- unit (String) - The unit of measurement of the weight; either `kgs` and `lbs`
- date (String) - The date the exercise was performed, in `MM-DD-YY` format

## REST API Web Service
The backend API has the following functionality:
- Create exercises using POST /exercises
- Read all exercises using GET /exercises
- Update target exercise using PUT /exercises/:_id
- Delete target exercise using DELETE /exercises/:_id

## React UI
The frontend UI has the following functionality:
- **Home Page**
  - Displays all exercise data in a table
  - Table entries include icons to edit or delete the entry.
    - Clicking the delete icon deletes the exercise.
    - Clicking the update icon takes the user to the **Edit Exercise Page**.
- **Edit Exercise Page**
  - Provides input controls allowing the user to edit a particular exercise.
  - Controls are pre-populated with existing data.
  - Upon submitting the updated exercise, the user is notified of whether the update was successful and then returned to the **Home Page**.
- **Create Exercise Page**
  - Provides input controls allowing the user to add a new exercise to the database.
  - Upon submitting a new exercise, the user is notified of whether the operation was successful and then returned to the **Home Page**.
