# Quiet Help

An IoT-based classroom assistance and help-request management system developed as a student innovation project for the INSPIRE-MANAK program.

The system combines physical help-request buttons, an ESP32 controller, Wi-Fi, Firebase Realtime Database, and a web dashboard to allow help requests to be generated, monitored, acknowledged, and resolved.

---

## Project Overview

Quiet Help was developed as a student innovation project to explore how an IoT-based system could provide a simple way for students to request assistance.

The system consists of physical buttons connected to an ESP32. When a button is pressed, the ESP32 sends a help request to Firebase through Wi-Fi.

A web dashboard monitors these requests and provides tools for managing students, tracking request status, and viewing request history.

The project also includes a physical classroom/room prototype to demonstrate the concept.

---

## System Architecture

    Physical Help Button
            ↓
          ESP32
            ↓
       Wi-Fi Network
            ↓
    Firebase Realtime Database
            ↓
       Web Dashboard
            ↓
    Request Management

The ESP32 acts as the hardware interface, while Firebase provides the backend data layer and the web application provides the monitoring and management interface.

---

## Key Features

### Hardware

- ESP32-based controller
- Three physical help buttons
- Individual device identification
- Button debouncing
- Button-release detection
- Wi-Fi connectivity
- Serial Monitor status and debugging

### Backend

- Firebase Realtime Database
- Help request storage
- Firebase server-side timestamps
- Request status management
- Real-time database updates

### Web Dashboard

- System connection status
- Pending request count
- Acknowledged request count
- Resolved request count
- Total request count
- Student management
- Device assignment
- Active help requests
- Request history
- Request search
- Request acknowledgement
- Request resolution
- Real-time Firebase listeners

---

## How It Works

### 1. Help Request

A user presses one of the physical help buttons connected to the ESP32.

Each button has its own device identifier:

    BTN_01
    BTN_02
    BTN_03

### 2. ESP32 Processing

The ESP32 detects the button press and prepares a help-request event.

The event contains information such as:

    {
      "deviceId": "BTN_01",
      "event": "HELP",
      "timestamp": "Firebase Server Timestamp",
      "status": "Pending"
    }

### 3. Firebase

The ESP32 sends the request to the Firebase Realtime Database.

The requests are stored under the project's request collection.

Firebase provides the server-side timestamp used for the request.

### 4. Web Dashboard

The web application listens for changes in Firebase and updates the dashboard in real time.

The system can display active requests and maintain request history.

### 5. Request Management

Requests can progress through different states, including:

    Pending
       ↓
    Acknowledged
       ↓
    Resolved

This allows the dashboard to distinguish between new, acknowledged, and completed help requests.

---

## Student Management

The web dashboard includes a student management system.

Student records can contain information such as:

- Student name
- Roll number
- Class
- Assigned device

The dashboard provides functionality to:

- Add students
- Edit student information
- Delete student records
- Associate students with help-request devices

This allows a physical button to be associated with a particular student or location.

---

## Help Request Dashboard

The dashboard provides an overview of the current system state.

It tracks:

- Pending requests
- Acknowledged requests
- Resolved requests
- Total requests

Active requests can be reviewed and managed directly from the dashboard.

The system also maintains request history, allowing previous requests to be reviewed.

---

## Request Lifecycle

A typical help request follows this process:

    Button Pressed
          ↓
    ESP32 Detects Event
          ↓
    Wi-Fi Communication
          ↓
    Firebase Request Created
          ↓
    Dashboard Updates
          ↓
    Request Acknowledged
          ↓
    Request Resolved
          ↓
    Request Added to History

---

## Hardware

The completed prototype uses an ESP32 controller connected to physical help buttons.

### Main Components

- ESP32 development board
- Three push buttons
- Connecting wires
- Power supply
- Physical classroom/room prototype

The hardware is arranged as part of a miniature physical model to demonstrate the intended use of the system.

---

## Software

### ESP32 Firmware

The firmware is written for the ESP32 using the Arduino environment.

