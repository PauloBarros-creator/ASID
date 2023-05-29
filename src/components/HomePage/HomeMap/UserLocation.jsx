import { Typography } from "@mui/material";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const UserLocation = () => {
	const [map, setMap] = useState(/** @type google.maps.Map */ (null));
	const [directionsResponse, setDirectionsResponse] = useState(null);
	const [userLocation, setUserLocation] = useState(null);
	const google = window.google;

	useEffect(() => {
		navigator?.geolocation.getCurrentPosition(
			({ coords: { latitude: lat, longitude: lng } }) => {
				const pos = { lat, lng };
				setUserLocation(pos);
			},
			(e) => {
				console.log(e);
			},
			{ enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
		);
	}, []);

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
	});

	return (
		<div className="mb-4 mx-3 text-center">
			<div className="rounded-3 m-4 d-flex align-items-center justify-content-center" style={{ backgroundColor: "var(--color-bg-1)", height: "200px", width: "auto" }}>
				{!isLoaded && <BeatLoader color="#172acd" />}
				{isLoaded && (
					<div className="h-100 w-100">
						<GoogleMap
							defaultCenter={{ lat: 41.445366, lng: -8.298117 }}
							center={userLocation}
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
							<MarkerF position={userLocation} />
						</GoogleMap>
					</div>
				)}
			</div>
			<Typography variant="caption" className="d-block">
				{userLocation ? "Your Location" : "Allow location access and reload the page"}
			</Typography>
		</div>
	);
};

export default UserLocation;
