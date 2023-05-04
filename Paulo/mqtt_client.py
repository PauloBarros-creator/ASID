import time
import paho.mqtt.client as paho
from paho import mqtt
import csv
import json

i=0
# setting callbacks for different events to see if it works, print the message etc.
def on_connect(client, userdata, flags, rc, properties=None):
    print("CONNACK received with code %s." % rc)

# with this callback you can see if your publish was successful
def on_publish(client, userdata, mid, properties=None):
    print("mid: " + str(mid))

# print which topic was subscribed to
# def on_subscribe(client, userdata, mid, granted_qos, properties=None):
#     print("Subscribed: " + str(mid) + " " + str(granted_qos))

# print message, useful for checking if it was successful
def on_message(client, userdata, msg):
    print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))

# using MQTT version 5 here, for 3.1.1: MQTTv311, 3.1: MQTTv31
# userdata is user defined data of any type, updated by user_data_set()
# client_id is the given name of the client
client = paho.Client(client_id="", userdata=None, protocol=paho.MQTTv5)
client.on_connect = on_connect

# enable TLS for secure connection
client.tls_set(tls_version=mqtt.client.ssl.PROTOCOL_TLS)
client.tls_insecure_set(True) # Ignora a verificação do certificado
# set username and password
client.username_pw_set("ASID2023", "pila123PI")
# connect to HiveMQ Cloud on port 8883 (default for MQTT)
client.connect("e2b7763dd0b642e5b0e81494c6de515b.s2.eu.hivemq.cloud", 8883)

# setting callbacks, use separate functions like above for better visibility
# client.on_subscribe = on_subscribe
client.on_message = on_message
client.on_publish = on_publish

# subscribe to all topics of encyclopedia by using the wildcard "#"
# client.subscribe("encyclopedia/#", qos=1)
# Abre o arquivo CSV para leitura
with open('/home/paulo/Desktop/Uminho/2º Semestre/ASID/Paulo/coordenadas.csv', 'r') as file:
    # Cria um objeto leitor CSV
    reader = csv.reader(file)
    # Loop através das linhas do arquivo
    for row in reader:
        # Converte a linha em uma string separada por vírgulas
        dados = {
            "Rota" : 3,
            "Origem": "Universidade do Minho - Campus de Azurem, Campus de Azurem, Av. da Universidade, 4800-058 Guimaraes",
            "Destino": 'Famalicao, 4760-010 Vila Nova de Famalicao',
            "Velocidade": 45,
            "Temperatura": 22,
            "N Passageiros": 9,
            "Latitude": row[0],
            "Longitude": row[1]
        }
        message  = json.dumps(dados)
        # a single publish, this can also be done in loops, etc.
        client.publish("encyclopedia/temperature", payload=message, qos=1)
        # Espera 1 segundos antes de enviar a próxima mensagem
        time.sleep(0.01)

# loop_forever for simplicity, here you need to stop the loop manually
# you can also use loop_start and loop_stop
client.loop_forever()