import React, { Component } from "react";

const cardContainerAddStyle = {
			position: "relative", 
			textAlign: "center", 
			backgroundColor: "rgba(0,0,0,0)",
			padding: "2px",
			zIndex: "100",
			width: "200px"
		    }
const cardContainerAddOuterStyle = {
				position: "absolute",
				backgroundColor: "rgba(0,0,0,0)",
				height: "100%",
				width: "200px",
				zIndex: "200"
			  }


class Addcardcontainer extends Component{

	constructor(props){
		super(props);
	}

	addCardContainer = () =>{
		this.props.cb()
	}
	
	render(){
		return(
		<div style = {{ backgroundColor: this.props.tc.backgroundColor,
				display: "inline-block",
				position: "relative",
				margin: "5px",
				width: "210px",
				alignItems: "center",
				verticalAlign: "top",
				height: "35px",
				transition: "background-color 2s"}}>

			<div style = {cardContainerAddOuterStyle} onClick = {this.addCardContainer}/>
			<div style = {cardContainerAddStyle}>
					add a new list +
			</div>
		</div>
		)
	}
}

export default Addcardcontainer;