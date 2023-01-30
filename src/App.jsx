import { useEffect, useState } from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [tenzies, setTenzies] = useState(false);

  const generateNewDie = () => {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      // newDice.push(Math.ceil(Math.random() * 6))
      isHeld: false,
      id: nanoid(),
    };
  };

  const allNewDice = () => {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  };

  const [dice, setDice] = useState(allNewDice());

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const allSame = dice.every((die) => die.value === dice[0].value);

    if (allHeld && allSame) {
      console.log("You won!");
      setTenzies(true);
    }
  }, [dice]);

  const rollDice = () => {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice());
    } else {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    }
  };

  const hold = (id) => {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="container">
        <div className="grid__container">
          {dice.map((die) => (
            <Die
              key={die.id}
              value={die.value}
              isHeld={die.isHeld}
              hold={() => hold(die.id)}
            />
          ))}
        </div>

        <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </div>
    </main>
  );
}

export default App;
