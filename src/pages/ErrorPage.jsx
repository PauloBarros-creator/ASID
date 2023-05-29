import { useNavigate } from "react-router-dom";
import ErrorSVG from "../assets/ErrorBanners/404_Error.svg";
import MainNavigation from "../components/Navbar/MainNavigation";

const ErrorPage = () => {
	const navigate = useNavigate();

	const navigateHandler = () => {
		navigate("/");
	};

	return (
		<div className="container" style={{ width: "500px", height: "100vh", backgroundColor: "var(--color-white)" }}>
			<MainNavigation />
			<div className="pt-5 text-center d-flex flex-column align-items-center" style={{ height: "100%" }}>
				<img
					src={ErrorSVG}
					alt="error banner"
					className="mb-5"
					style={{
						height: "12rem",
					}}
				/>
				<h1 className="mb-2">An error occurred!</h1>
				<p className="mb-4">Could not find this page</p>
				<button className="py-3 px-3 rounded-3 text-white fw-bold" style={{ backgroundColor: "var(--color-primary-2)" }} onClick={navigateHandler}>
					Back to HomePage
				</button>
			</div>
		</div>
	);
};

export default ErrorPage;
