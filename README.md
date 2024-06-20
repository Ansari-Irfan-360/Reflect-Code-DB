# Reflect Code

Reflect Code is a collaborative code editor that allows multiple users to work together in real-time. It leverages modern web technologies to provide an efficient and seamless collaborative coding experience. The latest update adds a database to store and manage code for different rooms, providing functionalities like saving, retrieving, deleting, and copying code.

## Table of Contents

  - [Introduction](#introduction)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Acknowledgements](#acknowledgements)

## Introduction

Reflect Code is designed to facilitate real-time collaborative coding. It supports multiple users editing the same document simultaneously, providing features such as syntax highlighting, user avatars, and real-time updates. Now, it also includes robust database functionality for enhanced code management.

## Features

- Real-time collaborative code editing
- Syntax highlighting
- User avatars for participant identification
- Notifications for user activities
- Easy-to-use interface
- **New Features:**
  - Save and update code to a MongoDB database
  - Retrieve and load saved code from the database
  - Delete code from the database
  - Clear the editor with user confirmation
  - Copy code to the clipboard

## Tech Stack

**Client:**

- React
- CodeMirror
- Socket.IO Client
- Bootstrap
- React Router
- React Hot Toast
- UUID
- Axios

**Server:**

- Node.js
- Express
- Socket.IO
- MongoDB with Mongoose
- dotenv
- CORS

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Ansari-Irfan-360/Reflect-Code.git
    cd reflect-code
    ```

2. Install client dependencies:

    ```sh
    cd client
    npm install
    ```

3. Install server dependencies:

    ```sh
    cd ../server
    npm install
    ```

4. Create a `.env` file in the `server` directory and add your MongoDB URI and CORS URL:

    ```env
    MONGO_URI=your_mongodb_uri
    CORS_URL=http://localhost:3000
    ```

5. Start the server:

    ```sh
    npm start
    ```

6. Start the client:

    ```sh
    cd ../client
    npm start
    ```

The client will run on `http://localhost:3000` and the server will run on `http://localhost:8000`.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Create or join a coding session.
3. Start collaborating in real-time with other participants.
4. Use the following new functionalities:
   - **Save Code:** Save the current code to the database.
   - **Update Code:** Update the existing code in the database.
   - **Retrieve Code:** Fetch and load the saved code from the database.
   - **Delete Code:** Remove the saved code from the database and clear the editor.
   - **Clear Editor:** Clear the editor content with user confirmation.
   - **Copy Code:** Copy the current code to the clipboard.

## Acknowledgements

- [React](https://reactjs.org/)
- [CodeMirror](https://codemirror.net/)
- [Socket.IO](https://socket.io/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Axios](https://axios-http.com/)
- [Bootstrap](https://getbootstrap.com/)
