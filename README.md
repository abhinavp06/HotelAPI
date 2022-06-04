# Hotel API
An API where Customers and Hotels can sign up and perform actions.

## Technology Used:
### MongoDB (hosted on Atlas), Express, Node.js, Swagger, Heroku

## INSTRUCTIONS:
### To run this API:
####      1. First clone the repository
####      2. Install the node modules by the following command: ```npm install``` in the root directory.
####      3. Change the values in the .env file to your preference.
####      4. To run in development mode, type the following: ```npm run v1_API_DEV```
####      5. To send requests to the API using Swagger, go to http://localhost:{port}/v1/api-docs (If you are using heroku, change the header accordingly).

## FEATURES:

### GENERAL:
#### 1. Authentication using **passport.js** (sign in, sign up, sign out).
#### 2. Relevant middlewares.
#### 3. Role management (Hotel has a role with value 1 whereas customer has a role with value 0).

### CUSTOMER:
### CREATE:
#### 1. Create a booking in a specific hotel with a specified date range.
#### 2. Create a dispute with a hotel regarding a booking.
### READ:
#### 1. View all the hotels.
#### 2. View all their bookings.
#### 3. View all their disputes.
#### 4. View their details.
#### UPDATE:
#### 1. Update the status of a dispute to from 'Ongoing' to 'Solved'.
#### DELETE:
#### 1. Delete a booking.

### HOTEL:
### CREATE:
#### 1. Create a room.
### READ:
#### 1. View their details.
#### 2. View all their bookings.
#### 3. View all their disputes.
#### 4. View all their rooms.
#### UPDATE:
#### 1. Update room's status to 'Occupied' when a customer checks in.
#### 2. Update room's status to 'Unoccupied' when a customer checks out.
#### DELETE:
#### 1. Delete a room.
