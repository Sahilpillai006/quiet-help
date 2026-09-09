#include <WiFi.h>
#include <HTTPClient.h>

// ==================================================
// Wi-Fi
// ==================================================

const char* WIFI_SSID = "AI LAB";
const char* WIFI_PASSWORD = "11223344";


// ==================================================
// Firebase Realtime Database
// ==================================================

const char* FIREBASE_URL =
    "https://inspiremanak-5e002-default-rtdb.asia-southeast1.firebasedatabase.app";


// ==================================================
// Buttons
// ==================================================

#define BUTTON_1 4
#define BUTTON_2 5
#define BUTTON_3 18


// ==================================================
// Device IDs
// ==================================================

const char* DEVICE_1 = "BTN_01";
const char* DEVICE_2 = "BTN_02";
const char* DEVICE_3 = "BTN_03";


// ==================================================
// Button debounce
// ==================================================

unsigned long lastPress1 = 0;
unsigned long lastPress2 = 0;
unsigned long lastPress3 = 0;

const unsigned long debounceTime = 1000;


// ==================================================
// SETUP
// ==================================================

void setup() {

  Serial.begin(115200);

  pinMode(BUTTON_1, INPUT_PULLUP);
  pinMode(BUTTON_2, INPUT_PULLUP);
  pinMode(BUTTON_3, INPUT_PULLUP);

  connectWiFi();

  Serial.println();
  Serial.println("==============================");
  Serial.println("          QUIET HELP");
  Serial.println("==============================");
  Serial.println("System Ready");
  Serial.println();
}


// ==================================================
// LOOP
// ==================================================

void loop() {

  // --------------------------
  // Button 1
  // --------------------------

  if (digitalRead(BUTTON_1) == LOW) {

    if (millis() - lastPress1 > debounceTime) {

      sendHelpRequest(DEVICE_1);

      lastPress1 = millis();

      waitForRelease(BUTTON_1);
    }
  }


  // --------------------------
  // Button 2
  // --------------------------

  if (digitalRead(BUTTON_2) == LOW) {

    if (millis() - lastPress2 > debounceTime) {

      sendHelpRequest(DEVICE_2);

      lastPress2 = millis();

      waitForRelease(BUTTON_2);
    }
  }


  // --------------------------
  // Button 3
  // --------------------------

  if (digitalRead(BUTTON_3) == LOW) {

    if (millis() - lastPress3 > debounceTime) {

      sendHelpRequest(DEVICE_3);

      lastPress3 = millis();

      waitForRelease(BUTTON_3);
    }
  }


  delay(20);
}


// ==================================================
// CONNECT TO WI-FI
// ==================================================

void connectWiFi() {

  if (WiFi.status() == WL_CONNECTED) {
    return;
  }

  Serial.print("Connecting to Wi-Fi");

  WiFi.begin(
    WIFI_SSID,
    WIFI_PASSWORD
  );

  while (WiFi.status() != WL_CONNECTED) {

    delay(500);

    Serial.print(".");
  }

  Serial.println();

  Serial.println("Wi-Fi connected");

  Serial.print("IP Address: ");

  Serial.println(
    WiFi.localIP()
  );
}


// ==================================================
// WAIT FOR BUTTON RELEASE
// ==================================================

void waitForRelease(
    int buttonPin
) {

  while (
    digitalRead(buttonPin) == LOW
  ) {

    delay(10);
  }

  delay(50);
}


// ==================================================
// SEND HELP REQUEST
// ==================================================

void sendHelpRequest(
    const char* deviceID
) {

  Serial.println();
  Serial.println("==============================");

  Serial.println(
    "Help button pressed!"
  );

  Serial.print(
    "Device ID: "
  );

  Serial.println(deviceID);


  // --------------------------
  // Check Wi-Fi
  // --------------------------

  if (
    WiFi.status() != WL_CONNECTED
  ) {

    Serial.println(
      "Wi-Fi disconnected."
    );

    connectWiFi();
  }


  if (
    WiFi.status() != WL_CONNECTED
  ) {

    Serial.println(
      "Unable to connect to Wi-Fi."
    );

    return;
  }


  // --------------------------
  // Create HTTP client
  // --------------------------

  HTTPClient http;


  String url =
      String(FIREBASE_URL)
      + "/requests.json";


  http.begin(url);

  http.addHeader(
    "Content-Type",
    "application/json"
  );


  // --------------------------
  // JSON DATA
  // --------------------------
  //
  // Firebase creates the
  // timestamp on its server.
  //
  // --------------------------

  String json = "{";

  json += "\"deviceId\":\"";
  json += deviceID;
  json += "\",";

  json += "\"event\":\"HELP\",";

  json += "\"timestamp\":{\".sv\":\"timestamp\"},";

  json += "\"status\":\"Pending\"";

  json += "}";


  Serial.println();

  Serial.println(
    "Sending to Firebase:"
  );

  Serial.println(json);


  // --------------------------
  // POST REQUEST
  // --------------------------

  int httpCode =
      http.POST(json);


  Serial.println();

  Serial.print(
    "Firebase HTTP code: "
  );

  Serial.println(httpCode);


  // --------------------------
  // RESPONSE
  // --------------------------

  if (httpCode > 0) {

    String response =
        http.getString();

    Serial.println(
      "Firebase response:"
    );

    Serial.println(response);


    if (
      httpCode >= 200 &&
      httpCode < 300
    ) {

      Serial.println();

      Serial.println(
        "SUCCESS: Help request sent!"
      );

    }

    else {

      Serial.println();

      Serial.println(
        "ERROR: Firebase rejected request."
      );
    }

  }

  else {

    Serial.println();

    Serial.println(
      "ERROR: Could not connect to Firebase."
    );
  }


  http.end();


  Serial.println(
    "=============================="
  );
}