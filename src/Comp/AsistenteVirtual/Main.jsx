import React, { Component } from 'react';
import Api from '../../js/Api.js';
import Crear from './Crear.jsx';
import Listar from './Listar.jsx';

export default class Main extends Component {
	constructor(props){
		super(props);
		this.state = {asistentes:[], showCrear:false, showListar: true, listarClassName: "hide", crearClassName: ""}
		this.handlerSubmit = this.handlerSubmit.bind(this)
	}
	componentWillMount() {
		Api.get('/bots',true)
		.then(function (data) {
			if (data.error) {
				window.location = '/cerrar-sesion';
			} else {
				this.setState({asistentes:data});
			}
		}.bind(this));
	}
	create() {
		this.setState({"showCrear": true, "showListar": false, "crearClassName": "hide", "listarClassName": ""});
	}
	list() {
		this.setState({"showCrear": false, "showListar": true, "crearClassName": "", "listarClassName": "hide"});
	}
	handlerSubmit() {
		Api.get('/bots',true)
		.then(function (data) {
			this.setState({asistentes:data});
		}.bind(this));
	    this.list();
	}
	render() {
		return (
			<div className="card citas">
				<div className="row card-content">
					<div className="col s6">
						<h4>Asistentes Virtuales</h4>	
					</div>			
					<div className="col s6 right-align">
						<button className={"btn-floating btn-large waves-effect waves-light cognitiva-blue " + this.state.crearClassName}  onClick={this.create.bind(this)}>
							<i className="material-icons">add</i>
						</button>
						<button className={"btn-floating btn-large waves-effect waves-light cognitiva-blue " + this.state.listarClassName}  onClick={this.list.bind(this)}>
							<i className="material-icons">format_list_numbered</i>
						</button>
					</div>
				</div>
				<Listar show={this.state.showListar} asistentes={this.state.asistentes} handlerSubmit={this.handlerSubmit} />
				<Crear show={this.state.showCrear} handlerSubmit={this.handlerSubmit} />
			</div>
		);
	}
}
