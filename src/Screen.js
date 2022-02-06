import "./Screen.css";
const Screen = ({ val }) => {
  return (
    <div className="screen">
      <div className="val-container">{val}</div>
    </div>
  );
};

export default Screen;
