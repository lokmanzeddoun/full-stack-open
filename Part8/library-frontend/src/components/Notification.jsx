const Notification = ({ error }) => {
	if (!error) return null;
	return <div style={{ color: "red" }}>{error}</div>;
};

export default Notification;
