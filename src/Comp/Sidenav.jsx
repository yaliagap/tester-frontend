import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export default class Sidenav extends Component{
	constructor(props){
		super(props);
		this.className = 'sidenav sidenav-fixed animated slideInLeft';
	}
	open(open){
		if (!open) {
			this.className = 'sidenav sidenav-fixed animated slideInLeft';
		}else{
			this.className = 'sidenav sidenav-fixed animated slideOutLeft';
		}
	}
	componentWillReceiveProps(p){ //esta funcion se ejecuta cada ves que el padre actualiza los props 
		this.open(p.open)
	}
	render(){

		return (
			<div className={this.className}>
				<ul>
					<li><Link to="/"><i className="material-icons">home</i>Inicio</Link></li>
					<li><Link to="/asistente-virtual"><i className="material-icons">dashboard</i>Asistente Virtual</Link></li>
					<li><Link to="/resultados-encuestas"><i className="material-icons">label</i>Resultados Encuestas</Link></li>
					<li><Link to="/citas"><i className="material-icons">label</i>Citas</Link></li>
					<li><Link to="/carga-citas"><i className="material-icons">label</i>Carga Masiva de Citas</Link></li>
					<li><Link to="/carga-encuestas"><i className="material-icons">label</i>Carga Invitación Encuesta</Link></li>
					<li><Link to="/parametros"><i className="material-icons">label</i>Parámetros</Link></li>
					<li><Link to="/cerrar-sesion"><i className="material-icons">power_settings_new</i>Cerrar Sesión</Link></li>
				</ul>
			</div>
		)
	}
}