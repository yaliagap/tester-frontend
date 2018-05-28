import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';

export default class Sidenav extends Component{
	constructor(props){
		super(props);
		this.className = 'sidenav sidenav-fixed animated slideInLeft';
		this.state = { showAlert: false };
	}
	open(open){
		if (!open) {
			this.className = 'sidenav sidenav-fixed animated slideInLeft';
		} else{
			this.className = 'sidenav sidenav-fixed animated slideOutLeft';
		}
	}
	componentWillReceiveProps(p){ //esta funcion se ejecuta cada ves que el padre actualiza los props 
		this.open(p.open);
		this.setState({ showAlert: false });
	}
	logout(e) {
		this.setState({ showAlert: true });
		e.preventDefault();
		return false;
	}
	confirmLogout() {
		this.setState({ showAlert: false });
		window.location = '/cerrar-sesion';
		return true;
	}
	render(){

		return (
			<div className={this.className}>
				<ul>
					<li><Link to="/"><i className="material-icons">home</i>Inicio</Link></li>
					<li><Link to="/asistentes-virtuales"><i className="material-icons">person</i>Asistentes Virtuales</Link></li>
					<li><Link to="/pruebas"><i className="material-icons">format_list_bulleted</i>Pruebas</Link></li>
					<li><Link to="/cerrar-sesion" onClick={(e) => this.logout(e) }><i className="material-icons">power_settings_new</i>Cerrar Sesión</Link></li>
				</ul>
				<SweetAlert
				    show={this.state.showAlert}
				    title="Cerrar Sesión"
				    type='warning'
				    text="¿Seguro que deseas cerrar sesión en el sistema?"
				    showCancelButton={true}
				    cancelButtonText='Cancelar'
				    confirmButtonColor='#d33'
				    confirmButtonText='Cerrar Sesión'
				    onConfirm={() => this.confirmLogout() }
				    onCancel={() => this.setState({ showAlert: false }) }
				 />
			</div>
		)
	}
}