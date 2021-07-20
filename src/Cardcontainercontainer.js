import React, { Component } from "react";
import Cardcontainer from './Cardcontainer';
import Addcardcontainer from './Addcardcontainer'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './scroll.module.css'

const cards = [{
		title: "to do",
		id: "hfjhjgusyf8789",
		data:
		[
			{
			title: "add something!",
			id:	"bhjt7tggsjhk",
			description: "what would you like to do?"
			}
	    ]},
		
		{
			title: "done",
			id: "cknkjnklsjlikjisjk",
			data: []
		}
		]


class Cardcontainercontainer extends Component{

	constructor(props){
		super(props);
		this.state = {
				containers: cards
			     }
	}
	
	addCardContainerCallback = () =>{
		var containers = this.state.containers
		var empty_container = {
					id: Date.now().toString(),
					data: []
				      }
		containers.push(empty_container);
		this.setState({
				containers: containers
				})
	}

	deleteCardContainer = (id) =>{
		var containers = this.state.containers
		var index = containers.findIndex((element) => element.id == id)
		containers.splice(index, 1)
		this.setState({containers: containers})
		
	}
	
	handleDragEnd = (result) => {
		var containers = Array.from(this.state.containers)

		if(result.destination != undefined){
			if(result.type == "card"){
				
				var sID = result.source.droppableId
				var dID = result.destination.droppableId
				var sIx = containers.findIndex((element) => element.id == sID)
				var dIx = containers.findIndex((element) => element.id == dID) 
				
				var taken = containers[sIx].data.splice(result.source.index, 1)[0]
				containers[dIx].data.splice(result.destination.index, 0, taken)

				this.setState({
						containers: containers
						})
			}else if(result.type == "container"){
				var taken = containers.splice(result.source.index, 1)[0]
				containers.splice(result.destination.index, 0, taken)
				
				this.setState({
						containers: containers
						})
			}
		}

	}

	updateCallback = (card) =>{    //update callback is called whenever a change to the content of a card is made
		var containers = Array.from(this.state.containers) //copy containers
		var container = []
		for(var j = 0; j < containers.length; j++){    //iteratively search for card by id
			container = containers[j]
			var k = container.data.findIndex(element => element.id == card.id)
			if(k != -1){                   //once we find the card, update the content
				if(card.delete == undefined){
					containers[j].data[k] = {...card}
					this.setState({containers: containers})
					return;
				}else{	
					containers[j].data.splice(k,1)
					this.setState({containers: containers})
					return;
				}
			}
		}
		
	}

	componentDidUpdate(prevProps, prevState){
		if(prevProps != undefined){
			if(this.props.card != prevProps.card){
				this.updateCallback(this.props.card)
			}
		}
	}
	
	render(){
		return (
	     	<div className = {styles.container} style = {{height: "100%", display: "inline-flex", width: "100%", maxWidth: "100%", overflow: "scroll"}}>
			<DragDropContext onDragEnd = {this.handleDragEnd}>
					<Droppable droppableId = "cardcontainers" type = {"container"} direction = "horizontal">
						{(provided) =>(
						<div style = {{display: "inline-flex"}} {...provided.droppableProps} ref={provided.innerRef}>
							{this.state.containers.map((container, index)=>{return(
								<Cardcontainer filters = {{...this.props.filters}} tc = {{...this.props.tc}} cs = {this.props.cs} container = {container} index = {index} key = {container.id} uc = {this.updateCallback} dc = {this.deleteCardContainer}/>
							)})}
						{provided.placeholder}
						</div>
						)}
					</Droppable>
				<Addcardcontainer tc = {{...this.props.tc}} cb = {this.addCardContainerCallback}/>
				<div style = {{height: "100%", width: "330px"}}/>
			</DragDropContext>
	    	</div>
		)
	}
	
}

export default Cardcontainercontainer;