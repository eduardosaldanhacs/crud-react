function Notification({ message, type }) {
  const style = {
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: 0
  };
  return (
    <div className={type} style={style}>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
