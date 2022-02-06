import "./Buttons.css";

const Buttons = ({ className, val, onClick }) => {
  let operators = ["/", "x", "-", "+", "="];
  let others = ["AC", "+/-", "%"];
  return (
    <button
      className={`${className} ${
        operators.includes(val)
          ? "orange"
          : others.includes(val)
          ? "darkGrey"
          : null
      }`}
      onClick={onClick}
    >
      {val}
    </button>
  );
};

export default Buttons;
