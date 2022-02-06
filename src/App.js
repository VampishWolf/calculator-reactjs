import { useState } from "react";
import ButtonContainer from "./ButtonContainer";
import Buttons from "./Buttons";
import Screen from "./Screen";
import "./styles.css";
import Wrapper from "./Wrapper";

const btnVals = [
  ["AC", "+/-", "%", "/"],
  ["7", "8", "9", "x"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="]
];

const App = () => {
  let [cal, setCal] = useState({
    sign: "",
    num: 0,
    res: 0
  });
  console.log(cal);
  const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

  const removeSpaces = (num) => num.toString().replace(/\s/g, "");

  const numClick = (e) => {
    e.preventDefault();
    const val = e.target.innerHTML;

    if (removeSpaces(cal.num).length < 16) {
      setCal({
        ...cal,
        num:
          cal.num === 0 && val === "0"
            ? "0"
            : removeSpaces(cal.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(cal.num + val)))
            : toLocaleString(cal.num + val),
        res: !cal.sign ? 0 : cal.res
      });
    }
  };

  const dotClick = (e) => {
    e.preventDefault();
    const val = e.target.innerHTML;

    setCal({
      ...cal,
      num: !cal.num.toString().includes(".") ? cal.num + val : cal.num
    });
  };

  const signClick = (e) => {
    e.preventDefault();
    const val = e.target.innerHTML;

    setCal({
      ...cal,
      sign: val,
      res: !cal.res && cal.num ? cal.num : cal.res,
      num: 0
      // num :
    });
    if (cal.num && cal.res) equalsClick(val);
  };

  const resetClick = () => {
    setCal({
      ...cal,
      sign: "",
      res: 0,
      num: 0
    });
  };

  const equalsClick = (sign) => {
    if (cal.sign && cal.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "x"
          ? a * b
          : a / b;

      setCal({
        ...cal,
        res:
          cal.num === "0" && cal.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(cal.res)),
                  Number(removeSpaces(cal.num)),
                  cal.sign
                )
              ),
        sign: sign === "" ? "" : sign,
        num: 0
      });
    }
  };

  const invertClick = () => {
    setCal({
      ...cal,
      num: cal.num ? toLocaleString(removeSpaces(cal.num) * -1) : 0,
      res: cal.res ? toLocaleString(removeSpaces(cal.res) * -1) : 0,
      sign: ""
    });
  };

  const percentClick = () => {
    let num = cal.num ? parseFloat(removeSpaces(cal.num)) : 0;
    let res = cal.res ? parseFloat(removeSpaces(cal.res)) : 0;

    setCal({
      ...cal,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: ""
    });
  };

  return (
    <Wrapper>
      <Screen val={cal.num ? cal.num : cal.res} />
      <ButtonContainer>
        {btnVals.flat().map((btn, index) => {
          return (
            <Buttons
              className={btn === "0" ? "zr" : ""}
              key={index}
              val={btn}
              onClick={
                // console.log(`${btn} Clicked!`);
                btn === "AC"
                  ? resetClick
                  : btn === "+/-"
                  ? invertClick
                  : btn === "%"
                  ? percentClick
                  : btn === "="
                  ? equalsClick
                  : btn === "/" || btn === "x" || btn === "-" || btn === "+"
                  ? signClick
                  : btn === "."
                  ? dotClick
                  : numClick
              }
            />
          );
        })}
      </ButtonContainer>
    </Wrapper>
  );
};

export default App;
