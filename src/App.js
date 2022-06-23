import React from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Die from "./components/Die";
import Confetti from "react-confetti";

function App() {
	
	const [tenzies, setTenzies] = React.useState(false);
	const [dice, setDice] = React.useState(allNewDice());
	
	React.useEffect(
		() => {
			checkIfPlayerWins();
		}, /*dependencies*/ [dice]
	)
	
	function checkIfPlayerWins() {
		// All dice have to be held and of same values for the player to win
		const allAreHeld = dice.every(die => die.isHeld);
		const allSameValue = dice.every(die => die.value === dice[0].value);
		if (allAreHeld && allSameValue) {
			setTenzies(true);
		}
	}
	
	function setNewGame() {
		setDice(allNewDice);
		setTenzies(false);
	}

	function allNewDice() {
		// returns an array of 10 random numbers between 1-6 inclusive
		const newDice = [];
		for (let i = 0; i < 10; i++) {
			let newDie = createNewDie();
			newDice.push(newDie);
		}
		return newDice;
	}

	function createNewDie() {
		let randomNumBetweenOneToSix = Math.ceil(Math.random() * 6);
		return {
			id: nanoid(),
			value: randomNumBetweenOneToSix,
			isHeld: false,
		};
	}

	function rollDice() {
		const heldDice = (prevDice) =>
			prevDice.map((die) => {
				return die.isHeld ? die : createNewDie();
			});

		setDice(heldDice);
	}

	function holdDice(/*string*/ id) {
		const heldDice = (prevDice) =>
			prevDice.map((die) => {
				return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
			});

		setDice(heldDice);
	}

	const diceElements = dice.map((die) => (
		<Die
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			holdDice={() => holdDice(die.id)}
		/>
	));

	return (
		<main>
			{tenzies === true && <Confetti />}
			<h1 className="game-title">Tenzies</h1>
			<p className="game-instructions">
				Roll until all dice are the same. Click each die to freeze it at
				its current value between rolls.
			</p>
			<div className="dice-container">{diceElements}</div>
			<button onClick={tenzies === true ? setNewGame : rollDice} className="roll-dice-button">
				{tenzies === true ? "New Game" : "Roll"}
			</button>
		</main>
	);
}

export default App;
