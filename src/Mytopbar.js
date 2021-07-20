import React, { useState } from 'react';

function Mytopbar(props) {

	var barStyle = {
			position: "static",
			display: "flex",
			backgroundColor: props.tc.backgroundColor,
			width: "100vw",
			height: "50px",
			alignItems: "center",
			justifyContent: "center",
			transition: "background-color 0.5s"
			}

	return(
		<>
		<div style = {barStyle}>
			<h2 style = {{color: "white", fontWeight: "bold"}}>NOT&nbsp;</h2>
			<h2 style = {{color: "white", fontFamily: "Allura, Brush Script MT, cursive", fontSize: "45px"}}>Trello</h2>
		</div>
		</>
	);
}

export default Mytopbar;