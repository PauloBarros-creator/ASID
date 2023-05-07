import paho.mqtt.client as mqtt
import ssl
import urllib.parse
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# Define MQTT broker settings
broker_address = "16b1102d3f7b4cd08777a3a8319e43c7.s2.eu.hivemq.cloud"
broker_port = 8883
mqtt_topic = "encyclopedia/temperature"
#mqtt_username = "teste"
#mqtt_password = "Teste123"

mqtt_username = "Paulo"
mqtt_password = "elcreador123r3PA"

# Define MongoDB connection settings
uri = "mongodb+srv://teste:teste@asid.ntinirt.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
mongo_database_name = "asid-main"
mongo_collection_name = "sensors"
mongo_collection = client[mongo_database_name][mongo_collection_name]


# Define callback function for processing incoming MQTT messages
def on_message(client, userdata, message):
    print(message.payload)
    print("Received message: ", message.payload.decode())
    # Insert incoming message into MongoDB collection
    message_dict = {"value": message.payload.decode()}
    mongo_collection.insert_one(message_dict)

# Set up MQTT client and connect to broker with authentication and SSL/TLS
mqtt_client = mqtt.Client()
mqtt_client.username_pw_set(mqtt_username, mqtt_password)
mqtt_client.on_message = on_message
mqtt_client.tls_set_context(context=ssl.create_default_context())

mqtt_client.connect(broker_address, broker_port)

# Subscribe to MQTT topic
mqtt_client.subscribe(mqtt_topic)

# Start the MQTT client loop to continuously listen for incoming messages
mqtt_client.loop_forever()
