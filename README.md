# Nightly

## Overview

**Nightly** is a web application designed to help users track their sleep and maintain healthier routines. It features a dynamic calendar, sleep timer, and seamless Google Authentication for a personalized user experience.

### Key Features:

- **Home Page**: Provides an overview of the application and easy navigation to other features.
- **Login Page**: Allows users to log in securely through Google Authentication.
- **Calendar Page**: Tracks users' sleep schedules, routines, and tasks with backend integration.
- **Timer Page**: A sleep timer to monitor and manage sleep cycles effectively.

---

## User Authentication

Users log in through our **Google Authentication** system, which securely connects each user's account to their email. This ensures:

- Personalized user experiences.
- Secure storage and retrieval of user data.

---

## Calendar Page

The **Calendar Page** allows users to track their sleep and manage daily routines.

### Features:

- **Database Integration**:
  - Built using **SQLite** for reliable and lightweight storage.
  - Includes two key tables:
    1. **Users**: Stores user information.
    2. **Calendar Entries**: Tracks sleep schedules and associated routines.
- **Testing Data**:
  - Preloaded data for development and testing purposes.

### How It Works:

1. The application connects to the backend SQLite database.
2. Automatically checks if the `users` table exists and adds necessary migrations.
3. Inserts sample data for testing and debugging purposes.

---

## Timer Page

The **Timer Page** is designed to help users monitor and manage their sleep schedules effectively.

### Features:

- Allows users to set and track sleep timers.
- Integrated with the database to log and retrieve sleep data.

---

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: SQLite
- **Authentication**: Google OAuth 2.0
