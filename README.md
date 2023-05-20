# Restaurant Reservation System: Periodic Tables

Periodic Tables is a full-stack restaurant reservation management application designed for restaurant employees. Users can create, edit, and view reservations as well as manage table seating settings.

## Live Project

- Frontend Deployment - [Deployed Here](https://restaurant-reservation-frontend-djzx.onrender.com)
- Backend Deployment - [Deployed Here](https://restaurant-reservation-kjdb.onrender.com) (Use routes as listed below)

## Technology Used

#### Frontend:

- JavaScript, React, React Router, HTML, CSS, Bootstrap

#### Backend:

- Node.js, Express, Knex, PostgreSQL

## Frontend Overview:

### Dahboard View:

![Dashboard View](./screenshots/Dashboard.png "Dashboard View")

### Create a new reservation:

![Create Reservation](./screenshots/Create%20Reservation.png "Create Reservation")

### Edit a reservation:

![Edit Reservation](./screenshots/Edit%20Reservation.png "Edit Reservation")

### Create a new table:

![Create Table](./screenshots/Create%20Table.png "Create Table")

### Seat a reservation:

![Seat Reservation](./screenshots/Select%20Table.png "Seat Reservation")

### Find a reservation:

![Find Reservation](./screenshots/Find%20Reservation.png "Find Reservation")

### Finish a reservation:

![Finish Reservation](./screenshots/Find%20Reservation.png "Finish Reservation")

## Backend Overview:

The API allows for the following routes:

| Method | Route                                  | Description                              |
| ------ | -------------------------------------- | ---------------------------------------- |
| `GET`  | `/reservations`                        | List all reservations for current date   |
| `GET`  | `/reservations?date=YYYY-MM-DD`        | List all reservations for specified date |
| `POST` | `/reservations`                        | Create new reservation                   |
| `GET`  | `/reservations/:reservation_id`        | List reservation by ID                   |
| `PUT`  | `/reservations/:reservation_id`        | Update reservation                       |
| `PUT`  | `/reservations/:reservation_id/status` | Update reservation status                |

| `GET` | `/tables` | List all tables
| `POST` | `/tables` | Create new table
| `PUT` | `/tables/:table_id/seat` | Assign a table to a reservation (changes reservation's `status` to "seated")
| `DELETE` | `/tables/:table_id/seat` | Remove reservation from a table (changes reservation's `status` to "finished")

## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5001`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.

## User Stories for the project:

### US-01 Create and list reservations

As a restaurant manager<br/>
I want to create a new reservation when a customer calls<br/>
so that I know how many customers will arrive at the restaurant on a given day.

### US-02 Create reservation on a future, working date

As a restaurant manager<br/>
I only want to allow reservations to be created on a day when we are open<br/>
so that users do not accidentally create a reservation for days when we are closed.<br/>

### US-03 Create reservation within eligible timeframe

As a restaurant manager<br/>
I only want to allow reservations to be created during business hours, up to 60 minutes before closing<br/>
so that users do not accidentally create a reservation for a time we cannot accommodate.

### US-04 Seat reservation

As a restaurant manager, <br/>
When a customer with an existing reservation arrives at the restaurant<br/>
I want to seat (assign) their reservation to a specific table<br/>
so that I know which tables are occupied and free.

### US-05 Finish an occupied table

As a restaurant manager<br/>
I want to free up an occupied table when the guests leave<br/>
so that I can seat new guests at that table.<br/>

### US-06 Reservation Status

As a restaurant manager<br/>
I want a reservation to have a status of either booked, seated, or finished<br/>
so that I can see which reservation parties are seated, and finished reservations are hidden from the dashboard.

### US-07 Search for a reservation by phone number

As a restaurant manager<br/>
I want to search for a reservation by phone number (partial or complete)<br/>
so that I can quickly access a customer's reservation when they call about their reservation.<br/>

### US-08 Change an existing reservation

As a restaurant manager<br/>
I want to be able to modify a reservation if a customer calls to change or cancel their reservation<br/>
so that reservations are accurate and current.
