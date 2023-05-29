import ErrorSVG from "../assets/ErrorBanners/404_Error.svg";

const ProfilePage = () => {
	return (
		<div className="mx-3 d-flex flex-column align-items-center gap-3">
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
			</div>
		</div>
	);
};

export default ProfilePage;
