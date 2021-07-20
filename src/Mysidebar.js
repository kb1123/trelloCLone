import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import galaxy from './galaxy.jpg';
import clouds from './clouds.jpg';
import desert from './desert.jpg';
import forest from './forest.jpg';
import coral from './coral-reef.jpg';


const sidebarOuterStyle = {
	position: "fixed",
	right: "0px",
	height: "100vh",
	backgroundColor:"powderblue",
	top: "0px",
	zIndex: "400",
	display: "inline-block"
}

const Mysidebar = (props) =>{

	const [show, changeShow] = useState(true);
	const [prevButton, changeButton] = useState("");
	const [filter, changeFilter] = useState({reject: -1, badges: []});
	
	function handleShow(){
		changeShow(!show)
	}
	
	function expandButton(e){
		if(prevButton){
			prevButton.style.height = '25px';
			prevButton.style.width = '25px';
		}
		changeButton(e.target);
		e.target.style.height = '185px';
		e.target.style.width = '185px';
	}

	function shrinkButton(){
		if(prevButton){
			prevButton.style.height = '25px';
			prevButton.style.width = '25px';
		}
	}

	function submitFilter(){
		props.cf(filter)
	}
	
	function modifyFilter(d){
		if(filter.badges.findIndex(element => element == props.badgeList[d]) == -1){
			var temp = {...filter}
			temp.badges.push(props.badgeList[d])
			changeFilter(temp)
		}
	}

	function selectReject(v){
		var f = {...filter}
		f.reject = v
		changeFilter(f)
	}

	function removeBadgeManager(e){
		var index = e.target.getAttribute("ki")
		var f = {...filter}
		f.badges.splice(index,1)
		changeFilter(f)
	}

	useEffect(() => {
		console.log("props: " + JSON.stringify(props.filters)) 
		console.log("state: " + JSON.stringify(filter))

		if(JSON.stringify(props.filters) != JSON.stringify(filter)){ 
			props.cf({...filter});
		}
	});

	return(
		<div style = {props.tc}>
			<button onMouseOver = {() => {shrinkButton()}} onClick = {handleShow} style = {{height: "100%", float: "left", width: "25px", backgroundColor: 'rgba(0,0,0,0)', border: "none"}}> {show ? ">" : "<"} </button>
			<div onMouseOut = {() => {shrinkButton()}} style = {{width: (show ? "300px" : "0px"), transition: "width 1s"}}>
				<h4>Apply Filters</h4>
					<div style = {{display: "flex", backgroundColor: "white", width: "auto", padding: "4px", marginRight: "40px", flexWrap: "wrap"}}>
						<div style = {{display: "flex", flexDirection: "row"}}>
							
							<ToggleButtonGroup type="radio" name="options" defaultValue={-1} onChange = {selectReject} size = "sm">
									<DropdownButton name="tags" as={ToggleButtonGroup} title="Tags" style = {{borderRight: "2px solid white"}}>
										{props.badgeList.map((badge, index) => {return(
											<Dropdown.Item eventKey = {index} onSelect = {modifyFilter} key = {index}>{badge}</Dropdown.Item>
										)})}
									</DropdownButton>
									<ToggleButton value={0}>select</ToggleButton>
   									<ToggleButton value={1}>reject</ToggleButton>
									<ToggleButton value={-1}>none</ToggleButton>
  							</ToggleButtonGroup>
						</div>
						{filter.badges.map((badge, index) => {return(
							<div style = {{display: "inline-block"}}>
								<InputGroup style = {{display: "inline"}}>
									<InputGroup.Text style = {{backgroundColor: "blue", color: "white"}}>
										{badge}<button style = {{backgroundColor: "rgba(0,0,0,0)", border: "none", color: "white"}} onClick = {(e) => {removeBadgeManager(e)}} key = {index} ki = {index}>x</button>
									</InputGroup.Text>
								</InputGroup>
							{' '}</div>
						)})}
					</div>
				<h4>Style Options</h4>
				<h5>Backdrop:</h5>
				<div onMouseOut = {() => {shrinkButton()}} style = {{display: "flex", backgroundColor: "white", width: "auto", marginRight: "40px", flexWrap: "wrap"}}>
					<button onClick = {() => {props.cb("forest")}} onMouseOut = {(e) => {e.stopPropagation()}} onMouseOver = {(e) => {expandButton(e)}} style = {{margin: "5px", height: "25px", border: "none", width: "25px", backgroundImage: `url(${forest})`, transition: "width 2s, height 1.5s", backgroundSize: "cover"}}/>
					<button onClick = {() => {props.cb("galaxy")}} onMouseOut = {(e) => {e.stopPropagation()}} onMouseOver = {(e) => {expandButton(e)}} style = {{margin: "5px", height: "25px", border: "none", width: "25px", backgroundImage: `url(${galaxy})`, transition: "width 2s, height 1.5s", backgroundSize: "cover"}}/>
					<button onClick = {() => {props.cb("desert")}} onMouseOut = {(e) => {e.stopPropagation()}} onMouseOver = {(e) => {expandButton(e)}} style = {{margin: "5px", height: "25px", border: "none", width: "25px", backgroundImage: `url(${desert})`, transition: "width 2s, height 1.5s", backgroundSize: "cover"}}/>
					<button onClick = {() => {props.cb("clouds")}} onMouseOut = {(e) => {e.stopPropagation()}} onMouseOver = {(e) => {expandButton(e)}} style = {{margin: "5px", height: "25px", border: "none", width: "25px", backgroundImage: `url(${clouds})`, transition: "width 2s, height 1.5s", backgroundSize: "cover"}}/>
					<button onClick = {() => {props.cb("coral")}} onMouseOut = {(e) => {e.stopPropagation()}} onMouseOver = {(e) => {expandButton(e)}} style = {{margin: "5px", height: "25px", border: "none", width: "25px", backgroundImage: `url(${coral})`, transition: "width 2s, height 1.5s", backgroundSize: "cover"}}/>
				</div>
				<h5>Theme Colors:</h5>
				<div style = {{display: "flex", backgroundColor: "white", width: "auto", marginRight: "40px", flexWrap: "wrap"}}>
					<button onClick = {() => {props.updateTheme({r: 0, g: 153, b: 51})}} style = {{margin: "5px", height: "25px", border: "none", width: "25px", backgroundColor: 'rgba(0, 153, 51, 1)'}}/>
					<button onClick = {() => {props.updateTheme({r: 153, g: 204, b: 255})}} style = {{margin: "5px", height: "25px", border: "none", width: "25px", backgroundColor: 'rgba(153, 204, 255, 1)'}}/>
					<button onClick = {() => {props.updateTheme({r: 255, g: 102, b: 0})}} style = {{margin: "5px", height: "25px", border: "none", width: "25px", backgroundColor: 'rgba(255, 102, 0, 1)'}}/>
					<button onClick = {() => {props.updateTheme({r: 204, g: 51, b: 255})}} style = {{margin: "5px", height: "25px", border: "none", width: "25px", backgroundColor: 'rgba(204, 51, 255, 1)'}}/>
					<button onClick = {() => {props.updateTheme({r: 51, g: 102, b: 255})}} style = {{margin: "5px", height: "25px", border: "none", width: "25px", backgroundColor: 'rgba(51, 102, 255, 1)'}}/>
					<button onClick = {() => {props.updateTheme({r: 102, g: 153, b: 153})}} style = {{margin: "5px", height: "25px", border: "none", width: "25px", backgroundColor: 'rgba(102, 153, 153, 1)'}}/>
					<button onClick = {() => {props.updateTheme({r: 0, g: 255, b: 255})}} style = {{margin: "5px", height: "25px", border: "none", width: "25px", backgroundColor: 'rgba(0, 255, 255, 1)'}}/>
					<button onClick = {() => {props.updateTheme({r: 255, g: 51, b: 0})}} style = {{margin: "5px", height: "25px", border: "none", width: "25px", backgroundColor: 'rgba(255, 51, 0, 1)'}}/>
					<button onClick = {() => {props.updateTheme({r: 176, g: 224, b: 230})}} style = {{margin: "5px", height: "25px", border: "none", width: "25px", backgroundColor: 'rgba(176, 224, 230, 1)'}}/>
					<button onClick = {() => {props.updateTheme({r: 255, g: 255, b: 0})}} style = {{margin: "5px", height: "25px", border: "none", width: "25px", backgroundColor: 'rgba(255, 255, 0, 1)'}}/>
					<button onClick = {() => {props.updateTheme({r: 204, g: 102, b: 153})}} style = {{margin: "5px", height: "25px", border: "none", width: "25px", backgroundColor: 'rgba(204, 102, 153, 1)'}}/>
					<button onClick = {() => {props.updateTheme({r: 153, g: 102, b: 51})}} style = {{margin: "5px", height: "25px", border: "none", width: "25px", backgroundColor: 'rgba(153, 102, 51, 1)'}}/>
				</div>
			</div>
		</div>
		)
	
}

export default Mysidebar;