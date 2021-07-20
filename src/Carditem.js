import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TextareaAutosize from 'react-textarea-autosize';
import Badge from 'react-bootstrap/Badge';

const containerDivStyle = {
				backgroundColor: "rgba(0,0,0,0)",
				padding: "5px",
				display: "block",
				height: "auto",
				width: "100%",
				boxSizing: "border-box"
			  }
const cardStyle = {
			position: "relative",
			backgroundColor: "white",
			padding: "4px",
			height: "auto",
			minHeight: "50px",
			width: "100%",
			display: "block",
			boxSizing: "border-box"
		  }
const textAreaStyle = {
			 height: "60%",
			 overflow: "hidden",
			 width: "94%",
			 border: "none",
			 resize: "none",
			 fontFamily: "arial",
			 display: "block"
		      }

class Carditem extends Component{

	constructor(props){
		super(props);
		var badges = []
		var date = ""
		if(this.props.card.badges){
			badges = [...this.props.card.badges]
		}
		if(this.props.card.dueDate){
			date = this.dateToString(this.props.card.dueDate)
		}
		this.state = {
			card: {...this.props.card},
			text: this.props.card.title,
			index: this.props.index,
			badges: badges,
			dateString: date
		}
	}
	
	changeTitle(e){
		var text = e.target.value
		var card = {...this.state.card}
		card.title = text
		this.setState({card: card})
	}		

	
	componentDidUpdate(prevProps, prevState){
		if(this.props.card != prevProps.card){
			this.setState({card: {...this.props.card}})
		}
		if(this.state.index != this.props.index){
			this.setState({index: this.props.index})
		}
		if(this.props.card.badges != this.state.badges && this.props.card.badges != undefined){
			this.setState({badges: this.props.card.badges})
		}
		if(this.props.card.dueDate != this.state.card.dueDate){
			this.setState({
				dateString: this.dateToString(this.props.card.dueDate)
			})
		}
	}

	dateToString = () =>{
		const monthMatrix = ["Jan ","Feb ","Mar ","Apr ","May ","Jun ","Jul ","Aug ","Sep ","Oct ","Nov ","Dec "];
		var d = new Date(this.props.card.dueDate);
		var month = monthMatrix[d.getMonth()];
		var dateString = month + d.getDate();
		return dateString;
	}

	updateParent = () => {
		this.props.uc({...this.state.card})   //propagate changes to the card back to the parent data object
	}

	launchModal = () => {     //this was placed in an arrow function to prevent the button self-click from triggering the modal on render
		this.props.cs({...this.state.card})
	}
	
	render(){
		return(
		<Draggable key = {this.state.card.id} draggableId = {this.state.card.id} index = {this.state.index} type = {"card"}>
			{(provided) =>(
			<div ref = {provided.innerRef} {...provided.draggableProps}>
				<div style = {containerDivStyle}  {...provided.dragHandleProps}>
					<div style = {cardStyle}>
						<TextareaAutosize onBlur = {this.updateParent} onChange = {(e) => {this.changeTitle(e)}} style = {textAreaStyle} value = {this.state.card.title}/>
						<button onClick = {this.launchModal} style = {{border: "none", display: "block", height: "auto", minHeight: "20px", width: "100%", backgroundColor: "rgba(0,0,0,0)"}}/>
					<div>
					{this.state.badges.map((badge, index)=>{return(
						<span key = {index}><Badge variant = "primary">{badge}</Badge>{' '}</span>
					)})}
					<div style = {{paddingLeft: "2px", paddingRight: "2px", display: (this.state.dateString ? "inline-block" : "none"), width: "auto", color: "lightgrey", fontFamily: "arial", fontSize: "15px", borderStyle: "solid", borderColor: "lightgrey", borderRadius: "3px"}}>{this.state.dateString}</div>
					</div>
			</div>
		</div>
		</div>)}
		</Draggable>
		)
	}
}

export default Carditem;