/**************************************************************************/
/*!
    This example will attempt to connect to an ISO14443A
    card or tag and retrieve some basic information about it
    that can be used to determine what type of card it is.

    Note that you need the baud rate to be 115200 because we need to print
    out the data and read from the card at the same time!

    To enable debug message, define DEBUG in PN532/PN532_debug.h

  Using the code from the "Read Once" sketch, I modified the original program to only activate
  the read command if a 1 is input on the Serial monitor.
*/
/**************************************************************************/
char foo;
#include <Arduino.h>
#include <EEPROM.h>
#if 0
  #include <SPI.h>
  #include <PN532_SPI.h>
  #include "PN532.h"

  PN532_SPI pn532spi(SPI, 10);
  PN532 nfc(pn532spi);
#elif 0
  #include <PN532_HSU.h>
  #include <PN532.h>

  PN532_HSU pn532hsu(Serial1);
  PN532 nfc(pn532hsu);

#else
  #include <Wire.h>
  #include <PN532_I2C.h>
  #include <PN532.h>

  PN532_I2C pn532i2c(Wire);
  PN532 nfc(pn532i2c);
#endif
int success_out=13; //success LED connected to digital pin 13
int fail_out=12; //fail LED connected to digital pin 12
int button=11; //button circuit connected to digital pin 11
int val=0;//stores values read from pin 11
int i=0;//for counting
String string_out(8,HEX);
void setup(void) {
  Serial.begin(115200);
 // Serial.println("Hello!");
  pinMode(success_out, OUTPUT);
  pinMode(fail_out,OUTPUT);
  pinMode(button, INPUT);
  nfc.begin();
   uint8_t value=0;
   uint8_t valid_uid[3][4]={{0xFD, 0xBB, 0x84, 0x9A},
                             {0xE4, 0xDD, 0x05, 0x0F},
                             {0x93, 0x24, 0xBE, 0xA9}
                            };

    for (i = 0; i < 3; i++)
    {   for (int j=0;j<4; j++)
        {
          value=valid_uid[i][j];
          EEPROM.write(i*4+j, value);
          value=EEPROM.read(i*4+j);
 //         Serial.print(value, HEX);
   //       Serial.println();
        }
    }
  //Done writing code
  uint32_t versiondata = nfc.getFirmwareVersion();
  if (! versiondata) {
    //Serial.print("Didn't find PN53x board");
    digitalWrite(fail_out,HIGH);
    while (1); // halt
  }

  // Got ok data, print it out!
  //Serial.print("Found chip PN5"); Serial.println((versiondata>>24) & 0xFF, HEX);
  //Serial.print("Firmware ver. "); Serial.print((versiondata>>16) & 0xFF, DEC);
  //Serial.print('.'); Serial.println((versiondata>>8) & 0xFF, DEC);

  // Set the max number of retry attempts to read from a card
  // This prevents us from waiting forever for a card, which is
  // the default behaviour of the PN532.
  nfc.setPassiveActivationRetries(0xFFFF);

  // configure board to read RFID tags
  nfc.SAMConfig();
   digitalWrite(fail_out,LOW);
   digitalWrite(success_out,HIGH);
   delay(500);
   digitalWrite(success_out,LOW);
 // Serial.println("Waiting for an ISO14443A card");
}

void loop(void) {

  boolean success;
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store the returned UID
  uint8_t uidLength;                        // Length of the UID (4 or 7 bytes depending on ISO14443A card type)
  uint8_t temp[]= { 0, 0, 0, 0}; //temp for testing variables
  boolean currState=false;
  boolean prevState=false;
  int incoming;
  boolean flag=false;

  /*if(Serial.available()>0)
  {  incoming=Serial.read();
    Serial.println(incoming,DEC);
    //Reading is enabled only if a '1' (the number one) is found on the serial input line
    if(incoming==49)
    {  currState=true;}
    else
   {  currState=false;}
  }*/
  //read button pin
  delay(300);
  val=digitalRead(button);
  delay(200);
  if(val==1)
  { currState=true;}
  else
  { currState=false;}
  // Wait for an ISO14443A type cards (Mifare, etc.).  When one is found
  // 'uid' will be populated with the UID, and uidLength will indicate
  // if the uid is 4 bytes (Mifare Classic) or 7 bytes (Mifare Ultralight)
  if(currState!=prevState)
  {  digitalWrite(success_out, LOW);
     digitalWrite(fail_out,LOW);
    if(currState==true)
    {
      ///Serial.println("Ready to read card");
      digitalWrite(success_out,HIGH);
      delay(500);
      digitalWrite(success_out,LOW);
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, &uid[0], &uidLength);
 // Serial.print(success, DEC);
  if (success) {
    //Serial.println("Found a card!");
    //Serial.print("UID Length: ");Serial.print(uidLength, DEC);Serial.println(" bytes");
    ///Serial.print("UID Value: ");
  string_out="";
    //Serial.println("");
   for (uint8_t i=0; i < uidLength; i++)
    { //Serial.print(" ");
     if(uid[i]<16){string_out+="0";}
      //Serial.print(uid[i],HEX);
     string_out+=String(uid[i],HEX);
    }
    string_out+=";";
  //  Serial.print("; end");
    Serial.println(string_out);
   //Checks through all data stored in EEPROM for a matching tag.
   for(int i=0;i<3;i++)
    {  for(int j=0;j<4;j++)
       { if(uid[j] !=EEPROM.read(i*4+j))
         {  break; }
         if(j==3)
         {digitalWrite(success_out, HIGH);
           flag=true;
           delay(2000);
           //Serial.println("Found a match!");
           //delay(1000);
           //digitalWrite(success_out,LOW);
         }
       }
       if(flag) {break;}
   //  Serial.println("Checking next line");
    }
    if(flag==false)
    {digitalWrite(fail_out,HIGH); digitalWrite(success_out,LOW); //Serial.println("ID doesn't match");
    }
   // Serial.println("");
    // Wait 1 second before continuing
    delay(500);
    digitalWrite(success_out,LOW);
    digitalWrite(fail_out,LOW);
  }
  else
  {
    // PN532 probably timed out waiting for a card
   // Serial.println("Timed out waiting for a card");
   // write high to fail pin
   digitalWrite(fail_out,HIGH);
   digitalWrite(success_out,LOW);
   delay(1000);
   //Serial.println("Timed out waiting for a card");
  }
  }
  prevState=currState;
}
}