The firmware handles:

- Wi-Fi connection
- Button input
- Button debouncing
- Device identification
- Help-event creation
- Firebase communication
- Serial debugging

### Web Application

The dashboard is built using:

- HTML
- CSS
- JavaScript

Firebase is used as the backend for storing and synchronizing system data.

---

## Technologies Used

- ESP32
- Arduino
- C/C++
- Wi-Fi
- Firebase Realtime Database
- HTML
- CSS
- JavaScript

---

## Project Structure

    quiet-help/
    │
    ├── Quiet_help/
    │   └── Quiet_help.ino
    │
    ├── web/
    │   ├── index.html
    │   ├── style.css
    │   └── script.js
    │
    ├── README.md
    └── LICENSE

The Arduino sketch is kept inside a folder with the same name as the sketch, following the standard Arduino project structure.

---

## Setup

### ESP32 Firmware

1. Open the Arduino sketch:

       Quiet_help/Quiet_help.ino

2. Install ESP32 board support in the Arduino IDE.
3. Configure the required Wi-Fi settings.
4. Configure the required Firebase settings.
5. Connect the ESP32 to the computer.
6. Select the appropriate ESP32 board and port.
7. Upload the firmware.

### Web Application

Open the files inside the `web` directory using a suitable local web server or hosting environment.

Configure the Firebase connection according to the deployment requirements of the project.

---

## Usage

### Hardware

1. Power on the ESP32.
2. Wait for the device to connect to Wi-Fi.
3. Press one of the physical help buttons.
4. The ESP32 detects the button press.
5. A help request is created.
6. The request is sent to Firebase.

### Dashboard

1. Open the web dashboard.
2. Connect to the Firebase backend.
3. Monitor incoming help requests.
4. Identify the associated device or student.
5. Acknowledge the request.
6. Resolve the request when assistance has been provided.
7. Review previous requests through the request history.

---

## Physical Prototype

A miniature classroom/room environment was constructed to demonstrate the system physically.

The prototype combines the physical help-request interface with the ESP32 controller and demonstrates how the system can connect a physical event to a digital monitoring dashboard.

The physical model is intended as a demonstration and educational prototype.

---

## My Role

This project was developed as part of my work supporting student innovation projects for the INSPIRE-MANAK program.

My technical involvement included areas such as:

- Hardware integration
- ESP32 firmware development
- IoT communication
- Firebase integration
- Web interface development
- System integration
- Prototype development
- Testing and debugging

The project was developed in the context of a student innovation initiative, and this repository documents the technical implementation and prototype development work.

---

## Project Context

Quiet Help was developed in the context of the INSPIRE-MANAK program, which supports student innovation and the development of solutions to practical problems.

The project demonstrates how an ESP32-based IoT device can be connected to a cloud backend and a web-based management interface.

---

## Limitations

This project is a prototype and should not be considered a production-grade emergency or safety system.

Current limitations include:

- Dependence on Wi-Fi connectivity
- Dependence on Firebase availability
- Internet connectivity requirements
- Hardware and power reliability
- Prototype-level physical construction
- No direct emergency-service integration
- Potential delays caused by network or backend availability
- Limited number of physical input devices in the current prototype

The system should therefore be treated as an educational and demonstration prototype.

---

## Future Improvements

Possible improvements include:

- Support for more help-request devices
- Improved device and location management
- Request notifications
- Request acknowledgement tracking
- Request history and analytics
- Improved authentication
- Role-based dashboard access
- Offline event buffering
- Better network failure handling
- Device health monitoring
- Improved physical enclosure
- Scalable backend architecture
- Improved dashboard interface
- Mobile-friendly dashboard
- Additional monitoring and reporting features

---

## Project Status

**Status: Completed Prototype**

The physical prototype and supporting firmware and web application were completed as part of the student innovation project.

This repository documents the completed prototype and its technical implementation.

---

## Author

**Sahil B Pillai**

Engineer | Robotics & AI Enthusiast

---

## License

This project is available under the MIT License.
