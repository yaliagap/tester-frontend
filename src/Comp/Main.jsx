import React, { Component } from 'react';

export default class Navbar extends Component{
	render(){
		return (
			<div className="main card">
				<div className="card-content">
					<div className="foco valign-wrapper">
						<i className="material-icons">lightbulb_outline</i>
					</div>
					<p>
						Administrador de Innova <br/> <span className="grey-text">Bienvenido al perfil de administrador </span>
					</p>
				</div>
	  	</div>
		)
	}
}