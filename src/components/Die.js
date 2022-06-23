import React from "react";

function Die(/*Object*/ props) {
	const buttonIsHeldStyles = {
		backgroundColor: props.isHeld === true ? "#59E391" : "#FFF",
	};

	return (
		<div
			className={`die-face`}
			style={buttonIsHeldStyles}
			onClick={props.holdDice}
		>
			<h2 className="die-num">
				{props.value}
			</h2>
		</div>
	);
}

export default Die;
