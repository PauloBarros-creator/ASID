import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AltRouteRoundedIcon from "@mui/icons-material/AltRouteRounded";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";

const MainNavigation = ({ onTabChange, tickets }) => {
	return (
		<header className="py-3 rounded-top-4 align-items-center position-fixed bottom-0 start-50 translate-middle-x" style={{ width: "500px", color: "var(--color-white)", backgroundColor: "var(--color-primary-2)" }}>
			<nav>
				<ul className="d-flex align-items-center justify-content-around">
					<li>
						<Tooltip title="Home">
							<DashboardRoundedIcon fontSize="large" onClick={() => onTabChange(0)} style={{ cursor: "pointer" }} />
						</Tooltip>
					</li>
					<li>
						<Tooltip title="Routes">
							<AltRouteRoundedIcon fontSize="large" onClick={() => onTabChange(1)} style={{ cursor: "pointer" }} />
						</Tooltip>
					</li>
					<li>
						<Tooltip title="Tickets">
							<Badge color="secondary" badgeContent={tickets ? tickets.data.length : 0} invisible={false} overlap="circular">
								<ConfirmationNumberRoundedIcon fontSize="large" onClick={() => onTabChange(2)} style={{ cursor: "pointer" }} />
							</Badge>
						</Tooltip>
					</li>
					<li>
						<Tooltip title="Profile">
							<AccountCircleRoundedIcon fontSize="large" onClick={() => onTabChange(3)} style={{ cursor: "pointer" }} />
						</Tooltip>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
