import AirlineStopsIcon from "@mui/icons-material/AirlineStops";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar, Divider, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

const RoutesPage = ({ routes }) => {
	return (
		<div className="pt-4 text-center" style={{ height: "100%" }}>
			<div className="d-flex flex-column justify-content-between gap-3 mb-4 mx-3">
				<Typography variant="h4">Routes</Typography>
				{routes.data.map((el) => {
					const name = `Route ${parseInt(el.id) + 1}`;
					const nrStops = el.stops.length;
					return (
						<Accordion key={el.id}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography>{name}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<div className="d-flex flex-column gap-1">
									<div className="d-flex justify-content-around align-items-center gap-1 mb-2">
										<Avatar>
											<AirlineStopsIcon />
										</Avatar>
										<div className="d-flex flex-column gap-1">
											<Typography>Start: {el.start}</Typography>
											<Typography>End: {el.end}</Typography>
										</div>
										<Typography>Stops: {nrStops}</Typography>
									</div>
									<Divider className="mb-2" />
									<ul className="text-start">
										{el.stops.map((el) => {
											const num = `${parseInt(el.stop_num) + 1}`;
											return (
												<li key={el.stop_num}>
													<Typography>
														{num}: {el.stop_name}
													</Typography>
												</li>
											);
										})}
									</ul>
								</div>
							</AccordionDetails>
						</Accordion>
					);
				})}
			</div>
		</div>
	);
};

export default RoutesPage;
