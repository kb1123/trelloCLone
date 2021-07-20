import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Badge from 'react-bootstrap/Badge';
import DatePicker from "react-datepicker";
import './Contentmodal.css';
import "react-datepicker/dist/react-datepicker.css";

class Contentmodal extends Component{

constructor(props){

	super(props);
	this.state = {show: false,
		      card: "",
		      showToast: false,
		      nuBadge: "",
		      badgeList: [],
		      badges: []}
}

componentDidUpdate(prevProps, prevState){
	if(this.props.show != prevProps.show){
		var card = []
		var badges = []
		if(this.props.modalData !== []){
			card = this.props.modalData
			if(card.badges){
				badges = card.badges
			}
		}
		this.setState({
			       show: this.props.show,
			       title: card.title,
			       description: card.description,
			       card: card,
			       badgeList: this.props.badgeList,
			       badges: badges,
			       nuBadge: ""
			     })
	}
}

updateDescription(e){
	if(this.state.card != undefined){
		var card = this.state.card
		card.description = e.target.value
		this.setState({card: card})
	}
}


updateBadgeInput(e){
	var temp = e.target.value
	this.setState({
		nuBadge: temp
	})
}

save = () =>{
	this.props.sc({...this.state.card})
	this.setState({showToast: true})
}

delete = () =>{
	var k = this.state.card;
	k.delete = true;
	this.props.sc({...k})
	this.props.hideModal()
}

clearToast = () =>{
	this.setState({
		showToast: false
	})
}

selectBadge = (v) =>{
	var temp = this.state.badgeList[v]
	this.setState({
		nuBadge: temp
	})
}

setDueDate(date){
	if(date){
		var d = new Date(date)
		console.log(d.getMonth())
	}
	var card = {...this.state.card}
	card.dueDate = date
	this.setState({card: card})
}

addBadgeManager = () =>{
	if(this.state.nuBadge == ""){
		return;		//prevent the creation of empty badges
	}
	var badges = this.state.badges   //badges and card.badges are separated to satisfy array.map during initial render. an undefined card.badges may cause a crash
	var card = this.state.card
	badges.push(this.state.nuBadge)
	card.badges = badges       //card.badges is updated simultaneously so a single argument can be passed to "save changes" function
	this.setState({
		badges: badges,
		card: card
	})

	if(!this.props.badgeList.find(element => element == this.state.nuBadge)){
		var list = this.props.badgeList
		list.push(this.state.nuBadge)
		this.props.ul(list)
	}
}

removeBadgeManager = (e) =>{
	var index = e.target.getAttribute("ki")
	var badges = this.state.badges
	var card = this.state.card

	badges.splice(index, 1)
	card.badges = badges
	this.setState({
		badges: badges,
		card: card
	})
	
}

render(){
	return(
		<Modal onHide = {this.props.hideModal} show = {this.state.show} centered dialogClassName = "modal-style" contentClassName = "modal-style-m2">
			<Modal.Dialog>
 				 <Modal.Header closeButton>
    					<Modal.Title>{this.state.title}</Modal.Title>
  				 </Modal.Header>

				 <Modal.Body>
					<div style= {{display: "flex", flexDirection: "row", padding: "3px"}}>
						<div style= {{display: "block", flex: "1 0 0px"}}>
							<Form.Label>Description</Form.Label>
  				 			<Form.Control as="textarea" rows = {3} value = {this.state.card.description} onChange = {(e) => this.updateDescription(e)}/>
						</div>
						<div style= {{display: "block", width: "30%", padding: "3px"}}>
							<Form.Label>Tags</Form.Label>
							<div>
							{this.state.badges.map((badge, index)=>{return(
								<div style = {{display: "inline-block"}}>
									<InputGroup style = {{display: "inline"}}>
										<InputGroup.Text style = {{backgroundColor: "blue", color: "white"}}>
											{badge}<button style = {{backgroundColor: "rgba(0,0,0,0)", border: "none", color: "white"}} onClick = {(e) => {this.removeBadgeManager(e)}} key = {index} ki = {index}>x</button>
										</InputGroup.Text>
									</InputGroup>
								{' '}</div>
							)})}
							</div>
							<InputGroup className = "mb-3">
  				 				<Form.Control as = "input" value = {this.state.nuBadge} placeholder = {"select or enter badge"} onChange = {(e) => this.updateBadgeInput(e)}/>
								<Button variant = "secondary" onClick = {this.addBadgeManager}>+</Button>
								<DropdownButton title = "" as={InputGroup.Append} variant="outline-secondary" menuAlign="right">
								{this.state.badgeList.map((badge, index) => {return(
									<Dropdown.Item eventKey = {index} onSelect = {this.selectBadge} key = {index}>{badge}</Dropdown.Item>
								)})}
								</DropdownButton>
							</InputGroup>
							<Form.Label>Due date</Form.Label>
							{(this.state.card.dueDate != undefined)?
							<DatePicker style = {{display: "block"}} selected={this.state.card.dueDate} onChange={(date) => {this.setDueDate(date)}}/>:
							<Button onClick = {() => this.setDueDate(Date.now())} style = {{display: "block"}} variant="secondary">add a due date +</Button>}
						</div>
					</div>
  				 </Modal.Body>
				 

 				 <Modal.Footer>
					<Button variant="danger" onClick = {this.delete}>Delete</Button>
    					<Button variant="secondary" onClick = {this.props.hideModal}>Close</Button>
    					<Button variant="primary" onClick = {this.save}>Save changes</Button>
					<Toast style = {{position: "absolute", float: "left", marginRight: "50%", zIndex: "100", padding: "5px", transform: "translate(50%)"}} autohide = {true} show = {this.state.showToast} onClose = {this.clearToast}>changes submitted</Toast>
  				 </Modal.Footer>
			</Modal.Dialog>
		</Modal>
	
	)}
	
}

export default Contentmodal;