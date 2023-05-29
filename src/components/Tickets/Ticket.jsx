import { Typography } from "@mui/material";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { Fragment, useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

const Ticket = ({ ticketID, sensorData }) => {
	const [map, setMap] = useState(/** @type google.maps.Map */ (null));
	const [directionsResponse, setDirectionsResponse] = useState(null);
	const [busLat, setBusLat] = useState(null);
	const [busLng, setBusLng] = useState(null);
	const [busData, setBusData] = useState(null);

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
	});

	const getSensor = async () => {
		const response = await fetch("http://192.168.219.196:5000/sensors", {
			mode: "cors",
		});
		if (!response.ok) {
			throw new Error("Getting data failed");
		}
		const data = await response.json();
		if (data) {
			setBusLat(parseFloat(data.Latitude));
			setBusLng(parseFloat(data.Longitude));
			setBusData(data);
		} else {
			throw new Error("No Information Available");
		}
		const directionsService = new google.maps.DirectionsService(); // eslint-disable-line
		//
		const results = await directionsService.route({
			origin: { lat: 41.4117, lng: -8.51206 },
			destination: { lat: parseFloat(data.Latitude), lng: parseFloat(data.Longitude) },
			travelMode: google.maps.TravelMode.DRIVING, // eslint-disable-line
		});
		//
		setDirectionsResponse(results);
	};

	useEffect(() => {
		const intervalCall = setInterval(() => {
			getSensor();
		}, 2000);
		return () => {
			clearInterval(intervalCall);
		};
	}, []);

	const loading = directionsResponse && busData;

	return (
		<Fragment>
			{!loading && (
				<div className="d-flex flex-grow-1 align-items-center justify-content-center">
					<HashLoader color="#172acd" />
				</div>
			)}
			{loading && (
				<div className="d-flex flex-column gap-3">
					<Typography variant="h4">Ticket {ticketID}</Typography>
					{directionsResponse && (
						<Fragment>
							<Typography variant="body1">From: {sensorData.Origem}</Typography>
							<Typography variant="body1">To: {sensorData.Destino}</Typography>
						</Fragment>
					)}
					<div className="rounded-3 m-4 d-flex align-items-center justify-content-center" style={{ backgroundColor: "var(--color-bg-1)", height: "250px", width: "auto" }}>
						{isLoaded && (
							<div className="h-100 w-100">
								<GoogleMap
									defaultCenter={{ lat: 41.445366, lng: -8.298117 }}
									center={{ lat: busLat, lng: busLng } || { lat: parseFloat(sensorData.Latitude), lng: parseFloat(sensorData.Longitude) }}
									zoom={14}
									mapContainerStyle={{ width: "100%", height: "100%" }}
									options={{
										zoomControl: false,
										streetViewControl: false,
										mapTypeControl: false,
										fullscreenControl: false,
									}}
									onLoad={(map) => setMap(map)}
								>
									<MarkerF position={{ lat: busLat, lng: busLng } || { lat: parseFloat(sensorData.Latitude), lng: parseFloat(sensorData.Longitude) }} />
								</GoogleMap>
							</div>
						)}
					</div>
					{busData && directionsResponse && (
						<Fragment>
							<div className="d-flex flex-row justify-content-around gap-1 mb-4 mx-3">
								<div className="w-50 rounded-3 ms-4" style={{ backgroundColor: "var(--color-primary-4)", padding: "1rem" }}>
									{busData.Temperatura} ºC
								</div>
								<div className="w-50 rounded-3" style={{ backgroundColor: "var(--color-primary-4)", padding: "1rem" }}>
									{busData.Velocidade} km/h
								</div>
								<div className="w-50 rounded-3 me-4" style={{ backgroundColor: "var(--color-primary-4)", padding: "1rem" }}>
									{busData["N Passageiros"]} Pessoas
								</div>
							</div>
							<div className="d-flex flex-row justify-content-between gap-3 mb-4 mx-3">
								<div className="w-50 rounded-3 ms-4" style={{ backgroundColor: "var(--color-primary-3)", padding: "1rem" }}>
									{directionsResponse.routes[0].legs[0].distance.text}
								</div>
								<div className="w-50 rounded-3 me-4" style={{ backgroundColor: "var(--color-primary-3)", padding: "1rem" }}>
									{directionsResponse.routes[0].legs[0].duration.text}
								</div>
							</div>
						</Fragment>
					)}
				</div>
			)}
		</Fragment>
	);
};

export default Ticket;
