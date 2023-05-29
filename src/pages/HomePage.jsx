import brandLogo from "../assets/logo.png";
import GridDetails from "../components/HomePage/Details/GridDetails";
import UserLocation from "../components/HomePage/HomeMap/UserLocation";
import HomeProfile from "../components/HomePage/HomeProfile/HomeProfile";

const HomePage = ({ routes, tickets, user }) => {
	return (
		<div className="pt-4" style={{ height: "100%" }}>
			<div className="d-flex mb-4 justify-content-center gap-2 align-items-center">
				<img src={brandLogo} alt="brand logo" style={{ height: "6rem", width: "auto" }} />
				<h1 className="fw-bold" style={{ color: "var(--color-gray)" }}>
					MinhoBUS
				</h1>
			</div>
			<HomeProfile user={user} />
			<UserLocation />
			<GridDetails routes={routes} tickets={tickets} />
		</div>
	);
};

export default HomePage;
