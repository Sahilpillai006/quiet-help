# Quiet Help

An IoT-based emergency assistance system developed as a student innovation project for the INSPIRE-MANAK program.

The system provides a simple physical interface through which a user can trigger a discreet help request. The request is sent wirelessly to a connected backend and can be monitored through a web-based interface.

---

## Project Overview

Quiet Help was developed as a technology prototype to explore how IoT systems can be used to provide a simple and accessible method of requesting assistance.

The project combines a physical help button, an ESP32-based controller, wireless communication, Firebase, and a web interface into a single system.

A physical prototype of a room environment was also built to demonstrate how the system could be integrated into a real-world setting.

---

## System Architecture

    Physical Help Button
            ↓
          ESP32
            ↓
       Wi-Fi Network
            ↓
         Firebase
            ↓
      Web Dashboard
            ↓
      Help Request Display

The ESP32 detects the physical button press and sends an event to the backend.

The web interface can then retrieve and display the corresponding help request.

---

## Key Features

- Physical help button
- ESP32-based control system
- Wi-Fi connectivity
- Firebase backend integration
- Web-based monitoring interface
- Real-time help event transmission
- Device identification
- Event timestamping
- Physical demonstration prototype
- HTML, CSS, and JavaScript web interface

---

## How It Works

When the user presses the physical help button, the ESP32 detects the input.

The controller creates a help event containing information such as the device identifier, event type, timestamp, and status.

The event is then transmitted through Wi-Fi to Firebase.

The web interface communicates with the backend and displays the received help information.

A simplified example of the event structure is:

    {
      "deviceId": "BTN_01",
      "event": "HELP",
      "timestamp": 1788324322,
      "status": "..."
    }

The exact values depend on the device state and the event being generated.

---

## Hardware

The completed prototype uses an ESP32-based controller together with a physical help button.

The hardware is integrated into a miniature room environment to demonstrate the intended use case.

### Main Hardware Components

- ESP32 development board
- Physical push button
- Connecting wires
- Power supply
- Prototype room model

Additional components may be present in the physical prototype depending on the final build.

---

## Software

The project consists of two major software components.

### ESP32 Firmware

The ESP32 firmware is responsible for:

- Connecting to Wi-Fi
- Monitoring the help button
- Detecting button presses
- Creating help events
- Communicating with Firebase

### Web Interface

The web interface is built using:

- HTML
- CSS
- JavaScript

It provides a browser-based interface for viewing information received from the IoT system.

---

## Technologies Used

- ESP32
- Arduino
- C/C++
- Wi-Fi
- Firebase
- HTML
- CSS
- JavaScript

---

## Project Structure

    quiet-help/
    │
    ├── firmware/
    │   └── quiet_help/
    │       └── quiet_help.ino
    │
    ├── web/
    │   ├── index.html
    │   ├── style.css
    │   └── script.js
    │
    ├── README.md
    └── LICENSE
---

## Setup

### Firmware

1. Open the Arduino sketch located in the `firmware` directory.
2. Install the required ESP32 board support in the Arduino IDE.
3. Configure the required Wi-Fi and Firebase settings.
4. Connect the ESP32 to the computer.
5. Select the appropriate ESP32 board and port.
6. Upload the firmware.

Do not commit private Wi-Fi passwords, Firebase credentials, or other secrets to the repository.

### Web Interface

Open the files inside the `web` directory using a suitable local web server or hosting environment.

Configure the Firebase connection according to the project's deployment requirements.

---

## Usage

1. Power on the ESP32.
2. Allow the controller to connect to Wi-Fi.
3. Press the physical help button.
4. The ESP32 detects the button press.
5. A help event is sent to Firebase.
6. The web interface receives or retrieves the event.
7. The help request is displayed for monitoring.

---

## Physical Prototype

A miniature room model was constructed to demonstrate the concept in a physical environment.

The prototype represents how a help-request system could be integrated into a room or similar space.

The physical model is intended as a demonstration platform for the underlying IoT system rather than a production-ready installation.

---

## Project Demonstration

The project includes both a physical hardware prototype and a software monitoring interface.

The physical prototype demonstrates the user interaction, while the web interface demonstrates how the resulting help event can be monitored digitally.

---

## My Role

This project was developed as part of my work supporting student innovation projects for the INSPIRE-MANAK program.

My involvement included technical development and project support, including areas such as:

- Hardware integration
- ESP32 firmware development
- IoT communication
- Firebase integration
- Web interface development
- System integration
- Prototype development and testing

The project was developed to support a student innovation initiative, and this repository documents the technical implementation and development work involved in the prototype.

---

## Project Context

Quiet Help was created in the context of the INSPIRE-MANAK program, which encourages student innovation and the development of practical solutions to real-world problems.

The prototype demonstrates how a relatively simple IoT architecture can connect a physical interaction with a remote digital monitoring system.

---

## Limitations

This project is a prototype and should not be considered a production-grade emergency or safety system.

Potential limitations include:

- Dependence on Wi-Fi connectivity
- Dependence on the backend service
- Internet connectivity requirements
- Hardware and power reliability
- Prototype-level physical construction
- No guaranteed emergency-service integration
- Potential delays caused by network or backend availability

The system should therefore be treated as a demonstration and educational prototype rather than a certified emergency communication system.

---

## Future Improvements

Possible future improvements include:

- Add multiple help buttons or devices
- Add unique locations for each device
- Add acknowledgement of help requests
- Add request history
- Add notification mechanisms
- Add device health monitoring
- Improve authentication and access control
- Improve reliability during network outages
- Add offline event buffering
- Improve the physical enclosure
- Develop a more scalable backend architecture
- Add role-based access for monitoring users

---

## Project Status

**Status: Completed Prototype**

The physical prototype and supporting software system were completed as part of the student innovation project.

This repository documents the completed prototype and its technical implementation.

---

## Author

**Sahil B Pillai**

Engineer | Robotics & AI Enthusiast

---

## License

This project is open source and available under the MIT License.
