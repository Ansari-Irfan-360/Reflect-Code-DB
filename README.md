# Reflect Code

Reflect Code is a collaborative code editor that allows multiple users to work together in real-time. It leverages modern web technologies to provide an efficient and seamless collaborative coding experience.

## Table of Contents

- [Reflect Code](#reflect-code)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Acknowledgements](#acknowledgements)

## Introduction

Reflect Code is designed to facilitate real-time collaborative coding. It supports multiple users editing the same document simultaneously, providing features such as syntax highlighting, user avatars, and real-time updates.

## Features

- Real-time collaborative code editing
- Syntax highlighting
- User avatars for participant identification
- Notifications for user activities
- Easy-to-use interface

## Tech Stack

**Client:**

- React
- CodeMirror
- Socket.IO Client
- Bootstrap
- React Router
- React Hot Toast
- UUID

**Server:**

- Node.js
- Express
- Socket.IO

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)

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

4. Start the server:

    ```sh
    npm start
    ```

5. Start the client:

    ```sh
    cd ../client
    npm start
    ```

The client will run on `http://localhost:3000` and the server will run on `http://localhost:5000`.

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Create or join a coding session.
3. Start collaborating in real-time with other participants.

## Acknowledgements

- [React](https://reactjs.org/)
- [CodeMirror](https://codemirror.net/)
- [Socket.IO](https://socket.io/)
- [Express](https://expressjs.com/)
