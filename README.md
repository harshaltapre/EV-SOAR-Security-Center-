EV Charger Security Solution


Overview
This repository contains a security solution prototype for Electric Vehicle (EV) chargers, focusing on secure communication and protection against cyber threats. The project aims to prevent man-in-the-middle attacks, malware injections, and unauthorized access by implementing enhanced authentication and secure data transfer protocols.

Key Features
Secure communication between EV and charger

Basic anomaly detection and alert mechanism

Lightweight encryption protocol implementation

Real-time log monitoring for suspicious activities

Designed for microcontroller-based setups (ESP32/Raspberry Pi Pico W)

Deployment
The project is currently live and accessible at:

https://vercel.com/harshaltapres-projects/v0-ev-charger-security-solution

Getting Started
To run this project locally:

Clone the repository:

bash
Copy
Edit
git clone https://github.com/harshaltapres-projects/ev-charger-security-solution.git
cd ev-charger-security-solution
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm run dev
Hardware Compatibility
ESP32 / Raspberry Pi Pico W

WiFi module (if not inbuilt)

Optional: Display module (OLED/LCD) for device status

Secure memory chip (for storing authentication credentials)

Future Enhancements
Full OCPP support

Integration with cloud-based monitoring

AI-enhanced threat detection engine

Firmware over-the-air (FOTA) updates

