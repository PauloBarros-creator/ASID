import { Avatar, Typography } from "@mui/material";
import { Fragment } from "react";

const HomeProfile = ({ user }) => {
	console.log(user);
	return (
		<Fragment>
			{user && (
				<div className="mb-4 mx-3">
					<div className="rounded-4 m-4 text-white text-center d-flex justify-content-between align-items-center" style={{ backgroundColor: "var(--color-primary-2)", padding: "1.5rem" }}>
						<div className="d-flex flex-column text-center">
							<Typography variant="h5">Hello {user[1].name}</Typography>
							<Typography variant="caption">{user[1].email}</Typography>
						</div>
						<Avatar sx={{ width: 56, height: 56 }}>{user[1].name.charAt(0).toUpperCase()}</Avatar>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default HomeProfile;
