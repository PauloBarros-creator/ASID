import { Chip, Divider, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import BuyTickets from "../components/Tickets/BuyTickets";
import SeeTickets from "../components/Tickets/SeeTickets";
import Ticket from "../components/Tickets/Ticket";

const TicketsPage = ({ sensor, tickets }) => {
	const [menuSelected, setMenuSelected] = useState(1);
	const [isTicketSelect, setTicketSelected] = useState(false);
	const [chosedTicket, setChosedTicket] = useState();
	console.log(sensor);
	console.log(tickets);
	const btnColor1 = menuSelected === 1 ? "var(--color-primary-3)" : "var(--color-primary-4)";
	const btnColor2 = menuSelected === 2 ? "var(--color-primary-3)" : "var(--color-primary-4)";

	const onTicketSelection = (id) => {
		setChosedTicket(id);
		setTicketSelected(true);
	};

	return (
		<div className="pt-4 text-center" style={{ height: "100%" }}>
			{!isTicketSelect && (
				<Fragment>
					<div className="d-flex flex-row justify-content-between gap-3 mb-4 mx-3">
						<button className="w-50 rounded-pill ms-4" style={{ backgroundColor: btnColor1, padding: "1rem" }} onClick={() => setMenuSelected(1)}>
							See Tickets
						</button>
						<button className="w-50 rounded-pill ms-4" style={{ backgroundColor: btnColor2, padding: "1rem" }} onClick={() => setMenuSelected(2)}>
							Buy Tickets
						</button>
					</div>
					<Divider className="mb-3">
						<Chip label={`${tickets.data.length} available`} />
					</Divider>
					<Typography variant="h5" className="mb-3">
						{menuSelected === 1 ? "Your Tickets" : "Buy Tickets"}
					</Typography>
					{menuSelected === 1 && <SeeTickets tickets={tickets.data} handleSelect={onTicketSelection} />}
					{menuSelected === 2 && <BuyTickets />}
				</Fragment>
			)}
			{isTicketSelect && <Ticket ticketID={chosedTicket} sensorData={sensor} />}
		</div>
	);
};

export default TicketsPage;
