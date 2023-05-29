import { useEffect, useState } from "react";
import MainNavigation from "./components/Navbar/MainNavigation";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import RoutesPage from "./pages/RoutesPage";
import TicketsPage from "./pages/TicketsPage";

const App = () => {
	const [tab, setTab] = useState(0);
	const [routesData, setRoutesData] = useState();
	const [sensorData, setSensorData] = useState();
	const [ticketsData, setTicketsData] = useState();
	const [userData, setUserData] = useState();

	const getRoutes = async () => {
		const response = await fetch("http://192.168.219.196:5000/routes", {
			mode: "cors",
		});
		if (!response.ok) {
			throw new Error("Getting data failed");
		}
		const data = await response.json();
		if (data) {
			setRoutesData(data);
		} else {
			throw new Error("No Information Available");
		}
	};

	const getSensor = async () => {
		const response = await fetch("http://192.168.219.196:5000/sensors", {
			mode: "cors",
		});
		if (!response.ok) {
			throw new Error("Getting data failed");
		}
		const data = await response.json();
		if (data) {
			setSensorData(data);
		} else {
			throw new Error("No Information Available");
		}
	};

	const getTickets = async () => {
		const response = await fetch("http://192.168.219.196:5000/tickets", {
			mode: "cors",
		});
		if (!response.ok) {
			throw new Error("Getting data failed");
		}
		const data = await response.json();
		if (data) {
			setTicketsData(data);
		} else {
			throw new Error("No Information Available");
		}
	};

	const getUser = async () => {
		const response = await fetch("http://192.168.219.196:5000/user", {
			mode: "cors",
		});
		if (!response.ok) {
			throw new Error("Getting data failed");
		}
		const data = await response.json();
		if (data) {
			setUserData(data);
		} else {
			throw new Error("No Information Available");
		}
	};

	useEffect(() => {
		getRoutes();
		getSensor();
		getTickets();
		getUser();
	}, []);

	const onTabChangeHandler = (tab) => {
		setTab(tab);
	};

	return (
		<div className="container" style={{ width: "500px", height: "100vh", backgroundColor: "var(--color-white)" }}>
			<MainNavigation onTabChange={onTabChangeHandler} tickets={ticketsData} />
			<main>
				{tab === 0 && <HomePage routes={routesData} tickets={ticketsData} user={userData} />}
				{tab === 1 && <RoutesPage routes={routesData} />}
				{tab === 2 && <TicketsPage sensor={sensorData} tickets={ticketsData} />}
				{tab === 3 && <ProfilePage />}
			</main>
		</div>
	);
};

export default App;
