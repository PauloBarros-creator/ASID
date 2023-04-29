import requests
import polyline
import csv

# Define o endpoint da API do Google Maps Directions e a chave de API
endpoint = 'https://maps.googleapis.com/maps/api/directions/json'
api_key = 'AIzaSyC6J72iE5buAUpWUncXY147sEWnIcLal8c'

# Define os pontos de partida e destino
origin = 'Universidade do Minho - Campus de Azurém, Campus de Azurém, Av. da Universidade, 4800-058 Guimarães'
destination = 'Famalicão, 4760-010 Vila Nova de Famalicão'

# Faz uma solicitação GET para a API do Google Maps Directions
params = {
    'origin': origin,
    'destination': destination,
    'key': api_key
}
response = requests.get(endpoint, params=params)

# Analisa a resposta da API para obter as coordenadas dos pontos de interesse
if response.status_code == 200:
    data = response.json()

        # Cria um arquivo CSV para armazenar as coordenadas intermediárias
    with open('coordenadas.csv', mode='w', newline='') as file:
        writer = csv.writer(file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

        # Escreve o cabeçalho do arquivo CSV
        writer.writerow(['Latitude', 'Longitude'])

        for step in data['routes'][0]['legs'][0]['steps']:
            polylin = step['polyline']
            points = polylin['points']
            coordinates = polyline.decode(points)
            # Escreve cada par de coordenadas intermediárias em uma nova linha no arquivo CSV
            for lat, lng in coordinates:
                writer.writerow([lat, lng])
 
else:
    print('Não foi possível obter as direções.')
