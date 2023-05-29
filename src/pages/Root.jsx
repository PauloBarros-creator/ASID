import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/Navbar/MainNavigation";

const Root = () => {
	const isLogged = useSelector((state) => state.login.isLogged);
	const [connectionStatus, setConnectionStatus] = useState(false);
	const [messages, setMessages] = useState([]);

	return (
		<div className="container" style={{ width: "500px", height: "100vh", backgroundColor: "var(--color-white)" }}>
			{!isLogged && <MainNavigation />}
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Root;
