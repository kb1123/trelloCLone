import './App.css';
import Cardcontainercontainer from './Cardcontainercontainer'
import Contentmodal from './Contentmodal';
import React, { useState } from 'react';
import Mysidebar from './Mysidebar';
import Mytopbar from './Mytopbar';
import galaxy from './galaxy.jpg';
import clouds from './clouds.jpg';
import desert from './desert.jpg';
import forest from './forest.jpg';
import coral from './coral-reef.jpg';

function App() {

  const [show, changeShow] = useState(false);
  const [modalData, changeMD] = useState([]);
  const [card, changeCard] = useState("");
  const [badgeList, changeBadgeList] = useState(["pending","!important"]);
  const [background, changeBackground] = useState();
  const [theme, changeTheme] = useState({
					position: "fixed",
		  			right: "0px",
		  			height: "100vh", 
		  			backgroundColor: "#b0e0e6", 
		  			top: "0px", 
		  			zIndex: "400", 
		  			display: "inline-block"});
  const [filters, changeFilters] = useState({reject: -1});

  function showModal(v){
	changeMD(v)
	changeShow(true);
  }

  function hideModal(v){
	changeShow(false);
  }

  function updateCard(card){
	changeCard(card)
  }

  function updateBadgeList(list){
	changeBadgeList(list)
  }
  
  function updateBackground(background){
	switch(background){
		case "galaxy":
			changeBackground(galaxy);
			return;
		case "forest":
			changeBackground(forest);
			return;
		case "clouds":
			changeBackground(clouds);
			return;
		case "desert":
			changeBackground(desert);
			return;
		case "coral":
			changeBackground(coral);
			return;
		default:
			changeBackground("");
			return;
	}
  }
  
  function updateTheme(t){
	var color = '#'+((1 << 24) + (t.r << 16) + (t.g << 8) + t.b).toString(16).slice(1)
	changeTheme(
		 {position: "fixed",
		  right: "0px",
		  height: "100vh", 
		  backgroundColor: color, 
		  top: "0px", 
		  zIndex: "400", 
		  display: "inline-block",
		  transition: "background-color 1s"});
  }

  return(
	<>
	<div style = {{display: "block", overflowX: "hidden", maxWidth: "100vw", width: "100vw", height: "100vh", backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%"}}>
		<Mytopbar tc = {{...theme}}/>
		<Cardcontainercontainer filters = {{...filters}} cs = {showModal} card = {card} tc = {{...theme}}/>
		<Contentmodal hideModal = {hideModal} show = {show} modalData = {{...modalData}} sc = {updateCard} badgeList = {[...badgeList]} ul = {updateBadgeList}/>
		<Mysidebar filters = {{...filters}} badgeList = {[...badgeList]} cf = {changeFilters} cb = {updateBackground} updateTheme = {updateTheme} tc = {{...theme}}/>
    </div></>
	
  );
}

export default App;


















