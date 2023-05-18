import paho.mqtt.client as mqtt
import ssl
import json
import urllib.parse
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# Define MQTT broker settings - credenciais nao verificadas
broker_address = "e2b7763dd0b642e5b0e81494c6de515b.s2.eu.hivemq.cloud"
broker_port = 8883
mqtt_topic = "sensors"
mqtt_username = "ASID2023"
mqtt_password = "pila123PI"

# Define MongoDB connection settings
uri = "mongodb+srv://teste:teste@g5-main-cluster.mamiiq8.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
mongo_database_name = "bus-db"
mongo_collection_name = "sensors"
mongo_collection = client[mongo_database_name][mongo_collection_name]


# Define callback function for processing incoming MQTT messages
def on_message(client, userdata, message):
    print(message.payload)
    print("Received message: ", message.payload.decode())
    message_dict = json.loads(message.payload.decode())

    #mongo_collection.insert_one(message_dict)
    mongo_collection.update_one({}, {"$set": message_dict}, upsert=True)
    

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