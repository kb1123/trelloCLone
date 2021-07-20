import React, { Component } from "react";
import Carditem from './Carditem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import trash from './trash.png';

const cardContainerStyle = {
				background: "powderblue",
				display: "block",
				position: "relative",
				margin: "5px",
				width: "250px",
				verticalAlign: "top"
			   }
const cardAddStyle = {
			position: "relative", 
			textAlign: "center", 
			backgroundColor: "rgba(0,0,0,0)",
			padding: "2px",
			zIndex: "100"
		     }
const cardAddOuterStyle = {
				position: "absolute",
				backgroundColor: "rgba(0,0,0,0)",
				height: "100%",
				width: "100%",
				zIndex: "200"
			  }
const titleStyle = {
			backgroundColor: "rgba(0,0,0,0)",
			fontFamily: "arial",
			fontWeight: "bold",
			fontSize: "24px",
			width: "100%",
			border: "none",
			boxSizing: "border-box"
			}
const deleteButtonStyle = {
				height: "auto", 
				width: "auto", 
				border: "none", 
				backgroundColor: "rgba(0,0,0,0)"
			}


class Cardcontainer extends Component{

//this class contains the vertical columns of cards

	constructor(props){
		super(props);
		this.state = {
			      container: {...this.props.container},
			      index: this.props.index,
			      title: this.props.container.title
			     }
	}

	addCard = () => {
		var c = this.state.container.data
		c.push({ title: "new card",
			 id: Date.now().toString()
			})
		this.setState({cards: c})
	}

	componentDidUpdate(prevProps, prevState){
		if(this.props.index !== this.state.index){
			this.setState({index: this.props.index})
		}
		if(this.props.container !== prevProps.container){
			this.setState({container: {...this.props.container}})
		}
	}
	
	changeTitle = (e) =>{
		this.setState({title: e.value})
	}

	tagFilter = (card) =>{

		if(this.props.filters.badges == undefined){
			return true;
		}
		var filterPass = this.props.filters.badges.some((e)=>{
							if(card.badges == undefined){
								return false
							}
							if(card.badges.findIndex(b => b == e) != -1){
								return true
							}else{
								return false
							}
						})
		switch(this.props.filters.reject){
			case 0:
				return filterPass;
			case 1:
				return !filterPass
			case -1:
				return true;
		}
		console.log(this.props.filters)

	}
	
	render(){
		return(
			<Draggable key = {this.state.container.id} draggableId = {this.state.container.id} index = {this.state.index} type = {"containers"}>
								{(provided) =>(
								
				<div ref= {provided.innerRef} {...provided.draggableProps}>
				<div style = {{
						background: this.props.tc.backgroundColor,
						display: "block",
						position: "relative",
						margin: "5px",
						width: "250px",
						verticalAlign: "top",
						transition: "background-color 1.5s"
				}} {...provided.dragHandleProps}>
					<div style = {{display: "flex", flexDirection: "row"}}>
						<div style = {{flex: "1 0 0px"}}><input onChange = {this.changeTitle} style = {titleStyle} placeholder = "add a title" value = {this.state.title}/></div>
						<button onClick = {() => {this.props.dc(this.state.container.id)}} style = {deleteButtonStyle}> <img style = {{height: "24px", width: "24px"}} src = {trash}/> </button>
					</div>
					<Droppable droppableId = {this.state.container.id} type = {"card"}>
						{(provided) =>(
						<div style = {{minHeight: "20px", display: "inline-block", padding: "0px", margin: "0px", width: "100%"}} {...provided.droppableProps} ref={provided.innerRef}>
							{	
								this.state.container.data.map((card, index)=>{
								console.log(this.props.filters)
								if(this.tagFilter(card)){
									return(
										<Carditem cs = {this.props.cs} card = {card} index = {index} key = {card.id} uc = {this.props.uc}/>
									)}
								})
							}
						{provided.placeholder}
						</div>
						)}
					</Droppable>	
				<div style = {{height: "100%", position: "relative"}}>
					<div onClick = {this.addCard} style = {cardAddOuterStyle}/>
					<div style = {cardAddStyle}>add a new card +</div>
				</div>
				</div>	
			</div>)}
			</Draggable>
		
		)
	}
}
export default Cardcontainer;

