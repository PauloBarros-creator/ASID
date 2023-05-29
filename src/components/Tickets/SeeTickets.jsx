import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Avatar, Chip, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";

const SeeTickets = ({ tickets, handleSelect }) => {
	return (
		<div className="mx-3 d-flex flex-column align-items-center gap-3">
			{tickets.map((el, index) => {
				return (
					<div key={el.id} className="d-flex justify-content-between align-items-center py-4 px-3 rounded-4" style={{ backgroundColor: "var(--color-gray-1)", width: 300 }}>
						<div className="d-flex gap-3 align-items-center">
							<Avatar>
								<ConfirmationNumberIcon />
							</Avatar>
							<div className="d-flex flex-column align-items-center">
								<Typography variant="body1">{el.rota}</Typography>
								<Typography variant="caption" style={{ cursor: "pointer" }} onClick={() => handleSelect(el.id)}>
									Use Ticket
								</Typography>
							</div>
						</div>
						<Chip label={el.quantidade} sx={{ backgroundColor: purple[300] }} className="text-white fw-bold" />
					</div>
				);
			})}
		</div>
	);
};

export default SeeTickets;
