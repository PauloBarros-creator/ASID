from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import json

# Define MongoDB connection settings
uri = "mongodb+srv://teste:teste@g5-main-cluster.mamiiq8.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
mongo_database_name = "bus-db"
mongo_collection_name = "routes"
mongo_collection = client[mongo_database_name][mongo_collection_name]

x= {
    "route_id": 1,
    "start": "Vermoim",
    "end": "Joane",
    "stops": [
        {
            "stop_num": 0,
            "town": "Vermoim",
            "stop_name": "Farmácia Marinho"
        },
        {
            "stop_num": 1,
            "town": "Pousada de Saramagos",
            "stop_name": "Lidl"
        },
        {
            "stop_num": 2,
            "town": "Joane",
            "stop_name": "Bolama"
        },
        {
            "stop_num": 3,
            "town": "Joane",
            "stop_name": "Rotunda do Redondo"
        },
        {
            "stop_num": 4,
            "town": "Joane",
            "stop_name": "Café Central"
        }
    ]
}

# convert into JSON:
#y = json.dumps(x)

def send_to_atlas(payload):
    print(payload)
    mongo_collection.insert_one(payload)

send_to_atlas(x)