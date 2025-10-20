import "./Notification.css";

function Notification({ message, type }) {
  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
    </div>
  );
}

export default Notification;
