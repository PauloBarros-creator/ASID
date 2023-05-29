import { Fragment } from "react";

const GridDetails = ({ routes, tickets }) => {
	const ready = routes && tickets;
	return (
		<Fragment>
			{ready && (
				<div className="d-flex flex-row justify-content-between gap-3 mb-4 mx-3">
					<div className="w-50 rounded-3 ms-4" style={{ backgroundColor: "var(--color-primary-4)", padding: "1rem" }}>
						Your Tickets: {tickets.data.length}
					</div>
					<div className="w-50 rounded-3 me-4" style={{ backgroundColor: "var(--color-primary-3)", padding: "1rem" }}>
						Routes Available: {routes.data.length}
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default GridDetails;
