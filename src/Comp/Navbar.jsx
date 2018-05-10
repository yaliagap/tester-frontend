import React, { Component } from 'react';
import logo from '../logo.png'

const styles = {
	brand:{
	    fontSize: 28,
		margin: '7px 9px'
	}
}

export default class Navbar extends Component{
	menu(){
		console.log('menu!')
		this.props.onmenu()
	}
	render(){
		return (
			  <nav className="cyan">
			    <div className="container-fluid nav-wrapper">
			   	<ul className="left">
		        	<li><a className="waves-effect waves-light" onClick={this.menu.bind(this)}><i className="material-icons">menu</i></a></li>
		        	<li><img src={logo} className="logo" alt="logo"/></li>
		        	<li><p className="brand-logo" style={styles.brand}>Administrador</p></li>
		      	</ul>
			    </div>
			  </nav>
			)
	}
}